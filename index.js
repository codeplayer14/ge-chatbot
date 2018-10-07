const express = require("express");
const bodyParser = require("body-parser");

const http = require("http");
const HEROKU_API_KEY = require("./API_KEY");

const server = express();
const responses = require("./responses");

const userDetails = {};

server.use(
  bodyParser.urlencoded({
    extended: true
  })
);

server.use(bodyParser.json());

server.post("/ge-webhook", (request, response) => {
  console.log("---------------");

  const queryResult = request.body.queryResult;

  const intentName = queryResult.intent.displayName;
  const queryText = request.body.queryResult.queryText;
  const bodyString = JSON.stringify(request.body);
  const sessionId = request.body.session;
  console.log(intentName);
  console.log("Session ID : " + sessionId);

  if (!userDetails.hasOwnProperty(sessionId)) {
    userDetails.sessionId = {};
  }

  if (intentName === "Options") {
    userDetails.sessionId.applianceToService = queryText;
    response.json(responses.optionsResponse);
  }

  if (intentName === "Name") {
    console.log("Here");
    const fullName = queryResult.parameters.fullName[0].split(" ");
    userDetails.sessionId.firstName = fullName[0];
    userDetails.sessionId.secondName = fullName[1];
  }
});

server.listen(process.env.PORT || 8000, function() {
  console.log("Server is up and running...");
});
