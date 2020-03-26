import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import { useCart } from "react-use-cart"
import queryString from "query-string"
import { navigate } from "@reach/router"

import SEO from "../components/SEO"

function ProductPage
({
   data: { productById: product },
   location,
 }) {
  const { subProductId } = queryString.parse(location.search)
  const subProducts = product.subProducts
  const [firstSubProduct] = subProducts
  const [variantQuantity, setVariantQuantity] = useState(1)
  const [activeSubProductId, setActiveSubProductId] = useState(
    subProductId || firstSubProduct.id,
  )
  const { addItem } = useCart()

  const activeSubProduct = subProducts.find(
    subProduct => subProduct.id === activeSubProductId,
  )

  useEffect(() => {
    navigate(`?subProductId=${activeSubProductId}`, { replace: true })
  }, [activeSubProductId])

  const sp = activeSubProduct ? activeSubProduct : firstSubProduct
  return (
    <React.Fragment>
      <SEO
        pageTitle={product.name}
        image={
          sp.imageFile.childImageSharp.fluid.src
        }
      />

      <div className="lg:flex -mx-6">
        <div className="mb-8 px-6 md:mb-0 lg:w-1/2">
          <div className="w-full overflow-hidden relative bg-gainsboro rounded-lg">
            <Img
              fluid={sp.imageFile.childImageSharp.fluid}
              alt={product.name}
              title={product.name}
            />
          </div>
        </div>

        <div className="px-6 md:py-3 lg:w-1/2">
          <h1 className="font-bold text-3xl md:text-7xl mb-3 text-primary leading-tight">
            {product.name}
          </h1>

          <div className="mb-6">
            <p className="font-semibold text-2xl text-slategray">
              {activeSubProduct && activeSubProduct.formattedPrice}
            </p>
          </div>

          {product.description && (
            <div className="mb-6">
              <p className="leading-loose text-lightgray">
                {product.description}
              </p>
            </div>
          )}
          <div className="md:flex md:flex-wrap -mx-3">
            <div className="md:w-3/4 px-3 mb-6">
              <label
                className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
                htmlFor="style"
              >
                Style
              </label>

              <div className="relative">
                <select
                  id="style"
                  value={activeSubProductId}
                  onChange={({ target: { value } }) =>
                    setActiveSubProductId(value)
                  }
                  className="block appearance-none w-full bg-gainsboro border-2 border-gainsboro focus:border-slategray px-4 py-3 pr-8 focus:outline-none focus:bg-white text-slategray focus:text-slategray rounded-lg"
                >
                  {subProducts.map((subProduct, index) => (
                    <option key={index} value={subProduct.id}>
                      {subProduct.name}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slategray">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="md:w-1/4 px-3 mb-6">
              <label
                className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
                htmlFor="quantity"
              >
                Quantity
              </label>

              <div className="relative">
                <select
                  id="quantity"
                  value={variantQuantity}
                  className="block appearance-none w-full bg-gainsboro border-2 border-gainsboro focus:border-slategray px-4 py-3 pr-8 focus:outline-none focus:bg-white text-slategray focus:text-slategray rounded-lg"
                  onChange={({ target: { value } }) =>
                    setVariantQuantity(parseInt(value))
                  }
                >
                  {new Array(5)
                    .fill(0)
                    .map((v, k) => k + 1)
                    .map(i => ({ value: i, label: i }))
                    .map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slategray">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <button
              className="block w-full bg-primary hover:bg-slategray px-4 py-3 rounded-lg text-white text-sm font-bold tracking-widest uppercase focus:outline-none"
              onClick={() =>
                addItem(
                  {
                    id: activeSubProduct.id,
                    price: activeSubProduct.retailPrice,
                    image: activeSubProduct.fileImage,
                    name: activeSubProduct.name,
                    description: product.description,
                  },
                  variantQuantity,
                )
              }
              disabled={!activeSubProduct}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export const pageQuery = graphql`
query ProductQuery ($id: String!, $locale: String!) {
  productById(id: $id, locale: $locale) {
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
`

export default ProductPage
