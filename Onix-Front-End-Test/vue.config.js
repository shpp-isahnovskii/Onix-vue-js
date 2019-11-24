module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData:'@import "./src/assets/styles/variables.scss"; @import "./src/assets/styles/buttons.scss";'
      }
    }
  },
  runtimeCompiler: true
};