const fs = require("fs");
const path = require("path");
const appRootPath = require("app-root-path");
const defaultConfig = require("./defaultConfig");

function read() {
    if (fs.existsSync(path.join(appRootPath.toString(), '/tacky.config.js'))) {
        return require(path.resolve("./tacky.config.js"));
    }

    return defaultConfig;
}

module.exports = {
    read
};