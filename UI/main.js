const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);

