/*
    CIT 281 Project 3
    Name: Melinda Chan
*/

const fs = require("fs");
const fastify = require("fastify")();
const { coinCount } = require("./p3-module.js");

fastify.get("/", (request, reply) => {
  fs.readFile(`${__dirname}/index.html`, (err, data) => {
      if (err) {
          console.log(err);
          reply
              .code(500)
              .header("Content-Type", "text/html; charset=utf-8")
              .send("<h1>Server error<h1>"); //.send server err
      } else {
          reply
              .code(200)
              .header("Content-Type", "text/html; charset=utf-8")
              .send(data); //.send (data) 
      }
  });
});

fastify.get("/coin", (request, reply) => {
  const { denom = 0, count = 0} = request.query;
  const coinValue = coinCount({ // sets up coinCount to include object with properties extracted from request.query
    denom: parseInt(denom), // converts denom and count from strings to integers
    count: parseInt(count),
  });
  // console.log(denom);
  // console.log(count);
  reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);
});

fastify.get("/coins", (request, reply) => {
  reply
        .code(200)
        .header("Content-Type", "text/html; charset=utf-8");  
  const { option } = request.query; // creates constant variable option with value from query parameter with request.query
  const coins = [{denom: 25, count:2}, {denom: 1, count: 7}]
  switch (option) {
    case "1": 
      coinValue = coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });
      reply.send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
      break;
    case "2":
      coinValue = coinCount(...coins);
      reply.send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
      break;
    default:
      coinValue = 0 
      reply.send(`<h2>Option invalid value is ${coinValue}</h2><br /><a href="/">Home</a>`);
  }
});

// Starts server and listens to requests
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
});
