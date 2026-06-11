/**
 * Aaru Cab — Google Sheets Booking Handler
 *
 * 1. Create a Google Sheet with a tab named "Bookings"
 * 2. Paste this script in Extensions → Apps Script
 * 3. Deploy as Web App (Execute as: Me, Access: Anyone)
 * 4. Open the sheet → Aaru Cab → Setup Dashboard (one-time)
 */

var BOOKINGS_SHEET = "Bookings";
var DASHBOARD_SHEET = "Dashboard";
var TODAY_SHEET = "Today";
var NUM_COLS = 14;

var HEADERS = [
  "Timestamp",
  "Full Name",
  "Mobile",
  "Trip Type",
  "Pickup Location",
  "Drop Location",
  "Travel Date",
  "Travel Time",
  "Return Date",
  "Return Time",
  "Rental Duration",
  "Vehicle Preference",
  "Source",
  "Status",
];

var STATUS_VALUES = ["New", "Contacted", "Quoted", "Confirmed", "Cancelled"];

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: "Aaru Cab booking API" })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var sheet = getBookingsSheet();
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
      data.tripType || "",
      data.pickupLocation || "",
      data.dropLocation || "",
      data.travelDate || "",
      data.travelTime || "",
      data.returnDate || "",
      data.returnTime || "",
      data.rentalDuration || "",
      data.vehiclePreference || "",
      data.source || "Aaru Cab Website",
      "New",
    ]);

    formatDataRow(sheet, sheet.getLastRow());

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err.message || err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Aaru Cab")
    .addItem("Setup Dashboard", "setupWorkbook")
    .addItem("Reformat All Rows", "formatAllRows")
    .addToUi();
}

function getBookingsSheet() {
  var sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(BOOKINGS_SHEET);
  if (!sheet) {
    throw new Error('Sheet "' + BOOKINGS_SHEET + '" not found. Create it first.');
  }
  return sheet;
}

function setupWorkbook() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  setupBookingsSheet(ss);
  setupDashboard(ss);
  setupTodaySheet(ss);
  SpreadsheetApp.getUi().alert(
    "Dashboard setup complete.\n\nBookings tab is formatted. Dashboard and Today tabs are ready."
  );
}

function setupBookingsSheet(ss) {
  var sheet = ss.getSheetByName(BOOKINGS_SHEET);
  if (!sheet) {
    sheet = ss.insertSheet(BOOKINGS_SHEET);
  }

  sheet.getRange(1, 1, 1, NUM_COLS).setValues([HEADERS]);
  styleHeaderRow(sheet);

  sheet.setFrozenRows(1);
  if (!sheet.getFilter()) {
    sheet.getRange(1, 1, sheet.getMaxRows(), NUM_COLS).createFilter();
  }

  sheet.setColumnWidth(1, 160);
  sheet.setColumnWidth(2, 140);
  sheet.setColumnWidth(3, 110);
  sheet.setColumnWidth(4, 110);
  sheet.setColumnWidth(5, 160);
  sheet.setColumnWidth(6, 160);
  sheet.setColumnWidth(7, 110);
  sheet.setColumnWidth(8, 90);
  sheet.setColumnWidth(9, 110);
  sheet.setColumnWidth(10, 90);
  sheet.setColumnWidth(11, 120);
  sheet.setColumnWidth(12, 140);
  sheet.setColumnWidth(13, 140);
  sheet.setColumnWidth(14, 100);

  var statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUS_VALUES, true)
    .setAllowInvalid(false)
    .build();
  var lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    sheet.getRange(2, 14, lastRow - 1, 1).setDataValidation(statusRule);
  }

  applyConditionalFormatting(sheet);
  formatAllRows();
}

function styleHeaderRow(sheet) {
  var header = sheet.getRange(1, 1, 1, NUM_COLS);
  header
    .setBackground("#1a1a1a")
    .setFontColor("#ffb400")
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle");
  sheet.setRowHeight(1, 36);
}

