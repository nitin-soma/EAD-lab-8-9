const mongoose = require("mongoose");

const castSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    show: {
      type: String,
      required: true,
    },
    main_lead: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Actor", castSchema);
