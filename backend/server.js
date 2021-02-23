const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "client/build")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//HTML
app.get("/", function (req, res) {
  return res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(3001, () => console.log('Backend live on port 3001'));