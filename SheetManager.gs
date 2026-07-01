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

function createHospitalSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  HOSPITAL_SHEETS.forEach(name => {
    let sh = ss.getSheetByName(name);
    if (!sh) {
      sh = ss.insertSheet(name);
    }

    if (sh.getLastRow() === 0) {
      sh.getRange(1, 1, 1, BAZA_HEADERS.length).setValues([BAZA_HEADERS]);
    } else {
      sh.getRange(1, 1, 1, BAZA_HEADERS.length).setValues([BAZA_HEADERS]);
    }
  });
}

function clearHospitalSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  HOSPITAL_SHEETS.forEach(name => {
    const sh = ss.getSheetByName(name);
    if (!sh) return;

    const lastRow = sh.getLastRow();
    if (lastRow > 1) {
      sh.getRange(2, 1, lastRow - 1, BAZA_HEADERS.length).clearContent();
    }
  });
}

function distributeHospitalData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const baza = ss.getSheetByName("BAZA");

  if (!baza) throw new Error("Brak arkusza BAZA.");

  const lastRow = baza.getLastRow();
  if (lastRow < 2) return;

  const data = baza.getRange(2, 1, lastRow - 1, BAZA_HEADERS.length).getValues();

  const grouped = {};

  data.forEach(row => {
    const destination = row[5];
    const sheetName = getHospitalSheetName(destination);

    if (!grouped[sheetName]) grouped[sheetName] = [];
    grouped[sheetName].push(row);
  });

  Object.keys(grouped).forEach(sheetName => {
    const sh = ss.getSheetByName(sheetName);
    if (!sh) return;

    sh.getRange(2, 1, grouped[sheetName].length, BAZA_HEADERS.length)
      .setValues(grouped[sheetName]);
  });
}

function rebuildHospitalSheets() {
  createHospitalSheets();
  clearHospitalSheets();
  distributeHospitalData();
}
