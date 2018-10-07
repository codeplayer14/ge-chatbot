const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const technicianSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  pin: {
    type: String,
    required: true
  },
  slots: [
    {
      slot: String,
      slotCount: Number
    }
  ]
});

const technicianModel = mongoose.model("technician", technicianSchema);

module.exports = technicianModel;
