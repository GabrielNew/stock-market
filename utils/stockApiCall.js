const fs = require("fs");
const request = require("postman-request");

const apiCall = (envUrl, key, stock) => {
  const url = `${envUrl}eod?access_key=${key}&symbols=${encodeURIComponent(
    stock
  )}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      console.log("REQUEST ERROR!");
    } else if (response.body.error) {
      console.log(response.body.error.message);
    } else {
      let sumValue = 0;
      let perVariation = 0;
      response.body.data.forEach((element) => {
        sumValue += element.close;
      });
      perVariation =
        ((response.body.data[0].close - response.body.data[99].close) /
          response.body.data[99].close) *
        100;

      console.log(
        "Mean value in the last 100 days: " + (sumValue / 100).toFixed(3)
      );

      if (perVariation < 0) {
        console.log(
          "The stock price has decreased by " +
            perVariation.toFixed(2) +
            "% over the last 100 days."
        );
      } else if (perVariation > 0) {
        console.log(
          "The stock price has increased by " +
            perVariation.toFixed(2) +
            "% over the last 100 days."
        );
      } else {
        console.log(
          "The stock price has changed by " +
            perVariation.toFixed(2) +
            "% over the last 100 days."
        );
      }
    }

    fs.writeFileSync(`${stock}.json`, JSON.stringify(response.body));
  });
};

module.exports = apiCall;
