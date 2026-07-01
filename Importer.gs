function importCsvReports() {

  const folder = DriveApp.getFolderById(CONFIG.FOLDER_ID);
  const files = folder.getFiles();

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let base = ss.getSheetByName(CONFIG.MAIN_SHEET);

  if (!base) {
    base = ss.insertSheet(CONFIG.MAIN_SHEET);
    base.appendRow(CONFIG.HEADERS);
  }

  const properties = PropertiesService.getScriptProperties();

  while (files.hasNext()) {

    const file = files.next();

    Logger.log("Znaleziono plik: " + file.getName());

    if (!file.getName().toLowerCase().endsWith(".csv"))
      continue;

    if (properties.getProperty(file.getId())) {
      Logger.log("Już zaimportowany.");
      continue;
    }

    importSingleCsv(file, base);

    properties.setProperty(file.getId(), "OK");

    Logger.log("Zaimportowano.");
  }
}

function importSingleCsv(file, sheet) {

  const csv = Utilities.parseCsv(
    file.getBlob().getDataAsString("UTF-8"),
    ";"
  );

  if (csv.length <= 1)
    return;

  for (let i = 1; i < csv.length; i++) {

    const row = csv[i];

    if (row.length < 11)
      continue;

    if (isIgnoredRow(row))
      continue;

    sheet.appendRow(row);
  }
}

function isIgnoredRow(row) {

  const purpose = (row[10] || "").toUpperCase();

  if (purpose === "UWAGI")
    return true;

  if (purpose === "TANKOWANIE")
    return true;

  return false;
}
