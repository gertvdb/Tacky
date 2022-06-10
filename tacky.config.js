module.exports = {
  "project": "Test",
  "author": "Tactics",
  "ui": {
    "accent": "#556cd6",
    "font": "Noto Sans"
  },
  "entry": {
    "path": "src",
    "filename": "style.css"
  },
  "output": {
    "path": "dist",
    "filename": "style.min.css"
  },
  "base": {
    "colors": ["src/base/colors.css"],
    "fonts": ["src/base/fonts.css"]
  },
  "templates": {
    "atoms": ["src/components/atom/**/*.njk"],
    "molecules": ["src/components/molecule/**/*.njk"],
    "organisms": ["src/components/organism/**/*.njk"],
    "pages": ["src/components/pages/**/*.njk"]
  },
  "utilities": ["src/utilities/**/*.njk"]
}
;