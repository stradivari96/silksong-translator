module.exports = {
  pathPrefix: "/silksong-translator",
  siteMetadata: {
    title: "Silksong translator",
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    }
  ],
};
