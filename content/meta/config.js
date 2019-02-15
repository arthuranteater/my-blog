const colors = require("../../src/styles/colors");

module.exports = {
  siteTitle: "arthuranter - coding blog", // <title>
  shortSiteTitle: "arthuranter - cr", // <title> ending for posts and pages
  siteDescription: "Place to share best practices for coding and new technologies!",
  siteUrl: "https://arthuranteater.com",
  pathPrefix: "",
  siteImage: "",
  siteLanguage: "en",
  // author
  authorName: "Hunt Applegate",
  authorTwitterAccount: "Hunt Applegate",
  // info
  infoTitle: "arthurantear",
  infoTitleNote: "coding blog",
  // manifest.json
  manifestName: "coding blog",
  manifestShortName: "cr", // max 12 characters
  manifestStartUrl: "/",
  manifestBackgroundColor: colors.background,
  manifestThemeColor: colors.background,
  manifestDisplay: "standalone",
  // contact
  contactEmail: "",
  // social
  authorSocialLinks: [
    { name: "github", url: "https://github.com/arthuranteater" },
    { name: "twitter", url: "https://twitter.com/arthuranteater" },
  ]
};
