const mongoose = require("mongoose"); 

const Schema = mongoose.Schema;

const PersonaggioSchema = new Schema({
  nome: { type: String, required: true }, eta: { type: Number, required: true }, religione: { type: String, required: true },
  altezza: { type: Number, required: true }, pf: { type: Number, required: true }, maxpf: { type: Number, required: true },
  mana: { type: Number, required: true }, maxmana: { type: Number, required: true }, luc: { type: Number, required: true },
  maxluc: { type: Number, required: true },
  stats: {
    intelletto: { type: Number, required: true },
    psiche: { type: Number, required: true },
    forza: { type: Number, required: true },
    motorics: { type: Number, required: true }
  },
  //add max relative to stats + 3
  skills: {
    intskills: {
      logica: { type: Number, required: true },
      cultura: { type: Number, required: true },
      pragmatica: { type: Number, required: true },
      concettualizzazione: { type: Number, required: true },
      tattica: { type: Number, required: true },
    },
    psiskills: {
      forza_di_volonta: { type: Number, required: true },
      sesto_senso: { type: Number, required: true },
      pratica_magica: { type: Number, required: true },
      empatia: { type: Number, required: true },
      connessione_divina: { type: Number, required: true },
    },
    forskills: {
      sopportazione_del_dolore: { type: Number, required: true },
      forza_bruta: { type: Number, required: true },
      elettrochimica: { type: Number, required: true },
      prestanza: { type: Number, required: true },
      istinto_animale: { type: Number, required: true },
    },
    motskills: {
      coordinazione: { type: Number, required: true },
      percezione: { type: Number, required: true },
      reazione: { type: Number, required: true },
      precisione: { type: Number, required: true },
      intuito_di_razza: { type: Number, required: true },
    },
    favskill: { type: String, required: true }
  },
  abilita_innate: { type: Array },
  missioni: { type: Array },
  tattiche: { type: Array },
  magie: { type: Array },
  attacchi: { type: Array },
  bonus: { type: Array },
  inventario: [
    {
    nome: { type: String, required: true },
    quantita: { type: Number, required: true }
    }
  ],
  background: { type: String }  
});

// Virtual for book's URL
PersonaggioSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/personaggio/${this._id}`;
});

PersonaggioSchema.virtual("CA").get(function () {
  let reazione = this.skills.motskills.reazione;
  function checkArmor(item) {
    return item.attiva === true && item.modificatore.skill === "CA"
  }
  function armorNumbers(item) {
    return item.modificatore.bonus
  }
  let armor = this.inventario.filter(checkArmor)
                             .filter(armorNumbers)
                             .reduce((a, b) => a + b, 0)
  let CA = 10 + reazione + armor;
  return CA
});

const Personaggio = mongoose.model("Personaggio", PersonaggioSchema);
module.exports = Personaggio
