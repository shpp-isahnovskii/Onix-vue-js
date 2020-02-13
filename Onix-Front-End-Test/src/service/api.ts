
const axios = require('axios');

const axiosConfig = axios.create({
  //url: '/api',
  //method: 'get',
  baseURL: 'https://nameless-leaf-8405.getsandbox.com:443/api',

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default

  // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // This will set an `Authorization` header, overwriting any existing
  // `Authorization` custom headers you have set using `headers`.
  // Please note that only HTTP Basic auth is configurable through this parameter.
  // For Bearer tokens and such, use `Authorization` custom headers instead.
  // auth: {
  //   username: 'janedoe',
  //   password: 's00pers3cret'
  // },

  // Note: Ignored for `responseType` of 'stream' or client-side requests
  //responseEncoding: 'utf8', // default

  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  // validateStatus: function (status: number) {
  //  return status >= 200 && status < 300; // default
  // },
});

export default axiosConfig;