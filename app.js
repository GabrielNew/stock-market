const request = require("postman-request");

const url = `${process.env.API_URL}eod?access_key=${process.env.API_KEY}&symbols=MSFT`;

//console.log(url);

request({ url: url }, (error, response) => {
  console.log(response);
});
