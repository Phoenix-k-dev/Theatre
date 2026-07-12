module.exports = function (eleventyConfig) {
  // Copie telle quelle des fichiers statiques (CSS, images, admin Decap CMS)
  // On précise explicitement la destination pour éviter toute ambiguïté :
  // src/assets/* → _site/assets/*
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ admin: "admin" });

  // Transforme les retours à la ligne d'un champ texte en balises <br>
  eleventyConfig.addFilter("nl2br", function (value) {
    if (!value) return "";
    return String(value).replace(/\r\n|\r|\n/g, "<br>\n");
  });

  // Transforme un lien YouTube classique (youtu.be/... ou watch?v=...) en lien "embed"
  eleventyConfig.addFilter("youtubeEmbed", function (url) {
    if (!url) return "";
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    const longMatch = url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    const id = (shortMatch && shortMatch[1]) || (longMatch && longMatch[1]);
    if (!id) return url; // si le lien est déjà un lien "embed", on le laisse tel quel
    return `https://www.youtube.com/embed/${id}`;
  });

  // Collection des spectacles, triée selon le champ "order" du front matter
  eleventyConfig.addCollection("spectacles", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/spectacles/*.md").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    });
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
