/**
 * Aaru Cab — Google Sheets Booking Handler
 *
 * 1. Create a Google Sheet named "Bookings"
 * 2. Add header row (see docs/google-sheets-setup.md)
 * 3. Paste this script in Extensions → Apps Script
 * 4. Deploy as Web App (Execute as: Me, Access: Anyone)
 */

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: "Aaru Cab booking API" })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Bookings");

    if (!sheet) {
      throw new Error('Sheet "Bookings" not found. Create it first.');
    }

    var data = JSON.parse(e.postData.contents);

    if (data.website) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "Spam detected" })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.fullName || "",
      data.mobile || "",
      data.email || "",
      data.tripType || "",
      data.pickupLocation || "",
      data.dropLocation || "",
      data.travelDate || "",
      data.travelTime || "",
      data.returnDate || "",
      data.returnTime || "",
      data.rentalDuration || "",
      data.flightNumber || "",
      data.vehiclePreference || "",
      data.passengers || "",
      data.luggage || "",
      data.notes || "",
      data.source || "Aaru Cab Website",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err.message || err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
