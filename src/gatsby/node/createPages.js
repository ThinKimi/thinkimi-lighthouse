const { buildLocalePath } = require("../../utils/gatsby-node-helpers")
const locales = require("../../locales")

const createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
query Query {
  allCms {
    edges {
      node {
        products {
          id
        }
        lng
      }
    }
  }
}
  `)

  // const edges = result.data["allCms"].edges
  //
  // edges.forEach(({ node: cms }) => {
  //   const locale = locales[cms.lng]
  //   createPage({
  //     path: buildLocalePath({ locale, path: `/` }),
  //     component: require.resolve(`../../templates/ProductsPage.js`),
  //     context: {
  //       locale: locale.path,
  //     },
  //   })
  // })

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
  // if (products) {
  //   products.forEach(({ id }) => {
  //     createPage({
  //       path: buildLocalePath({ locale, path: `/products/${id}` }),
  //       component: require.resolve(`../../templates/ProductPage.js`),
  //       context: { id, locale: locale.path },
  //     });
  //   });
  // }
  })
}

module.exports = createPages
