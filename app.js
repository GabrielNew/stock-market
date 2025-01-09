const apiCall = require("./utils/stockApiCall.js");

const url = process.env.API_URL;
const key = process.env.API_KEY;

apiCall(url, key, "NVDA");
