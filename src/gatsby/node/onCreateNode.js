const _ = require(`lodash`)

const onCreateNode = async ({ node, actions, loadNodeContent, createContentDigest, reporter }) => {
  const { createNode, createParentChildLink } = actions

  const {
    absolutePath,
    internal: { type },
    sourceInstanceName,
    relativeDirectory,
    name,
    id,
  } = node

  function transformObj(obj, id, parentNode, type, lng) {
    const baseNode = {
      id,
      children: [],
      parent: parentNode.id,
      internal: {
        contentDigest: createContentDigest(obj),
        type,
      },
      lng,
    }
    const objNode = Object.assign({}, obj, baseNode)
    createNode(objNode)
    createParentChildLink({ parent: parentNode, child: objNode })
  }


  if (type !== "File" || sourceInstanceName !== `locale` || name !== `product`) return

  const activity = reporter.activityTimer(
    `@kimichen13: create node: ${relativeDirectory}_cms`,
  )
  activity.start()

  const content = await loadNodeContent(node)
  const products = JSON.parse(content)

  transformObj({ "products": products }, `${id} >>> Cms`, node, `Cms`, relativeDirectory)

  // products.forEach(product =>{
  //
  // })

  activity.end()

}

module.exports = onCreateNode
