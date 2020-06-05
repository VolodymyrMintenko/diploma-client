const { fixBabelImports, override } = require("customize-cra");

module.exports = override(
  fixBabelImports("@material-ui/core", {
    libraryName: "@material-ui/core",
    libraryDirectory: "",
    camel2DashComponentName: false
  }),
  fixBabelImports("@material-ui/icons", {
    libraryName: "@material-ui/icons",
    libraryDirectory: "",
    camel2DashComponentName: false
  }),
  fixBabelImports("notistack", {
    libraryDirectory: "build",
    camel2DashComponentName: false
  }),
  fixBabelImports("lodash", {
    libraryDirectory: "",
    camel2DashComponentName: false
  }),
  fixBabelImports("redux", {
    libraryDirectory: "src",
    camel2DashComponentName: false
  })
);
