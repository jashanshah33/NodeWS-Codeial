const express = require("express");
const port = 5000;

const app = express();

app.listen(port, function (err) {
  if (err) {
    console.log("Error", err);
    return;
  }
  console.log("Running Sucessfully on port", port);
});
