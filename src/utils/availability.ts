// Client-side access to the apartment's availability (busy nights from the
// Google Calendar, served by worker/index.ts at `/api/availability`).
// The request is made once per visit and shared by the hero and the booking
// calendar. In `astro dev` there is no Worker, so demo data is used instead.

export interface Availability {
  /** Nights that are taken, as `YYYY-MM-DD` of the evening the night starts. */
  busy: Set<string>;
  /** False when the calendar could not be loaded (the inquiry still works). */
  ok: boolean;
}

let pending: Promise<Availability> | undefined;

export const toISO = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export const fromISO = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const addDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

export const today = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

const demoAvailability = (): Availability => {
  const start = today();
  const busy = new Set<string>();
  for (const [from, nights] of [
    [2, 3],
    [9, 2],
    [16, 5],
    [30, 4],
    [41, 2],
  ]) {
    for (let i = 0; i < nights; i++) busy.add(toISO(addDays(start, from + i)));
  }
  return { busy, ok: true };
};

export const loadAvailability = (url: string): Promise<Availability> => {
  pending ??= fetch(url, { headers: { accept: 'application/json' } })
    .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
    .then((data: { busy?: string[] }) => ({ busy: new Set(data.busy ?? []), ok: true }))
    .catch(() => (import.meta.env.DEV ? demoAvailability() : { busy: new Set<string>(), ok: false }));
  return pending;
};

/** True when every night from `arrival` up to (not including) `departure` is free. */
export const isRangeFree = (busy: Set<string>, arrival: Date, departure: Date) => {
  for (let day = arrival; day < departure; day = addDays(day, 1)) {
    if (busy.has(toISO(day))) return false;
  }
  return true;
};

/** First arrival date from today with `minNights` free nights in a row. */
export const firstFreeArrival = (busy: Set<string>, minNights: number, searchDays = 365) => {
  const start = today();
  for (let i = 0; i < searchDays; i++) {
    const arrival = addDays(start, i);
    if (isRangeFree(busy, arrival, addDays(arrival, minNights))) return arrival;
  }
  return undefined;
};

export const formatDate = (date: Date, options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' }) =>
  new Intl.DateTimeFormat('cs-CZ', options).format(date);
