#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

// Fetch models

var async = require('async')

var Personaggio = require('./models/personaggio')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Declare arrs

function personaggioUpdate(nomepg, oggetto, quantita, cb) {
    
    detail = { 
      inventario: {
        nome: oggetto,
        quantita: quantita
      }
    }     
    
    Personaggio.findOneAndUpdate(
        {"nome": nomepg}, 
        {$push: detail},
        {new: true},
        cb
        )

}

function massUpdate(cb) {
    async.series([
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Bo", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Katana", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Nagajka", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Wakizashi", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Kaiken", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Fukiya", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Lente d'ingrandimento", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Lanterna", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Bilancino", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Clessidra", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Fischietto da richiamo", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Bavaglio San", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Bacio della Rana", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Pennino, carboncini, taccuino", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Acciarino e pietra focaia", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Rampino semplice", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Corde", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Bisaccia in pelle", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Grimaldello", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Vanga", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Piccone", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Custodia cilindrica", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Copricapo Ensui", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Fazzoletto Ryokosha", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Aruhara Mitski", "Scrigno di ferro", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Kleonikos da Bolina", "Remo in legno di Bolina", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Kleonikos da Bolina", "Coltellaccio Dromos", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Kleonikos da Bolina", "Bombe Reset", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Kleonikos da Bolina", "Cappello della pulce", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Guiburgis", "Ciondolo", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Guiburgis", "Stivali lama-urto di Guiburgis", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Guiburgis", "Unguento dell'equilibrio_coordinazione", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Guiburgis", "Unguento dell'equilibrio_prestanza", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Guiburgis", "Polvere della fretta", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Guiburgis", "Tirelire", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Guiburgis", "Talco verde", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Kalim Malik", "Rampino Nomadyn", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Kalim Malik", "Vertigini", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Kalim Malik", "Stivali lama-urto di Guiburgis", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Kalim Malik", "Ossa dei vendicativi", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Kalim Malik", "Guanti fantasma del beduino", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Kalim Malik", "Polvere della fretta", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Syd Rodrigo da Gorbuc", "Pugnale eteride", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Syd Rodrigo da Gorbuc", "Cappotto rinforzato dell'eroe Syd", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Syd Rodrigo da Gorbuc", "Elmetto dell'eroe Syd", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Syd Rodrigo da Gorbuc", "Stivali dell'eroe Syd", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Syd Rodrigo da Gorbuc", "Mantello di Matisca", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Syd Rodrigo da Gorbuc", "Flauto di Hamas", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Syd Rodrigo da Gorbuc", "Freccia del Beduino", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Syd Rodrigo da Gorbuc", "Lira di Matisca", "1", callback);
        },
        function(callback) {
          personaggioUpdate("Syd Rodrigo da Gorbuc", "Anello di Vetro", "1", callback);
        },
        ],
        cb);
}


async.series([
    massUpdate
  ],
function(err) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Done');       
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
