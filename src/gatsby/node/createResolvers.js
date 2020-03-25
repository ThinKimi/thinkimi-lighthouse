const createResolvers =
  ({
     actions: { createNode },
     cache,
     createNodeId,
     createResolvers,
     store,
     reporter,
   }) => {
    const resolvers = {
      // Query: {
      //   allProducts: {
      //     type: ["ProductJson"],
      //     resolve(source, args, context, info) {
      //       return context.nodeModel.getAllNodes({ type: "ProductJson" })
      //     },
      //   },
      // },
      SubProduct: {
        formattedPrice: {
          type: `String`,
          resolve: ({ retailPrice }, args, context, info) => {
            return new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(retailPrice / 100)
          },
        },
      },
      // Product: {
      //   subProducts: {
      //     type: `[SubProduct]`,
      //     resolve(source, args, context, info) {
      //       const ids = source[info.fieldName]
      //       if (ids == null) return null
      //
      //       const subProducts = context.nodeModel.getAllNodes({
      //         type: `SubProduct`,
      //       })
      //       return subProducts.filter(subProduct => ids.includes(subProduct.id))
      //     },
      //   },
      // },
    }

    createResolvers(resolvers)

  }

module.exports = createResolvers
