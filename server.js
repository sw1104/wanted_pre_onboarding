const http = require("http");
require("dotenv").config();

const { createApp } = require("./app");
const { AppDataSource } = require("./src/models/dataSource");

const startServer = async () => {
    const app = createApp();
    const server = http.createServer(app);
    const PORT = process.env.PORT

    AppDataSource
        .initialize()
        .then(() => {
            console.log("Data Source has been initialized!");
        })
        .catch((err) => {
            console.error("Error occurred during Data Source initialization", err);
            AppDataSource.destroy();
        });

    app.get("/ping", (req, res) => {
        res.status(200).json({ message: "pong" });
    })

    server.listen(PORT, () => {
        console.log(`🚀 Listening on Port ${PORT} 🚀`);
    });
}
startServer();