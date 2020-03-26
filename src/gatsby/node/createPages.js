const { buildLocalePath } = require("../../utils/gatsby-node-helpers")
const locales = require("../../locales")

const createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: {
      allCms: {
        nodes: [
          {
            products:
              allProducts,
          },
        ],
      },
    },
  } = await graphql(`
query Query {
  allCms {
    nodes {
      products {
        id
      }
    }
  }
}
  `)

  const ids = [...new Set(allProducts.map(p => p.id))]

  locales.map(locale => {
    createPage({
      path: buildLocalePath({ locale, path: `/` }),
      component: require.resolve(`../../templates/ProductsPage.js`),
      context: {
        locale: locale.path,
      },
    })

    // if (categories) {
    //   categories.forEach(({ slug }) =>
    //     createPage({
    //       path: buildLocalePath({ locale, path: `/categories/${slug}` }),
    //       component: require.resolve(`../../templates/CategoryPage.js`),
    //       context: { slug, locale: locale.path },
    //     })
    //   );
    // }
    //
    // if (collections) {
    //   collections.forEach(({ slug }) =>
    //     createPage({
    //       path: buildLocalePath({ locale, path: `/collections/${slug}` }),
    //       component: require.resolve(`../../templates/CollectionPage.js`),
    //       context: { slug, locale: locale.path },
    //     })
    //   );
    // }
    //
    if (ids) {
      ids.forEach(id => {
        createPage({
          path: buildLocalePath({ locale, path: `/products/${id}` }),
          component: require.resolve(`../../templates/ProductPage.js`),
          context: { id, locale: locale.path },
        })
      })
    }
  })
}

module.exports = createPages
