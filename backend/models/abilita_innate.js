const mongoose = require("mongoose"); 

const Schema = mongoose.Schema;

const AbilitaSchema = new Schema ({
    nome: { type: String, required: true },
    summary: { type: String, required: true },
    modificatore: {
        skill: { type: String, required: false },
        bonus: { type: Number, required: false }
    }
})

// Virtual for book's URL
AbilitaSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/abilita/${this._id}`;
  });

  const Abilita = mongoose.model("Abilita", AbilitaSchema);
  module.exports = Abilita
  