function formatDataRow(sheet, row) {
  if (row < 2) return;

  var range = sheet.getRange(row, 1, 1, NUM_COLS);
  range.setVerticalAlignment("middle");
  range.setBorder(
    true,
    true,
    true,
    true,
    true,
    true,
    "#e5e7eb",
    SpreadsheetApp.BorderStyle.SOLID
  );

  if (row % 2 === 0) {
    range.setBackground("#f9fafb");
  } else {
    range.setBackground("#ffffff");
  }

  sheet.getRange(row, 1).setNumberFormat("dd-mmm-yyyy hh:mm");
  sheet.getRange(row, 7).setNumberFormat("dd-mmm-yyyy");
  sheet.getRange(row, 8).setNumberFormat("hh:mm");
  sheet.getRange(row, 9).setNumberFormat("dd-mmm-yyyy");
  sheet.getRange(row, 10).setNumberFormat("hh:mm");
  sheet.getRange(row, 3).setNumberFormat("@");
  sheet.getRange(row, 14).setFontWeight("bold");

  var statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(STATUS_VALUES, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(row, 14).setDataValidation(statusRule);
}

function formatAllRows() {
  var sheet = getBookingsSheet();
  var lastRow = sheet.getLastRow();
  for (var row = 2; row <= lastRow; row++) {
    formatDataRow(sheet, row);
  }
}

function applyConditionalFormatting(sheet) {
  sheet.clearConditionalFormatRules();

  var rules = [];

  var todayRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied("=AND($G2<>\"\",$G2=TODAY())")
    .setBackground("#dcfce7")
    .setRanges([sheet.getRange("A2:N1000")])
    .build();
  rules.push(todayRule);

  var pastRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied("=AND($G2<>\"\",$G2<TODAY())")
    .setBackground("#f3f4f6")
    .setFontColor("#9ca3af")
    .setRanges([sheet.getRange("A2:N1000")])
    .build();
  rules.push(pastRule);

  var testRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=REGEXMATCH($M2,"(?i)test")')
    .setFontColor("#dc2626")
    .setRanges([sheet.getRange("A2:N1000")])
    .build();
  rules.push(testRule);

  var newStatusRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("New")
    .setBackground("#fef3c7")
    .setRanges([sheet.getRange("N2:N1000")])
    .build();
  rules.push(newStatusRule);

  sheet.setConditionalFormatRules(rules);
}

function setupDashboard(ss) {
  var sheet = ss.getSheetByName(DASHBOARD_SHEET);
  if (sheet) {
    ss.deleteSheet(sheet);
  }
  sheet = ss.insertSheet(DASHBOARD_SHEET);

  sheet.getRange("A1").setValue("Aaru Cab — Booking Dashboard").setFontSize(18).setFontWeight("bold");
  sheet.getRange("A2").setValue("Live metrics from the Bookings tab").setFontColor("#6b7280");

  var kpis = [
    ["Total Inquiries", "=COUNTA(Bookings!B2:B)"],
    ["This Week", '=COUNTIFS(Bookings!A2:A,">="&TODAY()-7)'],
    ["Upcoming (7 days)", '=COUNTIFS(Bookings!G2:G,">="&TODAY(),Bookings!G2:G,"<="&TODAY()+7)'],
    ["Today's Trips", "=COUNTIF(Bookings!G2:G,TODAY())"],
  ];

  sheet.getRange(4, 1, 4, 1).setValues(kpis.map(function (k) { return [k[0]]; }));
  sheet.getRange(4, 2, 4, 1).setValues(kpis.map(function (k) { return [k[1]]; }));
  sheet.getRange("A4:A7").setFontWeight("bold");
  sheet.getRange("B4:B7").setFontSize(14).setFontWeight("bold").setHorizontalAlignment("center");
  sheet.getRange("A4:B7").setBorder(true, true, true, true, true, true, "#e5e7eb", SpreadsheetApp.BorderStyle.SOLID);

  sheet.getRange("A9").setValue("Inquiries — Last 7 Days").setFontWeight("bold");
  sheet.getRange("A11").setFormula("=ARRAYFORMULA(TODAY()-7+SEQUENCE(7))");
  sheet.getRange("B11").setFormula(
    '=ARRAYFORMULA(COUNTIFS(Bookings!A:A,">="&A11:A17,Bookings!A:A,"<"&A11:A17+1))'
  );
  sheet.getRange("A11:B17").setNumberFormat("dd-mmm");

  var bookings = ss.getSheetByName(BOOKINGS_SHEET);

  var charts = sheet.getCharts();
  for (var i = 0; i < charts.length; i++) {
    sheet.removeChart(charts[i]);
  }

  var lineChart = sheet
    .newChart()
    .setChartType(Charts.ChartType.LINE)
    .addRange(sheet.getRange("A11:B17"))
    .setPosition(4, 4, 0, 0)
    .setOption("title", "Inquiries by Day")
    .setOption("legend", { position: "none" })
    .setOption("width", 420)
    .setOption("height", 260)
    .build();
  sheet.insertChart(lineChart);

  var pieChart = sheet
    .newChart()
    .setChartType(Charts.ChartType.PIE)
    .addRange(bookings.getRange("D2:D"))
    .setPosition(4, 10, 0, 0)
    .setOption("title", "Trip Types")
    .setOption("width", 380)
    .setOption("height", 260)
    .build();
  sheet.insertChart(pieChart);

  var vehicleChart = sheet
    .newChart()
    .setChartType(Charts.ChartType.COLUMN)
    .addRange(bookings.getRange("L2:L"))
    .setPosition(16, 4, 0, 0)
    .setOption("title", "Vehicle Preference")
    .setOption("legend", { position: "none" })
    .setOption("width", 420)
    .setOption("height", 260)
    .build();
  sheet.insertChart(vehicleChart);

  var pickupChart = sheet
    .newChart()
    .setChartType(Charts.ChartType.COLUMN)
    .addRange(bookings.getRange("E2:E"))
    .setPosition(16, 10, 0, 0)
    .setOption("title", "Pickup Locations")
    .setOption("legend", { position: "none" })
    .setOption("width", 380)
    .setOption("height", 260)
    .build();
  sheet.insertChart(pickupChart);

  sheet.setColumnWidth(1, 180);
  sheet.setColumnWidth(2, 120);
}

function setupTodaySheet(ss) {
  var sheet = ss.getSheetByName(TODAY_SHEET);
  if (sheet) {
    ss.deleteSheet(sheet);
  }
  sheet = ss.insertSheet(TODAY_SHEET);

  sheet.getRange("A1").setValue("Upcoming Trips").setFontSize(16).setFontWeight("bold");
  sheet.getRange("A2").setFormula(
    '=QUERY(Bookings!A:N,"SELECT B, C, D, E, F, G, H, L, N WHERE G >= date \'"&TEXT(TODAY(),"yyyy-mm-dd")&"\' ORDER BY G, H",1)'
  );

  var header = sheet.getRange(2, 1, 1, 9);
  header.setBackground("#1a1a1a").setFontColor("#ffb400").setFontWeight("bold");
  sheet.setFrozenRows(2);
}
