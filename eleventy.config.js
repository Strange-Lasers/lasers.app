export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ public: '.' });
  eleventyConfig.setNunjucksEnvironmentOptions({
    autoescape: true,
    throwOnUndefined: true,
  });

  return {
    dir: { input: 'src', output: '_site' },
    templateFormats: ['njk', 'md'],
    markdownTemplateEngine: 'njk',
  };
}
