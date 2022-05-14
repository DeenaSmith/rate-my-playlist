const embedSpotify = require("eleventy-plugin-embed-spotify");
const pluginDefaults = require("./lib/pluginDefaults");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(embedSpotify);
  return {
    htlmTemplateEngine: "hbs"
  }
};