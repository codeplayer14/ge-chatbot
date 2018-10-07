const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const serviceScehma = new Schema({
  applianceType: {
    type: String,
    required: true
  },
  serialNo: {
    type: String,
    required: true
  },
  modelNo: {
    type: String,
    required: true
  }
});

const applianceModel = mongoose.model("appliance", applianceSchema);

module.exports = applianceModel;
