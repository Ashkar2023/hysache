const CONTACT_SHEET_NAME = 'Sheet1';
const CONTACT_HEADERS = ['name', 'contact', 'message'];

function doPost(event) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(4000);

    const name = cleanCellValue_(event && event.parameter && event.parameter.name);
    const contact = cleanCellValue_(event && event.parameter && event.parameter.contact);
    const message = cleanCellValue_(event && event.parameter && event.parameter.message);

    if (!name || !contact || !message) {
      return jsonResponse_({ ok: false, error: 'Name, contact and message are required.' });
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(CONTACT_SHEET_NAME);

    if (!sheet) {
      throw new Error('Sheet "' + CONTACT_SHEET_NAME + '" was not found.');
    }

    sheet.getRange(1, 1, 1, CONTACT_HEADERS.length).setValues([CONTACT_HEADERS]);

    const nextRow = Math.max(sheet.getLastRow() + 1, 2);
    sheet.getRange(nextRow, 1, 1, CONTACT_HEADERS.length).setValues([[
      safeText_(name),
      safeText_(contact),
      safeText_(message),
    ]]);

    return jsonResponse_({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, error: error.message });
  } finally {
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
}

function cleanCellValue_(value) {
  return String(value || '').trim();
}

function safeText_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
