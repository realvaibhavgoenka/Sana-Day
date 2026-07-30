import { signInWithGoogleCalendar } from './googleCalendar';

export interface DatePlanData {
  date: string;
  time: string;
  specialNote: string;
  submittedAt: string;
  girlfriendName: string;
  boyfriendName: string;
}

/**
 * Appends a new date response row to a Google Sheet using Google Sheets API v4.
 * Uses OAuth token from Google Auth Provider.
 */
export const recordDateToGoogleSheet = async (
  accessToken: string,
  data: DatePlanData
): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> => {
  let spreadsheetId = localStorage.getItem('sana_date_spreadsheet_id');

  // 1. If no existing spreadsheet created by app, create a new Google Sheet
  if (!spreadsheetId) {
    const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          title: `💕 ${data.girlfriendName} & ${data.boyfriendName} - Date Schedule`,
        },
        sheets: [
          {
            properties: { title: 'Date Schedule' },
            data: [
              {
                rowData: [
                  {
                    values: [
                      { userEnteredValue: { stringValue: 'Girlfriend' } },
                      { userEnteredValue: { stringValue: 'Selected Date' } },
                      { userEnteredValue: { stringValue: 'Selected Time' } },
                      { userEnteredValue: { stringValue: 'Special Requests / Song' } },
                      { userEnteredValue: { stringValue: 'Recorded At' } },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }),
    });

    if (!createRes.ok) {
      const err = await createRes.json();
      throw new Error(err.error?.message || 'Failed to create Google Sheet');
    }

    const createdSheet = await createRes.json();
    spreadsheetId = createdSheet.spreadsheetId;
    if (spreadsheetId) {
      localStorage.setItem('sana_date_spreadsheet_id', spreadsheetId);
    }
  }

  // 2. Append the date response row to the Google Sheet
  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/'Date Schedule'!A:E:append?valueInputOption=USER_ENTERED`;
  const appendRes = await fetch(appendUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [
        [
          data.girlfriendName,
          data.date,
          data.time,
          data.specialNote || 'None',
          data.submittedAt,
        ],
      ],
    }),
  });

  if (!appendRes.ok) {
    const err = await appendRes.json();
    throw new Error(err.error?.message || 'Failed to record response to Google Sheet');
  }

  const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}`;
  return { spreadsheetId: spreadsheetId!, spreadsheetUrl };
};
