let apiUrl;
const expressPort = 4000;
const apiUrls = {
  development: `http://localhost:${expressPort}`,
  production: `https://thesocialsphere-1915b851fff9.herokuapp.com`
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

module.exports = { apiUrl }