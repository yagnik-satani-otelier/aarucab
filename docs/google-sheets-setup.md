# Google Sheets Setup for Aaru Cab Bookings

This guide connects the booking form to a Google Spreadsheet via Google Apps Script.

## Step 1: Create the spreadsheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Rename the first sheet to **Bookings**.
3. Add these headers in row 1 (columns A–R):

```
Timestamp | Full Name | Mobile | Email | Trip Type | Pickup Location | Drop Location | Travel Date | Travel Time | Return Date | Return Time | Rental Duration | Flight Number | Vehicle Preference | Passengers | Luggage | Notes | Source
```

## Step 2: Add the Apps Script

1. In the spreadsheet, open **Extensions → Apps Script**.
2. Delete any default code and paste the contents of [`google-apps-script/Code.gs`](../google-apps-script/Code.gs).
3. Click **Save** and name the project (e.g. "Aaru Cab Bookings").

## Step 3: Deploy as Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon and select **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy** and authorize the script when prompted.
5. Copy the **Web app URL** (ends with `/exec`).

## Step 4: Configure the Next.js app

1. In the project root, copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

2. Set your Web App URL:

```
SHEETS_ENDPOINT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

3. Restart the dev server: `npm run dev`

## Step 5: Test

### Test the Apps Script directly

```bash
curl -X POST "YOUR_WEB_APP_URL" \
  -H "Content-Type: application/json" \
  -d "{\"fullName\":\"Test User\",\"mobile\":\"9876543210\",\"tripType\":\"One Way\",\"pickupLocation\":\"Hyderabad\",\"dropLocation\":\"Bangalore\",\"travelDate\":\"2026-06-15\",\"travelTime\":\"09:00\",\"source\":\"Test\"}"
```

You should see `{"ok":true}` and a new row in the sheet.

### Test via the website

1. Open `http://localhost:3000`
2. Fill out the Quick Booking form and click **Send Inquiry**
3. Confirm a new row appears in your Google Sheet

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `Sheet "Bookings" not found` | Rename your sheet tab to exactly **Bookings** |
| `503 Booking service is not configured` | Add `SHEETS_ENDPOINT` to `.env.local` and restart |
| Authorization errors | Re-deploy the Web App and re-authorize |
| Empty response from script | Ensure deployment access is **Anyone**, not "Only myself" |

## Production deployment

Add `SHEETS_ENDPOINT` as an environment variable in your hosting provider (Vercel, Netlify, etc.). Do **not** expose this URL in client-side code — the Next.js API route handles server-side submission.
