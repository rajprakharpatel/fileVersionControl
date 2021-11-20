const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    file: {
      blobPath: { type: String, required: false },
      contentType: { type: String, required: true },
    },
    version: {
      type: Number,
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
