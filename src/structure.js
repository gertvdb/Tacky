const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const jsonToCssVariables = require("json-to-css-variables");


function create() {
    const colors = path.join('./','src/base/colors.css');
    if (!fs.existsSync(colors)) {
        mkdirp(path.dirname(colors)).then(made => {
            const options = {
                element: ':root',
                pretty: true
            }

            const cssString = jsonToCssVariables({
                "color-ui-black": '#000000',
                "color-ui-white": '#FFFFFF'
            }, options);

            fs.writeFileSync(colors, cssString);
        });
    }
    const fonts = path.join('./', '/src/base/fonts.css');
    if (!fs.existsSync(fonts)) {
        mkdirp(path.dirname(fonts)).then(made => {
            const options = {
                element: ':root',
                pretty: true
            }

            const cssString = jsonToCssVariables({
                "font-regular" : "500 1rem/1.571rem 'Montserrat', sans-serif",
            }, options);

            fs.writeFileSync(fonts, cssString);
        });
    }

    const atoms = path.join('./', 'src/components/atoms/dummy.njk');
    if (!fs.existsSync(atoms)) {
        mkdirp(path.dirname(atoms)).then(made => {});
    }

    const molecules = path.join('./', 'src/components/molecules/dummy.njk');
    if (!fs.existsSync(molecules)) {
        mkdirp(path.dirname(molecules)).then(made => {});
    }

    const organisms = path.join('./', 'src/components/organisms/dummy.njk');
    if (!fs.existsSync(organisms)) {
        mkdirp(path.dirname(organisms)).then(made => {});
    }

    const pages = path.join('./', 'src/components/pages/dummy.njk');
    if (!fs.existsSync(pages)) {
        mkdirp(path.dirname(pages)).then(made => {});
    }

    const utilities = path.join('./', 'src/utilities/dummy.njk');
    if (!fs.existsSync(utilities)) {
        mkdirp(path.dirname(utilities)).then(made => {});
    }
}

module.exports = {
    create
};