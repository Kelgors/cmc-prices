const { promises: fs } = require('fs');

function writeStream(stream, text) {
    return new Promise(function (resolve) {
        stream.write(text, resolve);
    });
}

module.exports = function (root, stream) {
    console.info('Converting to JSON...');
    const data = root.data;
    const idArray = Object.keys(data);
    const output = [];
    for (let index = 0; index < idArray.length; index++) {
        const id = idArray[index];
        const { symbol, quote, circulating_supply, max_supply } = data[id];
        output.push({
            symbol: symbol,
            price: quote.USD.price,
            circulatingSupply: parseInt(circulating_supply, 10),
            maxSupply: parseInt(max_supply, 10),
        });
    }
    return writeStream(stream, JSON.stringify(output, null, 2));
}