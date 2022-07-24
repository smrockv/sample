//HTTP GETをハンドリングする
function doGet(e) {
    //リクエストパラメータ名"text"の値を取得する
    //var text = e.parameter.text;
    //const result = {
    //  result: 'OK. ' + text + ' email:' + loginUser
    //}
    //let rows = [];
    //if ('shop' in e.parameter) {
    //  const shop = e.parameter.shop;
    //  rows = readData(shop);
    //} else {
    //  rows = readAllData();
    // }
    const rows = readAllData();
    const result = rows.map(row => ({ 'shop': row[0], 'item': row[1] }))
    const out = ContentService.createTextOutput();
    const responseText = JSON.stringify(result);
    out.setMimeType(ContentService.MimeType.JSON);
    out.setContent(responseText);
    return out;
  }
  
  //HTTP POSTをハンドリングする
  function doPost(e) {
    const jsonString = e.postData.getDataAsString();
    const data = JSON.parse(jsonString);
    writeData([[data.shop, data.item]]);
  
    const result = {
      result: 'OK'
    }
    const out = ContentService.createTextOutput();
    const responseText = JSON.stringify(result);
    out.setMimeType(ContentService.MimeType.JSON);
    out.setContent(responseText);
    return out;
  }
  
  function getData(key) {
    const spreadSheet = SpreadsheetApp.openById('1djwNOT0dIkiRTKzcb7MCx2OYJkBb5003RWiOUQGy4pg');
    const sheet = spreadSheet.getActiveSheet();
  
  }
  function testWriteData() {
    data = {'shop':'有隣堂', 'item':'本'};
  
    writeData([[data.shop, data.item]]);
  }
  function testReadData() {
    const row = readData('有隣堂');
    if (! row) {
      return;
    }
    const data = { 'shop': row[0], 'item': row[1]};
    console.log(data);
  }
  function testAllReadData() {
    const rows = readAllData();
    const result = rows.map(row => ({ 'shop': row[0], 'item': row[1] }))
    console.log(result);
  }
  function writeData(data) {
    const spreadSheet = SpreadsheetApp.openById('1djwNOT0dIkiRTKzcb7MCx2OYJkBb5003RWiOUQGy4pg');
    const sheet = spreadSheet.getActiveSheet();
    console.log(sheet.getLastRow());
    sheet.getRange(sheet.getLastRow()+1, 1, 1, 2).setValues(data);
  }
  function readAllData() {
    const spreadSheet = SpreadsheetApp.openById('1djwNOT0dIkiRTKzcb7MCx2OYJkBb5003RWiOUQGy4pg');
    const sheet = spreadSheet.getActiveSheet();
    const values = sheet.getRange(1, 1, sheet.getLastRow(), 2).getValues();
    return values;
  }
  function readData(shop) {
    const spreadSheet = SpreadsheetApp.openById('1djwNOT0dIkiRTKzcb7MCx2OYJkBb5003RWiOUQGy4pg');
    const sheet = spreadSheet.getActiveSheet();
    const values = sheet.getRange(1, 1, sheet.getLastRow(), 2).getValues();
    return values.find(row => row[0] === shop);
  }
  