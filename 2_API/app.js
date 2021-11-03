const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");
const categoryRoutes = require("./routes/category");

const app = express();

// Système de sécurité CORS : Cross Origin Resource Sharing
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/category", categoryRoutes);

module.exports = app;