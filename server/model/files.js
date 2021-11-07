const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fileSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    hashedValue: {
      type: String,
      required: true,
    },
    fileContent: {
      type: String,
      required: true,
    },
    version: {
      type: String,
      required: true,
    },
    lastModified: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "Files",
  }
);

const File = mongoose.model("File", fileSchema);
module.exports = File;
