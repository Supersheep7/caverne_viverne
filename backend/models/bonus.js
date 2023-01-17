const mongoose = require("mongoose"); 

const Schema = mongoose.Schema;

const BonusSchema = new Schema ({
    nome: { type: String, required: true },
    summary: { type: String, required: true },
    modificatore: {
        skill: { type: String, required: false },
        bonus: { type: Number, required: false }
    },
    attiva: { type: Boolean }
})

// Virtual for book's URL
BonusSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/bonus/${this._id}`;
  });
    
  const Bonus =  mongoose.model("Bonus", BonusSchema);
  module.exports = Bonus
  