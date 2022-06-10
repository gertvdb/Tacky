// only use plugins from here : https://cssdb.org/
const fs = require("fs");
const mkdirp = require('mkdirp');
const postcss = require('postcss');
const config = require('config');

const processor = postcss([
    require('postcss-import'),
    require('autoprefixer'),
    require('postcss-nesting'),
    require('postcss-custom-media'),
    require('postcss-media-minmax'),
    require('postcss-pseudo-class-any-link'),
    require('cssnano')]
)

const css = fs.readFileSync(inputFilename);

const conf = config.read();

postcss(processor)
    .process(
        css, {
            from : conf.entry.path + '/' + conf.entry.filename,
            to: conf.output.path + '/' + conf.output.filename,
        }
    )
    .then(result => {
        mkdirp(conf.output.path).then(
            made =>
                fs.writeFile(conf.output.path + '/' + conf.output.filename, result.css, (err) => {})
        )
    }
);