import React from "react"
import { graphql } from "gatsby"

import ProductGrid from "../components/ProductGrid"
import SEO from "../components/SEO"

function ProductsPage(
  {
    data: {
      cms: {
        products,
      },
    },
  }) {
  return (
    <React.Fragment>
      <SEO pageTitle="Products"/>
      <h1 className="font-bold text-3xl md:text-6xl mb-3 text-primary">
        Latest
      </h1>

      <hr className="border-b border-gainsboro w-10"/>

      <ProductGrid products={products}/>
    </React.Fragment>
  )
}

const pageQuery = graphql`
query ProductsQuery {
  allProduct {
    edges {
      node {
        id
        name
        subProducts {
          id
          formattedPrice
          name
          retailPrice
          subProductImage {
            childImageSharp {
              fluid(maxWidth: 450) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
}
`

export default ProductsPage
