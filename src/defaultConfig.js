const basePath = 'src';
module.exports = {
    project: 'My Project',
    author: 'Tacky',
    ui: {
        accent: '#556cd6',
        font: 'Noto Sans'
    },
    entry: {
        path: basePath,
        filename: 'style.css',
    },
    output: {
        path: 'dist',
        filename: 'style.min.css',
    },
    base: {
        colors: [basePath + '/base/colors.css'],
        fonts: [basePath + '/base/fonts.css'],
    },
    templates: {
        atoms: [basePath + '/components/atom/**/*.njk'],
        molecules: [basePath + '/components/molecule/**/*.njk'],
        organisms: [basePath + '/components/organism/**/*.njk'],
        pages: [basePath + '/components/pages/**/*.njk'],
    },
    utilities: [basePath + '/utilities/**/*.njk'],
}
