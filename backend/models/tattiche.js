const mongoose = require("mongoose"); 

const Schema = mongoose.Schema;

const TatticaSchema = new Schema ({
    nome: { type: String, required: true },
    summary: { type: String, required: true },
    costo: {
        check: { type: String},
        cd: {type: Number},
        altro: {type: String}
    },
    effetto: {
        skill: { type: String}, 
        bonus: { type: Number },
        dadi: { type: String }
    },
    attiva: {type: Boolean}
})

// Virtual for book's URL
TatticaSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/Tattica/${this._id}`;
  });
    
  const Tattica = mongoose.model("Tattica", TatticaSchema);
  module.exports = Tattica