// Cloudflare Worker in front of the static site (wrangler.jsonc). It answers
// only `/api/*` (`run_worker_first`); every other request goes straight to the
// static assets in `dist/`.
//
// GET /api/availability → { busy: ["YYYY-MM-DD", …], updated: ISO timestamp }
// Busy nights are read from the private iCal address of the Google Calendar
// with the bookings (Worker secret `CALENDAR_ICAL_URL`, set with
// `npx wrangler secret put CALENDAR_ICAL_URL`). Only dates leave the Worker,
// never event titles or guest details. Responses are cached for 15 minutes.

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> };
  CALENDAR_ICAL_URL?: string;
}

const CACHE_SECONDS = 900;
const DAYS_AHEAD = 400;

const pad = (n: number) => String(n).padStart(2, '0');
const isoDay = (date: Date) => `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;

/** Parses `20261103` or `20261103T150000Z` (time ignored) into a UTC midnight date. */
const parseIcsDate = (value: string) => {
  const match = /^(\d{4})(\d{2})(\d{2})/.exec(value);
  return match ? new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3]))) : undefined;
};

/**
 * Busy nights from an iCalendar feed. An event blocks every night from its
 * start date up to (not including) its end date, so a check-out day stays
 * free for the next arrival; a single-day event blocks that one night.
 * Cancelled events are skipped. Recurring events (RRULE) are not expanded.
 */
export const busyNights = (ics: string, from: Date, days = DAYS_AHEAD) => {
  const lines = ics.replace(/\r?\n[ \t]/g, '').split(/\r?\n/);
  const until = new Date(from.getTime() + days * 86_400_000);
  const busy = new Set<string>();
  let start: Date | undefined;
  let end: Date | undefined;
  let cancelled = false;

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      start = end = undefined;
      cancelled = false;
    } else if (line.startsWith('DTSTART')) {
      start = parseIcsDate(line.slice(line.indexOf(':') + 1));
    } else if (line.startsWith('DTEND')) {
      end = parseIcsDate(line.slice(line.indexOf(':') + 1));
    } else if (line.startsWith('STATUS:CANCELLED') || line.startsWith('TRANSP:TRANSPARENT')) {
      cancelled = true;
    } else if (line === 'END:VEVENT' && start && !cancelled) {
      const last = end && end > start ? end : new Date(start.getTime() + 86_400_000);
      for (let day = start; day < last && day < until; day = new Date(day.getTime() + 86_400_000)) {
        if (day >= from) busy.add(isoDay(day));
      }
    }
  }
  return [...busy].sort();
};

const json = (body: unknown, status = 200, cache = true) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': cache ? `public, max-age=${CACHE_SECONDS}` : 'no-store',
    },
  });

const availability = async (env: Env) => {
  if (!env.CALENDAR_ICAL_URL) return json({ error: 'Calendar is not configured.' }, 503, false);
  const response = await fetch(env.CALENDAR_ICAL_URL, { cf: { cacheTtl: CACHE_SECONDS } } as RequestInit);
  if (!response.ok) return json({ error: 'Calendar could not be loaded.' }, 502, false);
  const now = new Date();
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  return json({ busy: busyNights(await response.text(), today), updated: now.toISOString() });
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/availability' && request.method === 'GET') {
      return availability(env).catch(() => json({ error: 'Calendar could not be loaded.' }, 502, false));
    }
    if (url.pathname.startsWith('/api/')) return json({ error: 'Not found.' }, 404, false);
    return env.ASSETS.fetch(request);
  },
};
