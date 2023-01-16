const mongoose = require("mongoose"); 
mongoose.promise = Promise

const Schema = mongoose.Schema;

const MissioneSchema = new Schema ({
    nome: { type: String, required: true },
    summary: { type: String, required: true },
    terminata: {type: Boolean, required: false }
})

// Virtual for book's URL
MissioneSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/missione/${this._id}`;
  });
    
  const Missione = mongoose.model("Missione", MissioneSchema);
  module.exports = Missione