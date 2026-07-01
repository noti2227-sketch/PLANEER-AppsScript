/**
 * SheetManager.gs
 * PLANEER
 */

const BAZA_HEADERS = [
  "DATA",
  "START",
  "KONIEC",
  "KIEROWCA",
  "SKĄD",
  "DOKĄD",
  "POWRÓT",
  "PACJENT",
  "ZLECAJĄCY",
  "TRYB",
  "CEL"
];

/**
 * Tworzy wszystkie arkusze szpitali
 */
function createHospitalSheets() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  HOSPITAL_SHEETS.forEach(sheetName => {

    let sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    // Nagłówek
    sheet.getRange(1, 1, 1, BAZA_HEADERS.length)
      .setValues([BAZA_HEADERS]);

    sheet.getRange(1, 1, 1, BAZA_HEADERS.length)
      .setFontWeight("bold")
      .setBackground("#D9EAD3")
      .setHorizontalAlignment("center");

    sheet.setFrozenRows(1);

    try {
      if (sheet.getFilter()) {
        sheet.getFilter().remove();
      }
      sheet.getRange(1, 1, 1, BAZA_HEADERS.length).createFilter();
    } catch (e) {}

  });

}

/**
 * Czyści dane z arkuszy
 */
function clearHospitalSheets() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  HOSPITAL_SHEETS.forEach(sheetName => {

    const sheet = ss.getSheetByName(sheetName);

    if (!sheet) return;

    const lastRow = sheet.getLastRow();

    if (lastRow > 1) {

      sheet.getRange(
        2,
        1,
        lastRow - 1,
        BAZA_HEADERS.length
      ).clearContent();

    }

  });

}

/**
 * Rozdziela dane z BAZA
 */
function distributeHospitalData() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const baza = ss.getSheetByName("BAZA");

  if (!baza) {
    throw new Error("Brak arkusza BAZA.");
  }

  const lastRow = baza.getLastRow();

  if (lastRow < 2) return;

  const data = baza.getRange(
    2,
    1,
    lastRow - 1,
    BAZA_HEADERS.length
  ).getValues();

  const grouped = {};

  data.forEach(row => {

    const from = row[4];
    const to = row[5];

    let sheetName = getHospitalSheetName(to);

    if (
      sheetName === "RCKIK" ||
      sheetName === "INNE"
    ) {
      sheetName = getHospitalSheetName(from);
    }

    if (!grouped[sheetName]) {
      grouped[sheetName] = [];
    }

    grouped[sheetName].push(row);

  });

  Object.keys(grouped).forEach(sheetName => {

    const sheet = ss.getSheetByName(sheetName);

    if (!sheet) return;

    sheet.getRange(
      2,
      1,
      grouped[sheetName].length,
      BAZA_HEADERS.length
    ).setValues(grouped[sheetName]);
        // Format daty
    sheet.getRange(
      2,
      1,
      grouped[sheetName].length,
      1
    ).setNumberFormat("dd.MM.yyyy");

    // Format godziny START
    sheet.getRange(
      2,
      2,
      grouped[sheetName].length,
      1
    ).setNumberFormat("HH:mm");

    // Format godziny KONIEC
    sheet.getRange(
      2,
      3,
      grouped[sheetName].length,
      1
    ).setNumberFormat("HH:mm");

    // Sortowanie
    if (grouped[sheetName].length > 1) {

      sheet.getRange(
        2,
        1,
        grouped[sheetName].length,
        BAZA_HEADERS.length
      ).sort([
        { column: 1, ascending: true },
        { column: 2, ascending: true }
      ]);

    }

    // Automatyczna szerokość kolumn
    for (let col = 1; col <= BAZA_HEADERS.length; col++) {
      sheet.autoResizeColumn(col);
    }

  });

}

/**
 * Odbudowuje wszystkie arkusze
 */
function rebuildHospitalSheets() {

  createHospitalSheets();
  clearHospitalSheets();
  distributeHospitalData();

}

/**
 * Odświeża arkusze
 */
function refreshHospitalSheets() {
  rebuildHospitalSheets();
}

/**
 * Alias
 */
function rebuildAll() {
  rebuildHospitalSheets();
}

/**
 * Test działania
 */
function test() {
  SpreadsheetApp.getUi().alert("DZIAŁA");
}
