function toCsvInt(number) {
    return (number | 0).toString().split('.')[0];
}

function toCsvFloat(number) {
    return (number || 0).toString().replace('.', ',');
}

function writeStream(stream, text) {
    return new Promise(function (resolve) {
        stream.write(text + '\r\n', resolve);
    });
}

module.exports = async function convertToCsv(root, stream) {
    console.info('Converting to CSV...');
    const data = root.data;
    const idArray = Object.keys(data);
    await writeStream(stream, 'symbol,price,circulating_supply,max_supply');
    for (let index = 0; index < idArray.length; index++) {
        const id = idArray[index];
        const { symbol, quote, circulating_supply, max_supply } = data[id];
        await writeStream(stream, [
            symbol,
            `"${toCsvFloat(quote.USD.price)}"`,
            toCsvInt(circulating_supply),
            toCsvInt(max_supply)
        ].join(','));
    }
}