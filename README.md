# CoinMarketCap prices

[This google spreadsheet](https://docs.google.com/spreadsheets/d/1DorE5giBTY2l355rIire5kcYsTGhs7VvaPXe2mCVO5k/edit?usp=sharing) contains historical cryptocurrencies price in USD from the [CoinMarKetCap](coinmarketcap.com). 

Relevant prices are added to the table every 4 hours. 

This is done by executing the following code every 4 hours by a Google Apps Scripts trigger:
```javascript
function muFunction() {
  const options = {
     'method' : 'GET',
     'headers' : {
       'X-CMC_PRO_API_KEY' : '<put here your CCM token'
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
```