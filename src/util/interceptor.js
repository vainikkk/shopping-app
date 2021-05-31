const axios = require("axios");

axios.defaults.baseURL = "http://localhost:4000";
axios.interceptors.request.use((req) => {
  req.headers["Content-type"] = "application/json";
  return req;
});
