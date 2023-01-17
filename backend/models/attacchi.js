const mongoose = require("mongoose"); 

const Schema = mongoose.Schema;

const AttaccoSchema = new Schema ({
    nome: { type: String, required: true },
    check: { type: String, required: true },
    effetto: {
        danni: {type: String, required: false},
        modificatore: {
            skill: {type: String},
            bonus_malus: {type: Number}
        }
    },
    attiva: { type: Boolean }
})

// Virtual for book's URL
AttaccoSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/attacco/${this._id}`;
  });
    
  const Attacco = mongoose.model("Attacco", AttaccoSchema);
  module.exports = Attacco