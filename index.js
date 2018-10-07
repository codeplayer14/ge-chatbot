const express = require("express");
const bodyParser = require("body-parser");
const validator = require("validator");
const isValidRequest = require("./isValid");
const http = require("http");
const config = require("./API_KEY");
const mongoose = require("mongoose");
const server = express();
const responses = require("./responses");
const service = require("./models/service");
const appliance = require("./models/appliance");
const technician = require("./models/technician");
const userDetails = {};
const user = config.user;
const password = config.password;

const mongoDB = `mongodb://${user}:${pass}@ds225253.mlab.com:25253/ge-service`;
mongoose.connect(
  mongoDB,
  {
    useMongoClient: true
  }
);

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
    const fullName = queryResult.parameters.fullName[0].split(" ");
    userDetails.sessionId.firstName = fullName[0];
    userDetails.sessionId.secondName = fullName[1];
  }

  if (intentName === "Email") {
    const email = queryResult.parameters.emailId[0];
    if (!validator.isEmail(email)) {
      response.json(responses.invalidEmail);
    }
    userDetails.sessionId.emailId = email;
    response.json(responses.emailResponse);
  }

  if (intentName === "Address") {
    const address = queryResult.parameters.address[0];
    userDetails.sessionId.address = address;
    response.json(responses.addressResponse);
  }
  if (intentName === "PIN") {
    const pin = queryResult.parameters.pin[0];
    userDetails.sessionId.pin = pin;
    response.json(responses.pinResponse);
  }

  if (intentName === "Contact") {
    const contact = queryResult.parameters.contact[0];
    userDetails.sessionId.contact = contact;
    responses.json(responses.contactResponse);
  }
  if (intentName === "Issue") {
    const issue = queryResult.parameters.issue[0];
    userDetails.sessionId.issue = issue;
    if (isValidRequest(userDetails.sessionId)) {
      const availableSlots = [];
      technician
        .find({ pin: userDetails.sessionId.pin })
        .then(technicians => {
          technicians.forEach(technician => {
            technician.slots.forEach(slot => {
              if (slot.slotCount > 0) {
                availableSlots.push(slot);
              }
            });
          });
          response.json(responses.prepareSlots(availableSlots));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  if (intentName === "SlotPick") {
  }
});

server.listen(process.env.PORT || 8000, function() {
  console.log("Server is up and running...");
});
