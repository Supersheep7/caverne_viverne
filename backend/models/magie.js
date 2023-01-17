const mongoose = require("mongoose"); 

const Schema = mongoose.Schema;

const MagiaSchema = new Schema ({
    nome: { type: String, required: true },
    summary: { type: String, required: true },
    costo: {
        skill: { type: String },
        cd: { type: Number },
        mana: {type: Number, required: false},
        altro: {type: String}
    },
    effetto: {
        skill: { type: String },
        bonus: { type: Number },
        dadi: { type: String },
        altro: { type: String },
    },
    attiva: {type: Boolean }
})

// Virtual for book's URL
MagiaSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/Magia/${this._id}`;
  });
    
  const Magia = mongoose.model("Magia", MagiaSchema);
  module.exports = Magia