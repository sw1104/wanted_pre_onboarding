const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("express-async-errors");

const routes = require("./src/routes");
const errorHandler = require("./src/middlewares/errorHandler");
const { swaggerUi, specs } = require("./swagger")

const createApp = () => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(morgan("dev"));
    app.use(routes);
    app.use(errorHandler);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

    return app;
}

module.exports = { createApp }