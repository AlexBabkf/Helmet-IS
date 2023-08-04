const express = require("express");
const app = express();

const helmet = require("helmet");

// Remove powered by express header
app.use(helmet.hidePoweredBy());

// Restrict frame options. Prevent clickjacking techniques
app.use(helmet.frameguard({ action: "deny" }));

// Sanitize (encode) input sent to server. Lower risk of XSS attacks
app.use(helmet.xssFilter());

// Stop MIME sniffing. Don't bypass povided Content-Type
app.use(helmet.noSniff());

// Prevent IE users from executing downloads in the trusted site's context
app.use(helmet.ieNoOpen());

module.exports = app;
const api = require("./server.js");
app.use(express.static("public"));
app.disable("strict-transport-security");
app.use("/_api", api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
