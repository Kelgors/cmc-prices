# cmc-prices

Fetch prices and market cap from CoinMarketCap API

You need an API key to get it working (https://coinmarketcap.com/api/)

Install it with `npm install -g cmc-prices`

### Help

```sh
cryptoprices help
```

### Fetch prices

```sh
# command with options
cryptoprices --format <csv or json> --output <file path, default to console> --apikey <CoinMarketCap api key> [--sandbox]
# minimum command (csv to console)
cryptoprices --apikey <CoinMarketCap api key>
# fetch prices for BTC,ETH,LTC and save it to ./prices.csv
cryptoprices --format csv --output prices.csv --apikey <CoinMarketCap api key> --symbols BTC,ETH,LTC
# fetch prices for BTC,ETH,LTC and save it to ./current_prices.json
cryptoprices --format json --output ~/.current_prices.json --apikey <CoinMarketCap api key> --symbols BTC,ETH,LTC
```

### Symbol file

If you are not providing symbols (BTC,ETH,...) in the command line, it will look for a symbol file (named: symbols) with all symbols separated by a line feed