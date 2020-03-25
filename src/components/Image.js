import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const Image = ({ name  ,subProductImage}) => {
  const data = useStaticQuery(graphql`
     query ImageQuery {
       allImageSharp {
         nodes {
           fluid(maxWidth: 450) {
             originalName
             ...GatsbyImageSharpFluid
           }
         }
       }
     }
  `)

  let selectImage = data.allImageSharp.nodes.find(node => node.fluid.originalName === subProductImage)
  return <Img fluid={selectImage.fluid}
              alt={name} title={name}/>
}

export default Image;
