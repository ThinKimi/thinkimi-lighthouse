const { buildLocalePath } = require("../../utils/gatsby-node-helpers")
const locales = require("../../locales")

const createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: {
      allCms: {
        nodes: [
          { products: allProducts },
        ],
      },
      allCollection: {
        nodes: allCollections,
      },
      allCategory: {
        nodes: allCategories,
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
  allCollection {
    nodes {
      slug
    }
  }
  allCategory {
    nodes {
      slug
    }
  }
}
  `)

  const ids = [...new Set(allProducts.map(p => p.id))]
  const collectionSlugs = [...new Set(allCollections.map(p => p.slug))]
  const categorySlugs = [...new Set(allCategories.map(p => p.slug))]

  locales.map(locale => {
    createPage({
      path: buildLocalePath({ locale, path: `/` }),
      component: require.resolve(`../../templates/ProductsPage.js`),
      context: {
        locale: locale.path,
      },
    })

    if (ids) {
      ids.forEach(id => {
        createPage({
          path: buildLocalePath({ locale, path: `/products/${id}` }),
          component: require.resolve(`../../templates/ProductPage.js`),
          context: { id, locale: locale.path },
        })
      })
    }


    if (categorySlugs) {
      categorySlugs.forEach(slug =>
        createPage({
          path: buildLocalePath({ locale, path: `/categories/${slug}` }),
          component: require.resolve(`../../templates/CategoryPage.js`),
          context: { slug, locale: locale.path },
        }),
      )
    }

    if (collectionSlugs) {
      collectionSlugs.forEach(slug =>
        createPage({
          path: buildLocalePath({ locale, path: `/collections/${slug}` }),
          component: require.resolve(`../../templates/CollectionPage.js`),
          context: { slug, locale: locale.path },
        }),
      )
    }

  })
}

module.exports = createPages
