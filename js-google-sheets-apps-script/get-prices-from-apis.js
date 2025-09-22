/**
 * Fetches cryptocurrency prices from CoinMarketCap API
 *
 * Uses CoinMarketCap API to fetch real-time cryptocurrency prices in USD.
 * API documentation: https://coinmarketcap.com/api/documentation/v1/
 * Free tier API key available at: https://pro.coinmarketcap.com/account
 *
 * @param {string} apiKey - CoinMarketCap API key for authentication
 * @param {string} symbols - Comma-separated cryptocurrency symbols (e.g., "BTC,ETH,DOGE")
 * @returns {Array<Array<string|number>>} 2D array with headers ["Symbol", "Price"] for Google Sheets
 * @throws {Error} If API request fails or response parsing fails
 */
function getPricesFromCoinMarketCap(apiKey, symbols) {
  try {
    const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${symbols}&aux=cmc_rank`;
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-CMC_PRO_API_KEY": apiKey,
      },
    };

    const response = UrlFetchApp.fetch(url, requestOptions);
    const jsonResponse = JSON.parse(response.getContentText());

    // Convert to 2D array for Google Sheets
    const result = [["Symbol", "Price"]];

    for (const symbol of symbols.split(",")) {
      const price = jsonResponse.data[symbol][0].quote.USD.price;
      result.push([symbol, price]);
    }

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}

/**
 * Fetches cryptocurrency prices from MaiCoin Max API
 *
 * Uses MaiCoin Max API to fetch real-time cryptocurrency trading pairs and prices.
 * API documentation: https://max.maicoin.com/documents/api_list/v3/
 * No authentication required for public endpoints.
 *
 * @returns {Array<Array<string|number>>} 2D array with headers ["Market", "Price"] for Google Sheets
 * @throws {Error} If API request fails or response parsing fails
 */
function getPricesFromMaiCoinMax() {
  try {
    const url = "https://max-api.maicoin.com/api/v3/wallet/m/index_prices";
    const requestOptions = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    const response = UrlFetchApp.fetch(url, requestOptions);
    const jsonResponse = JSON.parse(response.getContentText());

    // Convert to 2D array for Google Sheets
    const result = [["Market", "Price"]];

    for (const [market, price] of Object.entries(jsonResponse)) {
      result.push([market.toUpperCase(), parseFloat(price)]);
    }

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}

// Just for debugging, please ignore
function showVersion() {
  return "v1";
}
