const fs = require('fs');

function createStream(output) {
    if (output !== 'console') {
        return fs.createWriteStream(`./${output}`);
    }
    return process.stdout;
}

module.exports = createStream;