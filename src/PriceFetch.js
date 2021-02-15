const { promises: fs } = require('fs');
const axios = require('axios');
const PRODUCTION_URI = 'https://pro-api.coinmarketcap.com';
const SANDBOX_URI = 'https://sandbox-api.coinmarketcap.com';

function readFileSymbols() {
    console.info('Reading symbols from local file');
    return fs.readFile('./symbols')
        .then(function (buffer) {
            return buffer.toString('utf-8').trim().split(/\r?\n/).join(',');
        });
}

function getSymbols(symbols) {
    if (symbols) return Promise.resolve(Array.isArray(symbols) ? symbols.join(',') : symbols);
    return readFileSymbols();
}

module.exports = {
    async fetchPrices(symbols, options) {
        return getSymbols(symbols)
            .then(function (symbols) {
                const ROUTE = (options.sandbox ? SANDBOX_URI : PRODUCTION_URI) + '/v1/cryptocurrency/quotes/latest';
                console.info(`Api(${ROUTE})\nSymbols: ${symbols}`);
                return axios.get(ROUTE, {
                    params: {
                        'convert': 'USD',
                        'symbol': symbols
                    },
                    headers: {
                        'X-CMC_PRO_API_KEY': options.apiKey
                    },
                });
            });
    }
};