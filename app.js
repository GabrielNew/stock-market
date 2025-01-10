const apiCall = require("./utils/stockApiCall.js");

const { API_URL, API_KEY } = process.env;

apiCall(API_URL, API_KEY, "AAPL");
