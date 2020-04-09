const bodyParser = require("body-parser");
const config = require("./utils/config");
const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

const middleware = require("./utils/middleware");

const loginRouter = require("./controllers/login");
const usersRouter = require("./controllers/users");
const boardsRouter = require("./controllers/boards");
const listsRouter = require("./controllers/lists");
const cardsRouter = require("./controllers/cards");

app.use(cors());
app.use(express.static("build"));
app.use(bodyParser.json());

const databaseConnection = async () => {
  try {
    logger.info("connecting to", config.MONGODB_URI);
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    logger.info("connected to MongoDB");
  } catch (e) {
    logger.info("error connection to MongoDB:", e.message);
  }
};
databaseConnection();

app.use(middleware.errorHandler);
app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/boards", boardsRouter);
app.use("/api/lists", listsRouter);
app.use("/api/cards", cardsRouter);

// Enable SPA to render when subdomain refreshed. Otherwise "CANNOT GET /*" error message
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

module.exports = app;
