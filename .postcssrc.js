// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-inject": {
      "cssFilePath": 'src/styles/var.css'
    },
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}
