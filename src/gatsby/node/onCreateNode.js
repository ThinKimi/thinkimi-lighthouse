// const path = require(`path`)
const locales = require("../../../locales/locales")
const {
  findKey,
} = require(`../../utils/gatsby-node-helpers`)


const onCreateNode = ({ node, getNode, actions, reporter }) => {
  const { createNode, createParentChildLink, createNodeField } = actions

  const {
    absolutePath,
    internal: { type },
    sourceInstanceName,
    relativeDirectory,
    name,
    id,
  } = node

  // Check for "ProductJson" type so that other files (e.g. images) are excluded
  if (type === `ProductJson`) {
    // Use path.basename
    // https://nodejs.org/api/path.html#path_path_basename_path_ext
    // const name = path.basename(node.absolutePath, `.json`)
    const parent = getNode(node.parent)

    // Find the key that has "default: true" set (in this case it returns "zh")
    const defaultKey = findKey(locales, o => o.default === true)
    //
    // // Check if post.name is "index" -- because that's the file for default language
    // // (In this case "zh")
    // const isDefault = node.parent.relativePath.startsWith(defaultKey);


    // Files are defined with "name-with-dashes.lang.json"
    // name returns "name-with-dashes.lang"
    // So grab the lang from that string
    // If it's the default language, pass the locale for that
    const lang = parent.relativePath.split(`/`)[0];
    const isDefault = lang === defaultKey;

    const activity = reporter.activityTimer(
      `@kimichen13: create node: ${relativeDirectory}_${name}`,
    );
    createNodeField({ node, name: `locale`, value: lang });
    createNodeField({ node, name: `isDefault`, value: isDefault });
    activity.end();
  }
}

module.exports = onCreateNode
