const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.receitaws.com.br',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};