const logger = require("./logger");
const jwt = require("jsonwebtoken");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const getTokenFrom = request => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

const tokenExtractor = (request, response, next) => {
  request.token = getTokenFrom(request);
  next();
};

const tokenValidate = async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: "Login required" });
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "Token missing or invalid" });
  }

  next();
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError" || "ValidatorError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  } else if (error.name === "Error") {
    return response.status(400).json({ error: "invalid request" });
  }

  logger.error(error.message);
  next(error);
};

module.exports = {
  errorHandler,
  tokenExtractor,
  tokenValidate,
  requestLogger
};
