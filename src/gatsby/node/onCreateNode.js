const _ = require(`lodash`)

const onCreateNode = async ({ node, actions, loadNodeContent, createContentDigest, reporter }) => {
  const { createNode, createParentChildLink} = actions

  const {
    absolutePath,
    internal: { type },
    sourceInstanceName,
    relativeDirectory,
    name,
    id,
  } = node

  function transformObject(obj, id, type) {
    const productNode = {
      ...obj,
      id,
      children: [],
      parent: node.id,
      internal: {
        contentDigest: createContentDigest(obj),
        type,
      },
    }
    createNode(productNode)
    createParentChildLink({ parent: node, child: productNode })
  }


  if (type !== "File" || sourceInstanceName !== `locale` || name !== `product`) return

  const activity = reporter.activityTimer(
    `@kimichen13: create node: ${relativeDirectory}_cms`,
  )
  activity.start()

  const content = await loadNodeContent(node)
  const products = JSON.parse(content)

  const cmsNode = {
    products: products,
    id: `${id} >>> Cms`,
    name: name,
    children: [],
    parent: node.id,
    internal: {
      contentDigest: createContentDigest(products),
      type: `Cms`,
    },
    lng: relativeDirectory,
    fileAbsolutePath: absolutePath,
  }

  createNode(cmsNode)

  createParentChildLink({ parent: node, child: cmsNode })

  activity.end()

}

module.exports = onCreateNode
