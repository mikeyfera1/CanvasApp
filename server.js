const express = require("express");
const app = express();
const port = 2100;

app.use("/html", express.static("html"));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("/public/index.html")
});

app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
})