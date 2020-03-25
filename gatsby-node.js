// const fs = require("fs-extra")
// const path = require("path")
//
// exports.onPostBuild = () => {
//   console.log("Copying locales")
//   fs.copySync(
//     path.join(__dirname, "/src/locales"),
//     path.join(__dirname, "/public/locales"),
//   )
// }

// exports.onCreateNode = require("./src/gatsby/node/onCreateNode");
// exports.onCreatePage = require("./src/gatsby/node/onCreatePage");
exports.createSchemaCustomization = require("./src/gatsby/node/createSchema");
exports.createResolvers = require("./src/gatsby/node/createResolvers");
// exports.createPages = require("./src/gatsby/node/createPages");

