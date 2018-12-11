const path = require("path");

const appSrc = path.join(__dirname, "src");
console.log(appSrc);

module.exports = {
  baseUrl: process.env.VUE_APP_BASE_URL,
  configureWebpack: {
    resolve: {
      alias: {
        "@assets": path.join(appSrc, "assets"),
        "@components": path.join(appSrc, "components"),
        "@config": path.join(appSrc, "config"),
        "@constants": path.join(appSrc, "utilities", "constants"),
        "@plugins": path.join(appSrc, "plugins"),
        "@store": path.join(appSrc, "store"),
        "@styles": path.join(appSrc, "styles"),
        "@views": path.join(appSrc, "views"),
        "@utilities": path.join(appSrc, "utilities")
      },
      extensions: ["js", "jsx", "vue", "json", ".scss"]
    },
    plugins: []
  },

  lintOnSave: false,

  pwa: {
    name: "Onboard Canada"
  }
};
