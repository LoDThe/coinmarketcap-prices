function muFunction() {
  const options = {
     'method' : 'GET',
     'headers' : {
       'X-CMC_PRO_API_KEY' : '<YOUR CCM TOKEN>'
     }
   };
  const response = UrlFetchApp.fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", options);
  const data = JSON.parse(response.getContentText()).data;
  
  let rowsToAppend = [];
  
  for (const currency of data) {
    if (!currency.quote || !currency.quote.USD) {
      continue;
    }
    rowsToAppend.push([
        currency.id,
        currency.symbol,
        currency.name,
        currency.quote.USD.price,
        currency.quote.USD.last_updated,
        currency.quote.USD.volume_24h,
        currency.quote.USD.percent_change_1h,
        currency.quote.USD.percent_change_24h,
        currency.quote.USD.market_cap
      ]);
  }
  
  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.insertRowsBefore(2, rowsToAppend.length)
  const range = sheet.getRange(2, 1, rowsToAppend.length, rowsToAppend[0].length)
  range.setValues(rowsToAppend);
}
