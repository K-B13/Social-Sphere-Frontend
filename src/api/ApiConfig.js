let apiUrl;
let miniApiUrl;
const expressPort = 4000;
const apiUrls = {
  development: `http://localhost:${expressPort}`,
  production: `https://thesocialsphere-1915b851fff9.herokuapp.com`
}

const miniApiUrls = {
  development: `localhost:${expressPort}`,
  production: `thesocialsphere-1915b851fff9.herokuapp.com`
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development;
  miniApiUrl = miniApiUrls.development;
} else {
  apiUrl = apiUrls.production;
  miniApiUrl = miniApiUrls.development;
}

module.exports = { apiUrl, miniApiUrl }