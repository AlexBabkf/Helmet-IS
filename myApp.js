const express = require("express");
const app = express();

const helmet = require("helmet");

// Remove powered by express header
app.use(helmet.hidePoweredBy());

// Restrict frame options. Prevent clickjacking techniques
app.use(helmet.frameguard({ action: "deny" }));

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
