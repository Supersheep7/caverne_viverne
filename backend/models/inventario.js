const mongoose = require("mongoose"); 

const Schema = mongoose.Schema;

const InventarioSchema = new Schema ({
    nome: { type: String, required: true },
    summary: { type: String, required: true },
    magia: { type: String },
    modificatore: {
        skill: { type: String },
        bonus: { type: Number }
    },
    attiva: { type: Boolean }
})

// Virtual for book's URL
InventarioSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/Inventario/${this._id}`;
  });
    
  const Inventario = mongoose.model("Inventario", InventarioSchema);
  module.exports = Inventario
  