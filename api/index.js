const express = require("express");
const requestIp = require('request-ip');// used to get real ipv4 ip
const ipaddr = require('ipaddr.js');// used to convert to ipv6 to ipv4
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const compression = require("compression");
const http = require("http");
const schema = require("./schema");
const app = express();

// config upload size
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({
  extended: true,
  limit: '50mb',
}));

// logging middleware
const loggingMiddleware = (req, res, next) => {
  /*let reqIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  if (reqIP.substr(0, 7) === "::ffff:") {
    reqIP = reqIP.substr(7);
  }

  if (reqIP === "::1" || reqIP === "127.0.0.1" || reqIP.substr(0, 7) === "192.168") {
    reqIP = "50.70.197.94";// for local test, assgign reqIP to a public example ip (Winnipeg)
  }*/
  console.log(req);
  const clientIp = requestIp.getClientIp(req);

  console.log(`Real IP is: ${clientIp}`);

  // ipv6?
  if(clientIp.length > 15){
    
  }

  global.requestIP = clientIp;

  next();
};

app.use(loggingMiddleware);

// token middleware
const tokenMiddleware = (req, res, next) => {
  global.token = req.headers['authorization'] ?? null;
  next();
};

app.use(tokenMiddleware);

// gzip compression
app.use(compression());

// Set Cors
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.0.102:3000", "https://www.listlist.ca"],
    methods: "POST",
    optionsSuccessStatus: 200
  })
);

/*
app.all('*', function(req, res, next) {
  //res.setHeader('Access-Control-Allow-Origin','*');
  //res.setHeader('Access-Control-Allow-Methods', '*'); 
  res.setHeader('Access-Control-Allow-Headers', '*'); 
  next();
});*/


app.use(
  "/",
  graphqlHTTP({
    graphiql: true,
    schema: schema
  })
);

// Handle 404 and 500
app.use(function (req, res) {
  res.type("text/plain");
  res.status(404);
  res.json({
    code: 1,
    message: "Error 404"
  });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type("text/plain");
  res.status(500);
  res.json({
    code: 500,
    message: "Error 500, " + err
  });
});

const httpServer = http.createServer(app);

httpServer.listen(4000, "0.0.0.0", () =>
  console.log(`Listening on port 4000!`)
);
