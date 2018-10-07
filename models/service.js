const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const technician = require("./technician");
const serviceScehma = new Schema({
  serviceNo: {
    type: String,
    required: true
  },
  technician: {
    type: mongoose.Schema.Types.technician,
    ref: "technician"
  },
  slot: {
    type: String,
    required: true
  },
  customer: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact: {
    type: String
  },
  email: {
    type: String
  }
});

const serviceModel = mongoose.model("service", serviceScehma);

module.exports = serviceModel;
