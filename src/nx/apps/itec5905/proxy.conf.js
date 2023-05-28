const defaultRouteOptions = {
  secure: false,
  changeOrigin: true,
  logLevel: 'debug',
  onProxyRes: (proxyRes) =>
    (proxyRes.headers['Cache-Control'] = 'max-age=300, public'),
};
const server = 'http://localhost:8080';
const PROXY_CONFIG = {
  '/auth': {
    ...defaultRouteOptions,
    target: `${server}/auth`,
    pathRewrite: {
      '^/auth': '',
    },
  },
  '/artists-odata': {
    ...defaultRouteOptions,
    target: `${server}/artists-odata`,
    pathRewrite: {
      '^/artists-odata': '',
    },
  },
  '/artists-webapi': {
    ...defaultRouteOptions,
    target: `${server}/artists-webapi`,
    pathRewrite: {
      '^/artists-webapi': '',
    },
  },
  '/customers-odata': {
    ...defaultRouteOptions,
    target: `${server}/customers-odata`,
    pathRewrite: {
      '^/customers-odata': '',
    },
  },
  '/customers-webapi': {
    ...defaultRouteOptions,
    target: `${server}/customers-webapi`,
    pathRewrite: {
      '^/customers-webapi': '',
    },
  },
};

module.exports = PROXY_CONFIG;
