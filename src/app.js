const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");
const hbs = require("hbs");

const static_path = path.join(__dirname, "../public");
const tempPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", tempPath)
hbs.registerPartials(partialPath);
app.use(express.static(static_path))

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/weather", (req, res) => {
    res.render("weather");
}); 

app.get("*", (req, res) => {
    res.render("error", {
        errorMsg: "Oops! Page not found"
    });
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});