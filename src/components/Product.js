import React from "react"

import LocaleLink from "./LocaleLink"
import Img from "gatsby-image"


function Product({ id, name, subProducts }) {

  const [{ formattedPrice, imageFile }] = subProducts

  const realId = id.split(">>>")[0].trim()

  return (
    <article key={realId} className="p-6 w-full md:w-1/2 lg:w-1/3">
      <LocaleLink
        to={`/products/${realId}`}
        className="group no-underline w-full h-full flex"
      >
        <div className="bg-gainsboro rounded-lg cursor-pointer w-full overflow-hidden relative px-3 py-6 md:px-6">
          <Img fluid={imageFile.childImageSharp.fluid}
               alt={name} title={name}/>
          <div className="pt-3 md:pt-6 text-center">
            <p className="text-slategray font-bold text-lg group-hover:text-primary mb-1">
              {name}
            </p>
            <p className="text-lightgray text-sm">{formattedPrice}</p>
          </div>
        </div>
      </LocaleLink>
    </article>
  )
}

export default Product
