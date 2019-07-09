module.exports = function twigRenderer(file) {
  const twig = require('twig').twig;

  const page = twig({
    path: file,
    async: false,
  });

  return {
    render(data) {
      return page.render({
        it: data,
      });
    },
  };
};
