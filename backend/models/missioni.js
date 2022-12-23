const mongoose = require("mongoose"); 

const Schema = mongoose.Schema;

const MissioneSchema = new Schema ({
    nome: { type: String, required: true },
    summary: { type: String, required: true },
    terminata: {type: Boolean, required: true }
})

// Virtual for book's URL
MissioneSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/missione/${this._id}`;
  });
    
  module.exports = mongoose.model("Missione", MissioneSchema);