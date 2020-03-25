require(`dotenv`).config()

module.exports = {
  siteMetadata: {
    title: `Lighthouse`,
    description: `All your needs on lighthouse.`,
    siteUrl: `https://lighthouse.com`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    {
      resolve: "gatsby-plugin-purgecss",
      options: {
        tailwind: true,
        purgeOnly: ["src/styles/main.css"],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg/,
        },
      },
    },
    `gatsby-plugin-sharp`,
    // {
    //   resolve: "gatsby-plugin-i18n",
    //   options: {
    //     langKeyDefault: "zh",
    //     useLangKeyLayout: false,
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locale`,
        name: `locale`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/src/products`,
    //     name: `products`,
    //   },
    // },
    // {
    //   resolve: `gatsby-source-graphql`,
    //   options: {
    //     typeName: `GraphCMS`,
    //     fieldName: `cms`,
    //     url: process.env.GRAPHCMS_ENDPOINT,
    //     headers: {
    //       Authorization: `Bearer ${process.env.GRAPHCMS_QUERY_TOKEN}`,
    //     },
    //   },
    // },
    {
      resolve: `gatsby-plugin-i18next`,
      options: {
        availableLngs: ["zh", "en"],
        fallbackLng: "zh",
        saveMissing: true,
        debug: true,
        defaultNS: "lighthouse",
        ns: ["lighthouse"],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
  ],
}
