// Booking settings shared by the availability calendar and the inquiry form.
//
// Availability comes from the Worker endpoint `/api/availability` (worker/index.ts),
// which reads the private iCal address of the Google Calendar (Worker secret
// `CALENDAR_ICAL_URL`). Inquiries are sent by Web3Forms to the owner's e-mail.

export const BOOKING = {
  // TODO: access key from https://web3forms.com (public by design, safe in markup).
  web3formsAccessKey: 'TODO-WEB3FORMS-ACCESS-KEY',
  availabilityUrl: '/api/availability',
  // TODO: real minimum stay.
  minNights: 1,
  // TODO: real capacity (maximum number of guests); no limit until it is known.
  maxGuests: undefined as number | undefined,
  // How many months ahead guests can pick dates.
  monthsAhead: 12,
};

export const isWeb3FormsConfigured = !BOOKING.web3formsAccessKey.startsWith('TODO');
