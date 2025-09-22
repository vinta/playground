/**
 * Fetches cryptocurrency prices from CoinMarketCap API
 *
 * Uses CoinMarketCap API to fetch real-time cryptocurrency prices in USD.
 * API documentation: https://coinmarketcap.com/api/documentation/v1/
 * Free tier API key available at: https://pro.coinmarketcap.com/account
 *
 * @param {string} apiKey - CoinMarketCap API key for authentication
 * @param {string} symbols - Comma-separated cryptocurrency symbols (e.g., "BTC,ETH,DOGE")
 * @returns {number[]} Array of USD prices corresponding to each symbol in order
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

    const result = UrlFetchApp.fetch(url, requestOptions);
    const jsonResult = JSON.parse(result.getContentText());

    const prices = [];
    for (const symbol of symbols.split(",")) {
      const price = jsonResult.data[symbol][0].quote.USD.price;
      prices.push(price);
    }

    return prices;
  } catch (err) {
    throw new Error(err.message);
  }
}

// Just for debugging, please ignore
function showVersion() {
  return "v1";
}
