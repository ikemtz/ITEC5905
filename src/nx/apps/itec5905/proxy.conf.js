const defaultRouteOptions = {
  secure: false,
  changeOrigin: true,
  logLevel: 'debug',
  onProxyRes: (proxyRes) =>
    (proxyRes.headers['Cache-Control'] = 'max-age=300, public'),
};
const server = 'http://localhost:8080';
const PROXY_CONFIG = {
    '/auth':{
        ...defaultRouteOptions,
        target: `${server}/auth`,
        pathRewrite: {
            '^/auth':'',
        }
    },
    '/artists-od':{
        ...defaultRouteOptions,
        target: `${server}/artists-od`,
        pathRewrite: {
            '^/artists-od':'',
        }
    },
    '/artists-wa':{
        ...defaultRouteOptions,
        target: `${server}/artists-wa`,
        pathRewrite: {
            '^/artists-wa':'',
        }
    },
    '/customers-od':{
        ...defaultRouteOptions,
        target: `${server}/customers-od`,
        pathRewrite: {
            '^/customers-od':'',
        }
    },
    '/customers-wa':{
        ...defaultRouteOptions,
        target: `${server}/customers-wa`,
        pathRewrite: {
            '^/customers-wa':'',
        }
    },
};

module.exports = PROXY_CONFIG;