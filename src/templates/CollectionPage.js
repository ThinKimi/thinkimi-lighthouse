import React from "react"
import { graphql } from "gatsby"

import ProductGrid from "../components/ProductGrid"
import SEO from "../components/SEO"

function CollectionPage(
  {
    data: {
      allProduct: {
        nodes: products,
      },
      allCollection: {
        nodes: [collection],
      },
    },
  }) {
  return (
    <React.Fragment>
      <SEO pageTitle={collection.name}/>
      <h1 className="font-bold text-3xl md:text-7xl mb-3 text-primary">
        {collection.name}
      </h1>
      <hr className="border-b border-gainsboro w-10"/>

      <ProductGrid products={products}/>
    </React.Fragment>
  )
}

export const pageQuery = graphql`
query CollectionQuery($slug: String!, $locale: String!) {
  allCollection(filter: {lng: {eq: $locale}, slug: {eq: $slug}}) {
    nodes {
      id
      name
      slug
    }
  }
  allProduct(filter: {lng: {eq: $locale}, slug: {eq: $slug}}) {
    nodes {
        id
        name
        slug
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
`

export default CollectionPage
