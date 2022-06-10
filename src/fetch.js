const glob = require("glob");
const { parseFileSync } = require('css-variables-parser');
const appConfig = require(__dirname + "/config").read();
const path = require("path");
const validateColor = require("validate-color").default;

/**
 * Fetch colors
 * @returns {*[]}
 */
function fetchColors() {
    let colors = [];
    const configColors = appConfig.base.colors ? appConfig.base.colors : [];

    configColors.forEach(function (toGlob) {
        let files = glob.sync(toGlob, []);
        if (files) {
            files.forEach(function (file) {
                const variables = parseFileSync(file);
                if (variables) {
                    Object.keys(variables).forEach(function (key) {
                        if (validateColor(variables[key])) {
                            colors.push({'name': key, 'color': variables[key]});
                        }
                    })
                }
            });
        }
    });

    return colors;
}

/**
 * Fetch fonts
 * @returns {*[]}
 */
function fetchFonts() {
    let fonts = [];
    const configFonts = appConfig.base.fonts ? appConfig.base.fonts : [];

    configFonts.forEach(function (toGlob) {
        let files = glob.sync(toGlob, []);
        if (files) {
            files.forEach(function (file) {
                const variables = parseFileSync(file);
                if (variables) {
                    Object.keys(variables).forEach(function (key) {
                        fonts.push({'name': key, 'font': variables[key]});
                    })
                }
            });
        }
    });

    return fonts;
}

function fetchAtoms() {
    let atoms = [];
    const configAtoms = appConfig.templates.atoms ? appConfig.templates.atoms : [];

    configAtoms.forEach(function (toGlob) {
        let files = glob.sync(toGlob, []);
        if (files) {
            files.forEach(function (file) {
                if (file) {
                    let name = path.basename(file).replace('.njk', '')
                    let include = file.replace('src/', '');
                    atoms.push({'name': name, 'include': include});
                }
            });
        }
    });

    return atoms;
}

function fetchMolecules() {
    let molecules = [];
    const configMolecules = appConfig.templates.molecules ? appConfig.templates.molecules : [];

    configMolecules.forEach(function (toGlob) {
        let files = glob.sync(toGlob, []);
        if (files) {
            files.forEach(function (file) {
                if (file) {
                    let name = path.basename(file).replace('.njk', '')
                    let include = file.replace('src/', '');
                    molecules.push({'name': name, 'include': include});
                }
            });
        }
    });

    return molecules;
}

function fetchOrganisms() {
    let organisms = [];
    const configOrganisms = appConfig.templates.organisms ? appConfig.templates.organisms : [];

    configOrganisms.forEach(function (toGlob) {
        let files = glob.sync(toGlob, []);
        if (files) {
            files.forEach(function (file) {
                if (file) {
                    let name = path.basename(file).replace('.njk', '')
                    let include = file.replace('src/', '');
                    organisms.push({'name': name, 'include': include});
                }
            });
        }
    });

    return organisms;
}

function fetchPages() {
    let pages = [];
    const configPages = appConfig.templates.pages ? appConfig.templates.pages : [];

    configPages.forEach(function (toGlob) {
        let files = glob.sync(toGlob, []);
        if (files) {
            files.forEach(function (file) {
                if (file) {
                    let name = path.basename(file).replace('.njk', '')
                    let include = file.replace('src/', '');
                    pages.push({ 'name': name, 'include': include });
                }
            });
        }
    });

    return pages;
}

module.exports = {
    fetchColors,
    fetchFonts,
    fetchAtoms,
    fetchMolecules,
    fetchOrganisms,
    fetchPages
};