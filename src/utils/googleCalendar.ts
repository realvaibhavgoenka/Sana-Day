import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Provider with Google Calendar & Google Sheets scopes
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/calendar');
provider.addScope('https://www.googleapis.com/auth/calendar.events');
provider.addScope('https://www.googleapis.com/auth/spreadsheets');

let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const signInWithGoogleCalendar = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to retrieve access token for Google Calendar.');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Calendar Sign in Error:', error);
    throw error;
  }
};

export const logoutGoogle = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

export interface CalendarEventParams {
  title: string;
  description: string;
  location?: string;
  startDateStr: string; // "YYYY-MM-DD"
  timeStr: string;      // e.g. "06:00 PM"
  durationHours?: number;
}

export function parseDateTimeToISO(dateStr: string, timeStr: string): Date {
  const dateParts = dateStr.split('-');
  const year = parseInt(dateParts[0], 10) || new Date().getFullYear();
  const month = (parseInt(dateParts[1], 10) || 1) - 1;
  const day = parseInt(dateParts[2], 10) || 1;

  let hours = 18;
  let minutes = 0;

  if (timeStr) {
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (match) {
      let h = parseInt(match[1], 10);
      const m = parseInt(match[2], 10);
      const ampm = match[3]?.toUpperCase();

      if (ampm === 'PM' && h < 12) h += 12;
      if (ampm === 'AM' && h === 12) h = 0;
      hours = h;
      minutes = m;
    }
  }

  const d = new Date();
  d.setFullYear(year, month, day);
  d.setHours(hours, minutes, 0, 0);
  return d;
}

export const getGoogleCalendarWebLink = (params: CalendarEventParams): string => {
  const { title, description, location = 'Our Special Date Spot 🌸', startDateStr, timeStr, durationHours = 3 } = params;
  const startDateTime = parseDateTimeToISO(startDateStr, timeStr);
  const endDateTime = new Date(startDateTime.getTime() + durationHours * 60 * 60 * 1000);

  const formatUtc = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const dates = `${formatUtc(startDateTime)}/${formatUtc(endDateTime)}`;

  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', title);
  url.searchParams.set('dates', dates);
  url.searchParams.set('details', description);
  url.searchParams.set('location', location);

  return url.toString();
};

export const addEventToGoogleCalendarApi = async (
  accessToken: string,
  params: CalendarEventParams
) => {
  const { title, description, location = 'Our Special Date Spot 🌸', startDateStr, timeStr, durationHours = 3 } = params;

  const startDateTime = parseDateTimeToISO(startDateStr, timeStr);
  const endDateTime = new Date(startDateTime.getTime() + durationHours * 60 * 60 * 1000);
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';

  const eventPayload = {
    summary: title,
    description: description,
    location: location,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: timeZone,
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: timeZone,
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'popup', minutes: 1440 }, // 24 hours before
        { method: 'popup', minutes: 120 },  // 2 hours before
      ],
    },
  };

  const response = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/primary/events',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventPayload),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Failed to create Google Calendar event');
  }

  return await response.json();
};
