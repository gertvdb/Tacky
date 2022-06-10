const fs = require("fs");
const path = require("path");
const defaultConfig = require("./defaultConfig");

function read() {
    if (fs.existsSync(path.join('./', 'tacky.config.js'))) {
        return require(path.resolve(path.join('./', 'tacky.config.js')));
    }

    return defaultConfig;
}

module.exports = {
    read
};