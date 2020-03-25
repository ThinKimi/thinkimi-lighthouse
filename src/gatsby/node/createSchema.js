const fs = require(`fs`);

const createSchema = ({ actions, schema }) => {
  const { createTypes } = actions;

  // Type definitions can be provided in SDL
  // const typeDefs = `
  //   type SubProduct {
  //     id: ID!
  //     name: String!
  //     subProductImage: File!
  //     retailPrice: Int!
  //   }
  //   type Product implements Node {
  //     id: ID!
  //     name: String!
  //     description: String
  //     productImage: File
  //     subProducts: [SubProduct]
  //   }
  // `
  // createTypes(typeDefs)

  // Alternatively, you can use type builders to construct types
  // createTypes([
  //   schema.buildObjectType({
  //     name: `CmsJson`,
  //     fields: {
  //       products: {
  //         type: `[ProductJson]`,
  //         resolve(parent, args, context) {
  //           return context.nodeModel.getNodeById({
  //             id: parent.product,
  //             type: `ProductJson`,
  //           })
  //         },
  //       },
  //     },
  //     interfaces: [`Node`],
  //   }),
  // ])

  // It is of course also possible to read type definitions from a .gql file,
  // which will give you proper syntax highlighting
  const additionalTypeDefs = fs.readFileSync(`type-defs.gql`, {
    encoding: `utf-8`,
  })
  createTypes(additionalTypeDefs);
}

module.exports = createSchema
