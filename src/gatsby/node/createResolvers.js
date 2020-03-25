const createResolvers =
  ({
     createResolvers,
   }) => {
    const resolvers = {
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
        imageFile: {
          type: `File`,
          resolve: (source, args, context, info) => {
            return context.nodeModel.runQuery({
              query: {
                filter: {
                  relativePath: {
                    eq: source.image,
                  },
                },
              },
              type: "File",
              firstOnly: true,
            })
          },
        },
      },
    }

    createResolvers(resolvers)

  }

module.exports = createResolvers
