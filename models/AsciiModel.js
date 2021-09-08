const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AsciiSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true, trim: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ascii", AsciiSchema);
