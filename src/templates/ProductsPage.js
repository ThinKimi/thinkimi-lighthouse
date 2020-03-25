import React from "react"
import { graphql } from "gatsby"

import ProductGrid from "../components/ProductGrid"
import SEO from "../components/SEO"

function ProductsPage(
  {
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
  }) {
  return (
    <React.Fragment>
      <SEO pageTitle="Products"/>
      <h1 className="font-bold text-3xl md:text-6xl mb-3 text-primary">
        Latest
      </h1>

      <hr className="border-b border-gainsboro w-10"/>

      <ProductGrid products={allProducts}/>
    </React.Fragment>
  )
}

export const pageQuery = graphql`
query ProductsQuery ($locale: String!) {
  allCms(filter: {lng: {eq: $locale}}) {
    nodes {
      products {
        id
        name
        subProducts {
          id
          formattedPrice
          name
          retailPrice
          imageFile {
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
