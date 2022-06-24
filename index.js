const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

// config.env
dotenv.config();

const connectdb = require("./connection");

// load PORT from .env file 
const port = process.env.PORT || 3000;

// config cors 
app.use(cors({ optionsSuccessStatus: 200 }));

// body-parser config 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// config static assets 
app.use("/public", express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
});



app.use("/api/users", require("./routes/routes"))


app.listen(port, () => {
    console.log(`app listening on port : ${port}`);
});




