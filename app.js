const fs = require("fs");
const request = require("postman-request");

const url = `${process.env.API_URL}eod?access_key=${process.env.API_KEY}&symbols=MSFT`;

request({ url: url, json: true }, (error, response) => {
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

  //fs.writeFileSync("example.json", JSON.stringify(response.body));
});

//const data = JSON.parse(fs.readFileSync("example.json"));
