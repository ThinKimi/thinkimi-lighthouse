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

  function transformArray(obj, id, parentNode, type, lng) {
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
    return objNode
  }

  function transformObj(obj, id, parentNode, type, lng) {
    const objNode = {
      ...obj,
      id,
      children: [],
      parent: parentNode.id,
      internal: {
        contentDigest: createContentDigest(obj),
        type,
      },
      lng,
    }
    createNode(objNode)
    createParentChildLink({ parent: parentNode, child: objNode })
    return objNode
  }


  if (type === "File" && sourceInstanceName === `locale` && name === `product`) {

    const activity = reporter.activityTimer(
      `@kimichen13: create node: ${relativeDirectory}_cms`,
    )
    activity.start()

    const content = await loadNodeContent(node)
    const products = JSON.parse(content)

    transformArray({ "products": products }, `${id} >>> ${relativeDirectory} >>> Cms`,
      node, `Cms`, relativeDirectory)

    products.forEach(product => {
      transformObj(product, `${product.id} >>> ${relativeDirectory} >>> Product`,
        node, `Product`, relativeDirectory)

      product.subProducts.forEach(subProject => {
        transformObj(subProject, `${subProject.id} >>> ${relativeDirectory} >>> SubProduct`,
          node, `SubProduct`, relativeDirectory)
      })
    })

    activity.end()
  }

   if (type === "File" && sourceInstanceName === `locale` && name === `category`) {

    const activity = reporter.activityTimer(
      `@kimichen13: create node: ${relativeDirectory}_category`,
    )
    activity.start()

    const content = await loadNodeContent(node)
    const categories = JSON.parse(content)

    transformArray({ "categories": categories }, `${id} >>> ${relativeDirectory} >>> Category`,
      node, `Category`, relativeDirectory)

    activity.end()
  }

   if (type === "File" && sourceInstanceName === `locale` && name === `collection`) {

    const activity = reporter.activityTimer(
      `@kimichen13: create node: ${relativeDirectory}_collection`,
    )
    activity.start()

    const content = await loadNodeContent(node)
    const collections = JSON.parse(content)

    transformArray({ "collections": collections }, `${id} >>> ${relativeDirectory} >>> Collection`,
      node, `Collection`, relativeDirectory)

    activity.end()
  }



}

module.exports = onCreateNode
