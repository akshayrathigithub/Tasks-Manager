const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

// our localhost port
const port = 4002;

const app = express();

// our server instance
const server = http.createServer(app);

// Define CSP middleware function
const setCSPHeader = (req, res, next) => {
    // Set Content-Security-Policy header
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self' backend.akshayrathi.com fonts.gstatic.com; style-src 'self' fonts.googleapis.com 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval';"
    );
    // Call next middleware function
    next();
};

// Use CSP middleware for all routes
app.use(setCSPHeader);

// Define CORS options
const corsOptions = {
    origin: ['https://akshayrathi.com', 'https://project.akshayrathi.com']
};

// Apply CORS middleware with the defined options
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.start = app.listen = function () {
    return server.listen.apply(server, arguments);
};
const router = express.Router();
const publicPath = path.join(__dirname, "/build");

app.use("/task-manager", express.static(publicPath));
app.use(router);

router.get("/task-manager", (req, res) => {
    res.sendFile(path.join(__dirname + "/build/index.html"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));