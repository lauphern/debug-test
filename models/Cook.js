const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cookSchema = new Shema({
  name: String,
  cuisine: String
});
const Cook = mongoose.model("cooks", cookSchema)
module.exports = Cook;