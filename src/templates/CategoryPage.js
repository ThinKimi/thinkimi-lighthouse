import React from "react"
import { graphql } from "gatsby"

import ProductGrid from "../components/ProductGrid"
import SEO from "../components/SEO"

function CategoryPage(
  {
    data: {
      allProduct: {
        nodes: products,
      },
      allCategory: {
        nodes: [category],
      },
    },
  }) {
  return (
    <React.Fragment>
      <SEO pageTitle={category.name}/>
      <h1 className="font-bold text-3xl md:text-7xl mb-3 text-primary">
        {category.name}
      </h1>
      <hr className="border-b border-gainsboro w-10"/>

      <ProductGrid products={products}/>
    </React.Fragment>
  )
}

export const pageQuery = graphql`
query CategoryQuery($slug: String!, $locale: String!) {
  allCategory(filter: {lng: {eq: $locale}, slug: {eq: $slug}}) {
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

export default CategoryPage
