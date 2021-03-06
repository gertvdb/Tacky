#!/usr/bin/env node

// Shared Dependencies
const mkdirp = require("mkdirp");
const fs = require("fs");

// CSS
const path = require('path');
const prettier = require('prettier');

// Config
const { fetchColors, fetchFonts, fetchAtoms, fetchMolecules, fetchOrganisms, fetchPages  } = require('./fetch');
const appConfig = require("./config").read();

// Build
const postcss = require('postcss');
const processor = postcss([
    require('postcss-import'),
    require('autoprefixer'),
    require('postcss-nesting'),
    require('postcss-custom-media'),
    require('postcss-media-minmax'),
    require('postcss-pseudo-class-any-link'),
    require('cssnano')]
)

postcss(processor)
    .process(
        fs.readFileSync(path.join('./', appConfig.entry.path + '/' + appConfig.entry.filename)), {
            from : path.join('./', appConfig.entry.path + '/' + appConfig.entry.filename),
            to: path.join('./', appConfig.output.path + '/' + appConfig.output.filename),
        }
    )
    .then(result => {
            mkdirp(path.join('./', appConfig.output.path)).then(
                made =>
                    fs.writeFile(path.join('./', appConfig.output.path + '/' + appConfig.output.filename), result.css, (err) => {})
            )
        }
    );

// SERVER
const express = require('express');
const app = express();
const port = 3000

// TEMPLATES
const nunjucks = require("nunjucks");
nunjucks.configure(
    [
        path.join('./', appConfig.entry.path),
        __dirname + '/../_styleguide/templates'
    ],
    {
            express: app,
            autoescape: true,
            noCache: true,
            watch: false
    }
)
.addFilter(
    'code',
    function (str) {
        str = str.replace(/\s+/g, ' ').trim();
        return prettier.format(str, {semi: false, parser: "html", htmlWhitespaceSensitivity: "ignore"});
    }
);

app.use('/project', express.static(path.join('./', appConfig.output.path)));
app.use('/styleguide', express.static(__dirname + '/../_styleguide/css'));

app.get('/', function(req, res) {

    const configColors = appConfig.base.colors ? appConfig.base.colors : [];
    const configFonts = appConfig.base.fonts ? appConfig.base.fonts : [];
    const configAtoms = appConfig.templates.atoms ? appConfig.templates.atoms : [];
    const configMolecules = appConfig.templates.molecules ? appConfig.templates.molecules : [];

    let  data = {
        project: appConfig.project,
        author: appConfig.author,
        ui_accent: appConfig.ui.accent,
        ui_font: appConfig.ui.font,
        colors:  fetchColors(),
        color_files: configColors,
        fonts: fetchFonts(),
        font_files: configFonts,
        atoms: fetchAtoms(),
        atom_files: configAtoms,
        molecules: fetchMolecules(),
        molecule_files: configMolecules,
        organisms: fetchOrganisms(),
        pages: fetchPages(),
        cssFile: appConfig.output.filename
    }

    res.render('index.njk', data);
});

app.get('/preview/:page', function(req, res) {
    let reqPage = req.params.page;

    let page = null;
    appConfig.pages.forEach(function (value, index, array) {
        if (value.name === reqPage) {
            page = value
        }
    });

    let  data = {
        project: appConfig.project,
        author: appConfig.author,
        cssFile: appConfig.output.path,
        name: page.name,
        preview: page
    }

    res.render('preview.njk', data);
});

// Bind app.
app.listen(port, () => {
    console.log(`styleguide listening on port ${port}`)
});
