const express = require("express");
const requestIp = require('request-ip');// used to get real ipv4 ip
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
  let clientIp = requestIp.getClientIp(req);
  if(clientIp === "127.0.0.1"){
    // for local testing, will change clientIp to a Winnipeg IP
    clientIp = "50.70.197.94";
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
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://www.listlist.ca",
      "https://listlist.ca"
    ],
    methods: "POST",
    optionsSuccessStatus: 200
  })
);

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
