// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-advanced-variables": {
      "importRoot": 'src/styles/var.css'
    },
    "postcss-url": {},
    "postcss-inject": {
      "cssFilePath": 'src/styles/var.css'
    },
    "postcss-color-function": {},
    "precss": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}
