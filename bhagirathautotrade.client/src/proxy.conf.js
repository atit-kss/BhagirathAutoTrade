const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7224';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/Equity"
      //"/api/Equity/GetOpenData",
      //"/api/Equity/AutoCompleteCompanyForEquity",
      //"/api/Equity/getCalculateDataForEQ",
    ],
    target: target,
    changeOrigin: true,
    secure: false
  }
]

module.exports = PROXY_CONFIG;
