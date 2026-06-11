# Google Sheets Setup for Aaru Cab Bookings

This guide connects the booking form to a Google Spreadsheet via Google Apps Script, with auto-formatting, a Dashboard, and charts.

## Step 1: Create the spreadsheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
2. Rename the first sheet to **Bookings**.
3. Add these headers in row 1 (columns A–N):

```
Timestamp | Full Name | Mobile | Trip Type | Pickup Location | Drop Location | Travel Date | Travel Time | Return Date | Return Time | Rental Duration | Vehicle Preference | Source | Status
```

Or skip manual headers — **Aaru Cab → Setup Dashboard** (Step 5) writes them for you.

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
5. Copy the **Web app URL** — it must end with **`/exec`** (not `/dev`).

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

## Step 5: Run dashboard setup (one-time)

1. Open your Google Sheet.
2. Reload the page if needed — a custom menu **Aaru Cab** appears in the menu bar.
3. Click **Aaru Cab → Setup Dashboard**.

This will:

- Format the **Bookings** tab (headers, filters, conditional formatting, Status dropdown)
- Create a **Dashboard** tab with KPIs and charts (trip types, vehicles, pickups, 7-day trend)
- Create a **Today** tab with upcoming trips via `QUERY`

New bookings from the website auto-format each row and set **Status** to `New`.

## Step 6: Test

### Test the Apps Script directly

```bash
curl -X POST "YOUR_WEB_APP_URL" \
  -H "Content-Type: application/json" \
  -d "{\"fullName\":\"Test User\",\"mobile\":\"9876543210\",\"tripType\":\"One Way\",\"pickupLocation\":\"Hyderabad\",\"dropLocation\":\"Bangalore\",\"travelDate\":\"2026-06-15\",\"travelTime\":\"09:00\",\"source\":\"Test\"}"
```

You should see `{"ok":true}` and a new formatted row in **Bookings** with Status `New`.

### Test via the website

1. Open `http://localhost:3000`
2. Fill out the Quick Booking form and click **Send Inquiry**
3. Confirm a new row appears in your Google Sheet

## Migrating an existing sheet

If you already have the old 18-column layout (with Email, Flight Number, Passengers, Luggage, Notes):

1. **Option A (recommended):** Create a fresh **Bookings** tab, run **Setup Dashboard**, delete the old tab.
2. **Option B:** Delete columns D (Email), M–Q (Flight, Passengers, Luggage, Notes), then add **Status** as column N. Update row 1 headers to match Step 1. Run **Aaru Cab → Reformat All Rows**.

After updating `Code.gs`, always **Deploy → Manage deployments → Edit → New version** so the live Web App uses the latest script.

## API response time

The booking API typically takes **1–3 seconds** on the first submit after idle time. This is normal for Google Apps Script (cold start) plus the server-side proxy hop. Subsequent submits in the same period are often faster. Use the `/exec` deployment URL to avoid extra redirects.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `Sheet "Bookings" not found` | Rename your sheet tab to exactly **Bookings** |
| `503 Booking service is not configured` | Add `SHEETS_ENDPOINT` to `.env.local` and restart |
| Authorization errors | Re-deploy the Web App and re-authorize |
| Empty response from script | Ensure deployment access is **Anyone**, not "Only myself" |
| Columns misaligned after migration | Re-run **Setup Dashboard** or fix headers to match A–N layout |
| Slow first submit (~2s) | Expected Apps Script cold start; not a form bug |
| No **Aaru Cab** menu | Reload the sheet; menu appears via `onOpen` when sheet is opened |

## Production deployment

Add `SHEETS_ENDPOINT` as an environment variable in your hosting provider (Vercel, Netlify, etc.). Do **not** expose this URL in client-side code — the Next.js API route handles server-side submission.
