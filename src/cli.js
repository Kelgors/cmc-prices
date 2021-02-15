const transformers = require('./transformers');
const PriceFetch = require('./PriceFetch');
const createOuputStream = require('./createOutputStream');

function cli() {
    var argv = require('yargs')
        .alias('O', 'output')
        .alias('F', 'format')
        .alias('S', 'symbol')
        .alias('K', 'apikey')
        .boolean('sandbox')
        .usage('Usage: $0 [options]')
        .example('$0 -O csv -S BTC,ETH', 'List BTC and ETH prices and output it to a csv file')
        .describe('O', 'csv|json|console (default output: console)')
        .describe('S', 'Comma separated list of symbols (BTC,ETH,...). If no value are given, try to read a symbol file (symbol separated by line-break)')
        .describe('K', 'Api Key to use CoinMarketCap api (https://coinmarketcap.com/api/)')
        .help('h')
        .alias('h', 'help')
        .argv;

    const output = argv.O || 'console';
    const format = argv.F || 'csv';
    let symbols = argv.S;
    let apiKey = argv.K;

    if (!apiKey) {
        console.error('Please provide an api key for CoinMarketCap. You can create one for free at https://coinmarketcap.com/api/');
        return 1;
    }

    return PriceFetch.fetchPrices(symbols, { sandbox: argv.sandbox, apiKey })
        .then(function (response) {
            console.info('CoinMarketCap status', response.data.status);
            return transformers[format](response.data, createOuputStream(output));
        })
        .catch(function (error) {
            if (error.response) {
                console.error('CoinMarketCap status', error.response.data.status);
            } else {
                console.error(error);
            }
            return 1;
        });
}

module.exports = {
    cli
};