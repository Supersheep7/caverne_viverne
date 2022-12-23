#! /usr/bin/env node

console.log('This script populates some test books, personaggios, abilitas and bonuss to your database. Specified database as argument');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

// Fetch models

var async = require('async')

var Abilita = require('./models/abilita_innate')
var Attacchi = require('./models/attacchi')
var Bonus = require('./models/bonus')
var Inventario = require('./models/inventario')
var Magie = require('./models/magie')
var Missioni = require('./models/missioni')
var Personaggio = require('./models/personaggio')
var Tattiche = require('./models/tattiche')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Declare arrs

var abilitas = []
var attaccos = []
var bonuss = []
var inventarios = []
var magies = []
var missionis = []
var personaggios = []
var tattiches = []

/*=== SINGLE FUNCS ===*/
/*
function personaggioCreate(
  nome, 
  eta, 
  religione, 
  altezza,
  pf,
  maxpf,
  mana,
  maxmana,
  luc,
  maxluc,
  intelletto,
  psiche,
  forza,
  motorics,
  logica, cultura, pragmatica, concettualizzazione, tattica,
  forza_di_volonta, sesto_senso, pratica_magica, empatia, connessione_divina,
  sopportazione_del_dolore, forza_bruta, elettrochimica, prestanza, istinto_animale,
  coordinazione, percezione, reazione, precisione, intuito_di_razza,
  favskill,
  cb) {
  detail = {
    nome: nome, 
    eta: eta, 
    religione: religione, 
    altezza: altezza,
    pf: pf,
    maxpf: maxpf,
    mana: mana,
    maxmana: maxmana,
    luc: luc,
    maxluc: maxluc,
    stats: {
    intelletto: intelletto,
    psiche: psiche,
    forza: forza,
    motorics: motorics
    },
    skills: {
    intskills: {
    logica: logica, cultura: cultura, pragmatica: pragmatica, concettualizzazione: concettualizzazione, tattica: tattica },
    psiskills: {
    forza_di_volonta: forza_di_volonta, sesto_senso: sesto_senso, pratica_magica: pratica_magica, empatia: empatia, connessione_divina: connessione_divina},
    forskills: {
    sopportazione_del_dolore: sopportazione_del_dolore, forza_bruta: forza_bruta, elettrochimica: elettrochimica, prestanza: prestanza, istinto_animale: istinto_animale},
    motskills: {
    coordinazione: coordinazione, percezione: percezione, reazione: reazione, precisione: percezione, intuito_di_razza: intuito_di_razza},
    favskill: favskill
    },
  }
  
  var personaggio = new Personaggio(detail);
       
  personaggio.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Personaggio: ' + personaggio);
    personaggios.push(personaggio)
    cb(null, personaggio)
  }  );
}*/
/*
function abilitaCreate(nome, summary, skill, bonus, cb) {

  var abilita = new Abilita({ 
    nome: nome,
    summary: summary,
    modificatore: {
      skill: skill,
      bonus: bonus
    },
   });
       
  abilita.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Abilita: ' + abilita)
    abilitas.push(abilita)
    cb(null, abilita);
  }   );
}*/
/*
function attacchiCreate(nome, check, danni, skill, bonus_malus, cb) {
  detail = { 
    nome: nome,
    check: check,
    effetto: {
      danni: danni,
      modificatore: {
        skill: skill,
        bonus_malus: bonus_malus
      }
    },
    attiva: false
  }
    
  var attacchi = new Attacchi(detail);    
  attacchi.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Attacco: ' + attacchi);
    attaccos.push(attacchi)
    cb(null, attacchi)
  }  );
}
*/
/*
function bonusCreate(nome, summary, skill, bonus, cb) {
  detail = { 
    nome: nome,
    summary: summary,
    modificatore: {
    skill: skill,
    bonus: bonus
    },
    attiva: false
  } 
    
  var bonus = new Bonus(detail);    
  bonus.save(function (err) {
    if (err) {
      console.log('ERROR CREATING bonus: ' + bonus);
      cb(err, null)
      return
    }
    console.log('New bonus: ' + bonus);
    bonuss.push(bonus)
    cb(null, bonus)
  }  );
}*/
/*
function tatticheCreate(nome, summary, check, cd, altro, skill, bonus, dadi, cb) {
    detail = { 
      nome: nome,
      summary: summary,
      costo: {
        check: check,
        cd: cd,
        altro: altro
      },
      effetto: {
        skill: skill,
        bonus: bonus,
        dadi: dadi,
      },
      attiva: false
    }    
      
    var tattiche = new Tattiche(detail);    
    tattiche.save(function (err) {
      if (err) {
        console.log('ERROR CREATING bonus: ' + bonus);
        cb(err, null)
        return
      }
      console.log('New Tattica: ' + tattiche);
      tattiches.push(tattiche)
      cb(null, tattiche)
    }  );
}

function inventarioCreate(nome, summary, magia, skill, quantita, bonus, cb) {
    detail = { 
      nome: nome,
      summary: summary,
      magia: magia,
      quantita: quantita,
      modificatore: {
        skill: skill,
        bonus: bonus
      },
      attiva: false
    }    
      
    var inventario = new Inventario(detail);    
    inventario.save(function (err) {
      if (err) {
        console.log('ERROR CREATING bonus: ' + inventario);
        cb(err, null)
        return
      }
      console.log('New Oggetto: ' + inventario);
      inventarios.push(inventario)
      cb(null, inventario)
    }  );
}

function magieCreate(nome, summary, skill1, cd, mana, altro1, skill2, bonus, dadi, altro2, cb) {
    detail = {
      nome: nome,
      summary: summary,
      costo: {
        skill: skill1,
        cd: cd,
        mana: mana,
        altro: altro1
      },
      effetto: {
        skill: skill2,
        bonus: bonus,
        dadi: dadi,
        altro: altro2
      },
      attiva: false
    }    
      
    var magie = new Magie(detail);    
    magie.save(function (err) {
      if (err) {
        console.log('ERROR CREATING magia: ' + magie);
        cb(err, null)
        return
      }
      console.log('New magia: ' + magie);
      magies.push(magie)
      cb(null, magie)
    }  );
}

function missioniCreate(nome, summary, cb) {
    detail = { 
      nome: nome,
      summary: summary,
      terminata: false
    }    
      
    var missioni = new Missioni(detail);    
    missioni.save(function (err) {
      if (err) {
        console.log('ERROR CREATING missione: ' + missioni);
        cb(err, null)
        return
      }
      console.log('New missione: ' + missioni);
      missionis.push(missioni)
      cb(null, missioni)
    }  );
}*/
/*=== MASS FUNCS ===*/
/*
function massPersonaggioCreate(cb) {
    async.series([
        function(callback) {
          personaggioCreate(
            "aruhara mitski", 
            16, 
            "nessuna", 
            159,
            150,
            150,
            0,
            0,
            97,
            97,
            4,
            3,
            3,
            4,
            3, 3, 4, 4, 2,
            4, 3, 0, 2, 0,
            2, 4, 3, 4, 4,
            4, 4, 4, 4, 0,
            "concettualizzazione", callback);
        },
        function(callback) {
          personaggioCreate(
            "guiburgis", 
            19, 
            "celeste", 
            179,
            180,
            180,
            100,
            100,
            100,
            100,
            4,
            5,
            2,
            3,
            4, 4, 8, 0, 4,
            4, 3, 9, 3, 0,
            4, 0, 3, 2, 0,
            3, 2, 3, 3, 0,
            "pratica_magica", callback);
        },
        function(callback) {
          personaggioCreate(
            "kleonikos da bolina", 
            2, 
            "nera", 
            180,
            300,
            300,
            100,
            100,
            100,
            100,
            3,
            3,
            5,
            3,
            2, 2, 0, 0, 4,
            5, 2, 4, 0, 0,
            5, 6, 4, 8, 2,
            1, 1, 4, 3, 2,
            "prestanza", callback);
        },
        function(callback) {
          personaggioCreate(
            "kalim malik", 
            17, 
            "rosa", 
            175,
            120,
            120,
            100,
            100,
            100,
            100,
            2,
            5,
            2,
            5,
            0, 1, 2, 4, 2,
            5, 6, 5, 0, 3,
            2, 0, 2, 1, 2,
            9, 6, 4, 4, 3,
            "coordinazione", callback);
        },
        function(callback) {
          personaggioCreate(
            "syd rodrigo da gorbuc", 
            14, 
            "ebano", 
            140,
            210,
            210,
            100,
            100,
            100,
            100,
            2,
            5,
            3,
            4,
            0, 2, 1, 2, 1,
            4, 1, 5, 4, 5,
            4, 6, 0, 0, 0,
            4, 5, 5, 7, 2,
            "precisione", callback);
        }
        ],
        // optional callback
        cb);
}
*/
/*
function massAbilitaCreate(cb) {
    async.parallel([
        function(callback) {
          abilitaCreate("Assorbimento", "Gli eteridi non mangiano e dormono pochissimo, non più di 20 minuti al giorno. Assorbono energia vitale direttamente da altre creature ancora viventi, animali o vegetali, esaurendo il loro soffio vitale. Per questo motivo le cure tradizionali non sono efficaci contro gli eteridi, così come tutti gli effetti diretti agli organi vitali (cancrene, infezioni, ecc.)", "\\", 0, callback);
        },
        function(callback) {
          abilitaCreate("Gigantismo", "A seconda dell’energia vitale assorbita, gli eteridi variano di dimensioni, da essere alti come un pollice fino a essere colossali.", "\\", 0, callback);
        },
        function(callback) {
          abilitaCreate("Multimagia", "Gli umani sono l’unica razza capace di utilizzare più tipi di magia contemporaneamente o cambiare devozione nel corso della propria vita.", "\\", 0, callback);
        },
        function(callback) {
          abilitaCreate("Iterazione", "Dover ricorrere più volte a una singola manovra ti mette in difficoltà e ti rende più prevedibile. Ogniqualvolta ripeti una tattica di combattimento già utilizzata perdi 10% di Lucidità e -2 CA. Questi valori sono cumulabili.", "\\", 0, callback);
        },
        function(callback) {
          abilitaCreate("Virtuosismo", "Adoperare le tue varie tecniche in modo creativo e vario ti galvanizza. Dopo 9 manovre diverse di seguito, se non hai subito sbilanciamenti o debilitazioni gravi e non hai ricevuto malus di iterazione, ottieni un turno extra da inserire a tuo piacimento nella serie di iniziativa. Durante questo turno puoi riutilizzare tattiche già adoperate senza il limite *una volta per combat e senza malus di iterazione..", "\\", 0, callback);
        },
        function(callback) {
          abilitaCreate("Corpi gemelli", "I Gemini vivono in due corpi, identici tra di loro, molto simili a corpi umani se non per una macchia rosa che copre il lato sinistro o destro dei volti dei due corpi. Dovendo sostenere l'energia vitale di due corpi, i Gemini devono nutrirsi del doppio della quantità rispetto a un essere umano di stessa età e peso. Ogni danno grave (e ogni modifica consistente) di un corpo viene riportata istantaneamente nell'altro.", "\\", 0, callback);
        },
        function(callback) {
          abilitaCreate("Transfer", "Uno dei due corpi va in riposo, l’altro si attiva. Questa azione è gratuita e istantanea, ma ripetuta a raffica può portare alla nausea.", "\\", 0, callback);
        },
        function(callback) {
          abilitaCreate("Sonnambulismo", "Il corpo in sonno segue il passo dell’altro e può compiere azioni basiche.", "\\", 0, callback);
        },
        function(callback) {
          abilitaCreate("Scaglie", "Gli Artefici hanno il corpo disseminato di scaglie di cristallo semitrasparenti. Queste crescono sulla pelle dei portatori a velocità costante, e possono essere utilizzate giorno per giorno per effetti magici di fabbricazione o di altro tipo. La natura dura del cristallo di cui sono composte le scaglie le rende una preziosa risorsa difensiva. ", "\\", 0, callback);
        },
        function(callback) {
          abilitaCreate("Cristallizazione", "La Cristallizzazione è il fenomeno di ripristino delle scaglie da parte di un Artefice. Può avvenire naturalmente durante il sonno o attraverso esercizi forzati. Una cristallizzazione completa ha come effetto il completo ripristino del mana e dei punti vita. Questo fenomeno permette inoltre di recuperare la propria salute a partire da ferite estremamente gravi (perforazioni, mutilazioni, ecc.)", "\\", 0, callback);
        },
        function(callback) {
          abilitaCreate("Rigenerazione magica", "L’artefice recupera, ogni ora, 8% del proprio mana.", "\\", 0, callback);
        },
        ],
        // optional callback
        cb);
}
*/
/*
function massAttacchiCreate(cb) {
    async.series([
        function(callback) {
          attacchiCreate("Arco e frecce", "precisione", "2d8", "\\", 0, callback);
        },
        function(callback) {
          attacchiCreate("Rampino Nomadyn", "prestanza", "1d8", "forza_bruta", 0, callback);
        },
        function(callback) {
          attacchiCreate("Remo in legno di Bolina", "prestanza", "3d8", "\\", 6, callback);
        },
        function(callback) {
          attacchiCreate("Coltellaccio Dromos", "prestanza", "1d8", "\\", 0, callback);
        },
        function(callback) {
          attacchiCreate("Fionda Aplos bombe semplici", "precisione", "2d8", "\\", 0, callback);
        },
        function(callback) {
          attacchiCreate("Bo", "prestanza", "2d8", "\\", 4, callback);
        },
        function(callback) {
          attacchiCreate("Katana singolo avversario", "prestanza", "2d8", "\\", 0, callback);
        },
        function(callback) {
          attacchiCreate("Katana avversari multipli", "prestanza", "3d8", "\\", 8, callback);
        },
        function(callback) {
          attacchiCreate("Nagajka", "prestanza", "1d8", "\\", 2, callback);
        },
        function(callback) {
          attacchiCreate("Wakizashi", "prestanza", "3d8", "\\", 0, callback);
        },
        function(callback) {
          attacchiCreate("Kaiken", "prestanza", "2d8", "\\", 0, callback);
        },
        function(callback) {
          attacchiCreate("Kaiken extra", "prestanza", "4d8", "\\", 8, callback);
        },
        function(callback) {
          attacchiCreate("Fukiya", "precisione", "1d8", "\\", 2, callback);
        },
        function(callback) {
          attacchiCreate("Wakizashi", "prestanza", "3d8", "\\", 0, callback);
        },
        function(callback) {
          attacchiCreate("Vertigini", "prestanza", "1d8", "\\", 4, callback);
        },
        function(callback) {
          attacchiCreate("Fionda standard", "precisione", "1d8", "\\", 0, callback);
        },
        function(callback) {
          attacchiCreate("Fionda ad area", "precisione", "2d8", "\\", 0, callback);
        },
        function(callback) {
          attacchiCreate("Stivali Lama-urto di Guiburgis", "prestanza", "1d8", "\\", 0, callback);
        },
        function(callback) {
          attacchiCreate("Frusta chiodata", "prestanza", "3d8", "coordinazione", 0, callback);
        },
        function(callback) {
          attacchiCreate("Spadone di magnetite", "prestanza", "3d8", "\\", 0, callback);
        },
        function(callback) {
          attacchiCreate("Accetta da lancio", "precisione", "1d8", "\\", 0, callback);
        },
        function(callback) {
          attacchiCreate("Pugnale eteride", "prestanza", "1d8", "\\", 0, callback);
        },
        ],
        // optional callback
        cb);
}
*/
function massBonusCreate(cb) {
  async.series([
    function(callback) {
      bonusCreate("Ichi", "Ogni giorno ottieni un bonus di +1, +3 o +4 a qualsiasi prova (in quest’ordine). Scegli se applicare il bonus prima di effettuare il tiro.", "\\", 1, callback);
    },
    function(callback) {
      bonusCreate("San", "Ogni giorno ottieni un bonus di +1, +3 o +4 a qualsiasi prova (in quest’ordine). Scegli se applicare il bonus prima di effettuare il tiro.", "\\", 3, callback);
    },
    function(callback) {
      bonusCreate("Yon", "Ogni giorno ottieni un bonus di +1, +3 o +4 a qualsiasi prova (in quest’ordine). Scegli se applicare il bonus prima di effettuare il tiro.", "\\", 4, callback);
    },
    function(callback) {
      bonusCreate("Ni", "È possibile ritirare il tuo secondo fallimento critico della giornata.", "\\", 0, callback);
    },
    function(callback) {
      bonusCreate("Qualcosa da dimostrare", "Se un tuo alleato ha appena fallito un tiro, se è plausibile che tu possa affrontare la stessa prova, puoi farlo tirando 1d20 al posto dei d8.", "\\", 0, callback);
    },
    function(callback) {
      bonusCreate("Figlia di Kin Resu_cultura", "+7 Cultura (I) e Concettualizzazione (I) riguardo informazioni e trivia sulla tua città natale", "cultura", 7, callback);
    },
    function(callback) {
      bonusCreate("Figlia di Kin Resu_concettualizzazione", "+7 Cultura (I) e Concettualizzazione (I) riguardo informazioni e trivia sulla tua città natale", "concettualizzazione", 7, callback);
    },
    function(callback) {
      bonusCreate("Benedizione dello Shiro_forza_di_volonta", "+5 Forza di Volontà (P) e Elettrochimica (F) nella resistenza a magie di illusione, controllo mentale o altri disturbi psichici legati alla magia", "forza_di_volonta", 5, callback);
    },
    function(callback) {
      bonusCreate("Benedizione dello Shiro_elettrochimica", "+5 Forza di Volontà (P) e Elettrochimica (F) nella resistenza a magie di illusione, controllo mentale o altri disturbi psichici legati alla magia", "forza_di_volonta", 5, callback);
    },
    function(callback) {
      bonusCreate("Maledizione dello Shiro", "La tua Lucidità massima è 97% ed è meno stabile", "\\", 0, callback);
    },
    function(callback) {
      bonusCreate("Esterofilia", "+5 Empatia (P) nell’incontro e nell’immersione in nuove culture", "empatia", 5, callback);
    },
    function(callback) {
      bonusCreate("Cultura della Pietà", "-2 ai tiri per colpire contro creature (umanoidi) moribonde. Puoi ignorare questo malus perdendo 5% di Lucidità e scegliendo di infliggere danni non letali", "prestanza", -2, callback);
    },
    function(callback) {
      bonusCreate("Testimone di Abul Nadir_cultura", "+1 Cultura (I) sulla Vanland moderna e +3 INTELLETTO riguardo la spedizione della Nuova Vedetta", "cultura", 1, callback);
    },
    function(callback) {
      bonusCreate("Testimone di Abul Nadir_intelletto", "+1 Cultura (I) sulla Vanland moderna e +3 INTELLETTO riguardo la spedizione della Nuova Vedetta", "intelletto", 3, callback);
    },
    function(callback) {
      bonusCreate("Spelunking_pragmatica", "+4 Pragmatica (I) nell’utilizzo e riparo di oggetti da esplorazione", "pragmatica", 4, callback);
    },
    function(callback) {
      bonusCreate("Spelunking_sesto_senso", "+4 Sesto Senso (P) in ambienti sotterranei (anche per entrate segrete)", "sesto_senso", 4, callback);
    },
    function(callback) {
      bonusCreate("Spelunking_prestanza", "+4 Prestanza (F) per prove di scalare", "prestanza", 4, callback);
    },
    function(callback) {
      bonusCreate("Spelunking_percezione", "+4 Percezione (M) in zone semioscure", "percezione", 4, callback);
    },
    function(callback) {
      bonusCreate("Claustrofilia_coordinazione", "+4 Prestanza (F) e Coordinazione (M) in cunicoli, strettoie e ambienti angusti in generale", "coordinazione", 4, callback);
    },
    function(callback) {
      bonusCreate("Claustrofilia_prestanza", "+4 Prestanza (F) e Coordinazione (M) in cunicoli, strettoie e ambienti angusti in generale", "prestanza", 4, callback);
    },
    function(callback) {
      bonusCreate("Geologa provetta", "+3 Cultura (I) nell’analisi di pietre e metalli", "cultura", 3, callback);
    },
    function(callback) {
      bonusCreate("Enigmista_percezione", "+2  Percezione (M), Logica (I) e Concettualizzazione (I) nell’analisi di indovinelli e in circostanze misteriose", "percezione", 2, callback);
    },
    function(callback) {
      bonusCreate("Enigmista_logica", "+2  Percezione (M), Logica (I) e Concettualizzazione (I) nell’analisi di indovinelli e in circostanze misteriose", "logica", 2, callback);
    },
    function(callback) {
      bonusCreate("Enigmista_concettualizzazione", "+2  Percezione (M), Logica (I) e Concettualizzazione (I) nell’analisi di indovinelli e in circostanze misteriose", "concettualizzazione", 2, callback);
    },
    function(callback) {
      bonusCreate("Senso dell'orientamento", "+3 Logica (I) nell’orientarsi anche in ambienti sconosciuti", "logica", 3, callback);
    },
    function(callback) {
      bonusCreate("Scassinatrice in erba", "+1 Pragmatica (I) nello scassinare serrature", "pragmatica", 1, callback);
    },
    function(callback) {
      bonusCreate("Iniziativa veloce", "+3 Reazione (M) nei tiri di iniziativa", "reazione", 3, callback);
    },
    function(callback) {
      bonusCreate("Underdog", "+8 Danni al primo attacco in un combat in cui c’è un avversario chiaramente superiore (o se sei in condizioni generalmente sfavorite)", "forza_bruta", 8, callback);
    },
    function(callback) {
      bonusCreate("Avversario all'altezza", "+3 Tattica (I) nella valutazione di un possibile avversario", "tattica", 3, callback);
    },
    function(callback) {
      bonusCreate("Duellante_forza", "+1 FORZA E MOTORICS in combattimento 1v1", "forza", 1, callback);
    },
    function(callback) {
      bonusCreate("Duellante_motorics", "+1 FORZA E MOTORICS in combattimento 1v1", "motorics", 1, callback);
    },
    function(callback) {
      bonusCreate("Occhio fine", "+5 Concettualizzazione (I) nella valutazione di oggetti d’arte o preziosi", "concettualizzazione", 5, callback);
    },
    function(callback) {
      bonusCreate("Sapienza storica", "+4 INTELLETTO per prove riguardo la storia antica", "intelletto", 4, callback);
    },
    function(callback) {
      bonusCreate("Mania delle reliquie", "+4 INTELLETTO per prove riguardo ninnoli, reliquie, artefatti degni di nota, reperti archeologici, oggetti curiosi", "intelletto", 4, callback);
    },
    function(callback) {
      bonusCreate("Topino di biblioteca", "+3 Cultura (I) su informazioni generiche che potresti aver letto in libri o archivi", "cultura", 3, callback);
    },
    function(callback) {
      bonusCreate("Zoologa principante_empatia", "+1 Empatia (P) e Cultura (I) nell’analisi e nell’approccio con animali", "empatia", 1, callback);
    },
    function(callback) {
      bonusCreate("Zoologa principante_cultura", "+1 Empatia (P) e Cultura (I) nell’analisi e nell’approccio con animali", "cultura", 1, callback);
    },
    function(callback) {
      bonusCreate("Potenziale nascosto_concettualizzazione", "+3 Concettualizzazione (I) e Logica (I) nel trarre conclusioni sul potenziale raggiungibile da un elemento analizzato", "concettualizzazione", 3, callback);
    },
    function(callback) {
      bonusCreate("Potenziale nascosto_logica", "+3 Concettualizzazione (I) e Logica (I) nel trarre conclusioni sul potenziale raggiungibile da un elemento analizzato", "logica", 3, callback);
    },
    function(callback) {
      bonusCreate("Istinto di fuga_reazione", "+3 Reazione (M) e Istinto animale (F) nel riconoscere e fuggire da pericoli di varia natura", "reazione", 3, callback);
    },
    function(callback) {
      bonusCreate("Istinto di fuga_istinto_animale", "+3 Reazione (M) e Istinto animale (F) nel riconoscere e fuggire da pericoli di varia natura", "istinto_animale", 3, callback);
    },
    function(callback) {
      bonusCreate("Temerarietà", "+2 Istinto animale (F) nel resistere alla paura", "istinto_animale", 2, callback);
    },
    function(callback) {
      bonusCreate("Orecchio da spia", "+5 alle prove di Percezione (M) nell’origliare", "percezione", 5, callback);
    },
    function(callback) {
      bonusCreate("Apprendimento veloce", "Vantaggio in tutte le prove per imparare nuove abilità", "\\", 0, callback);
    },
    function(callback) {
      bonusCreate("Un passo avanti", "+1 a tutte le prove contrapposte", "\\", 1, callback);
    },
    function(callback) {
      bonusCreate("Galvanizzazione", "+2 alla prima prova  appena dopo un successo critico (esclusi i successi critici ottenuti con vantaggio)", "\\", 2, callback);
    },
    function(callback) {
      bonusCreate("Disciplina arcana", "+6 Prat. Magica raddoppiando tempo di casting e mana speso", "pratica_magica", 6, callback);
    },
    function(callback) {
      bonusCreate("Folklore Kid", "+5 ai tiri di Cultura (I) inerenti a storia delle cricche, folklore, leggende popolari", "cultura", 5, callback);
    },
    function(callback) {
      bonusCreate("Colpo di vento", "+1 ai tiri di Precisione (M) quando il bersaglio è un copricapo", "precisione", 1, callback);
    },
    function(callback) {
      bonusCreate("Fanboy", "+2 ai tiri di Empatia (P) nel richiedere un autografo", "empatia", 2, callback);
    },
    function(callback) {
      bonusCreate("Collezionismo", "+3 ai tiri di Concettualizzazione (I) inerenti a ninnoli o reliquie rilevanti folkloristicamente", "concettualizzazione", 3, callback);
    },
    function(callback) {
      bonusCreate("Qualcuno pensi ai bambini!", "-2 ai tiri di Elettrochimica (F) inerenti alla resistenza a sostanze alcoliche/allucinogene", "elettrochimica", -2, callback);
    },
    function(callback) {
      bonusCreate("Amico degli affamati", "+2 ai tiri di Empatia (P) nei confronti di creature affamate", "empatia", 2, callback);
    },
    function(callback) {
      bonusCreate("Memoriale di Matisca", "+2 ai tiri di Empatia (P) nei confronti di tutti gli animali", "empatia", 2, callback);
    },
    function(callback) {
      bonusCreate("Esecuzione in pensione", "+X ai tiri di precisione dove X è il numero di giuramenti attivi", "precisione", 0, callback);
    },
    function(callback) {
      bonusCreate("Morte dal basso", "+2 a prove di Reazione (M) contrapposta nei confronti di creature più alte di te nei paraggi", "reazione", 2, callback);
    },
    function(callback) {
      bonusCreate("Efficienza magica", "La prossima magia effettuata ha un costo mana ridotto di 1% per ogni punto di Pratica Magica (P). Il tempo di casting, se superiore, è ridotto a 2 round.", "\\", 0, callback);
    },
    function(callback) {
      bonusCreate("Duro a morire", "+1 FORZA E MOTORICS in combattimento 1v1", "forza", 1, callback);
    },
    function(callback) {
      bonusCreate("Acume dell'artefice", "Il limite ai punti delle abilità di Intelletto è aumentato di 2", "\\", 0, callback);
    },
    function(callback) {
      bonusCreate("Competenze meccaniche", "+4 ai tiri di Pragmatica (I) inerenti a prove di assemblaggio, costruzione e meccaniche in genere", "pragmatica", 4, callback);
    },
    function(callback) {
      bonusCreate("Educazione magica", "+X ai tiri di Pratica Magica (P) nell’effettuazione di magie ben studiate, dove X sono i punti di Cultura (I)", "pratica magica", 0, callback);
    },
    function(callback) {
      bonusCreate("Vita di campagna", "+3 alle prove di Pragmatica (I) inerenti a sapienze di campagna", "pragmatica", 3, callback);
    },
    function(callback) {
      bonusCreate("Sapienza strategica", "+1 alle prove di Tattica (I) relative a strategia pura e debolezze degli avversari", "tattica", 1, callback);
    },
    function(callback) {
      bonusCreate("Topo di biblioteca_cultura", "+5 ai tiri di Cultura (I) relativi a informazioni lette nei libri", "cultura", 5, callback);
    },
    function(callback) {
      bonusCreate("Topo di biblioteca_pratica_magica", "+X ai tiri di Pratica Magica (P) inerenti a conoscenze sulla magia, dove X è il numero di tomi letti", "pratica_magica", 5, callback);
    },
    function(callback) {
      bonusCreate("Strategia bellica", "+2 alle prove di Tattica (I) relative a pura strategia bellica", "tattica", 2, callback);
    },
    function(callback) {
      bonusCreate("Salvaguardia della cricca_logica", "+2 alle prove di Logica (I) e Tattica (I) in situazioni di rischio per i Mondonauti", "logica", 2, callback);
    },
    function(callback) {
      bonusCreate("Salvaguardia della cricca_tattica", "+2 alle prove di Logica (I) e Tattica (I) in situazioni di rischio per i Mondonauti", "tattica", 2, callback);
    },
    function(callback) {
      bonusCreate("Mente sveglia", "+3 ai tiri di Forza di volontà (P) contro ammaliamento e illusioni", "forza_di_volonta", 3, callback);
    },
    function(callback) {
      bonusCreate("Mente a corazza", "+1 ai tiri di Tattica (I) relativi a strategie difensive", "tattica", 1, callback);
    },
    function(callback) {
      bonusCreate("Ambizione del Dio", "+1 a tutte le prove di PSICHE (P) relative alle fonti", "psiche", 1, callback);
    },
    function(callback) {
      bonusCreate("Buonsenso istintivo", "+2 alle prove di Reazione (M) contrapposte nell’impedire azioni affrettate dei Mondonauti", "reazione", 2, callback);
    },
    function(callback) {
      bonusCreate("Competenze navali_pragmatica", "+3 ai tiri di Pragmatica (I) e Tattica (I) in merito a prove di carpenteria o navigazione in generale", "pragmatica", 3, callback);
    },
    function(callback) {
      bonusCreate("Competenze navali_tattica", "+3 ai tiri di Pragmatica (I) e Tattica (I) in merito a prove di carpenteria o navigazione in generale", "tattica", 3, callback);
    },
    function(callback) {
      bonusCreate("La favorita", "+2 alle prove di Connessione Divina (P) sul continente", "connessione_divina", 2, callback);
    },
    function(callback) {
      bonusCreate("Precocita", "Fai un'azione come se avessi un petalo in più, con malus successivo", "\\", 0, callback);
    },
    function(callback) {
      bonusCreate("Tocco di Zahira_percezione", "+6 ai tiri di Percezione (M) visiva o uditiva, +3 ai tiri di Connessione divina (P) per le magie a difficoltà variabile", "percezione", 6, callback);
    },
    function(callback) {
      bonusCreate("Tocco di Zahira_connessione_divina", "+6 ai tiri di Percezione (M) visiva o uditiva, +3 ai tiri di Connessione divina (P) per le magie a difficoltà variabile", "connessione_divina", 6, callback);
    },
    function(callback) {
      bonusCreate("Uomo di mondo", "+2 ai tiri di Cultura (I) inerenti a mode e costumi del mondo", "cultura", 2, callback);
    },
    function(callback) {
      bonusCreate("Figlio di Alsafar", "+5 ai tiri di Cultura (I) inerenti alle tradizioni e la civiltà Gemini", "cultura", 5, callback);
    },
    function(callback) {
      bonusCreate("'Dottor Baumel?'", "-1 ai tiri di Empatia (P) nei confronti di persone conosciute da meno di due giorni", "empatia", -1, callback);
    },
    function(callback) {
      bonusCreate("Esibizionista", "+1 ai tiri di Coordinazione (M) inerenti a prove di acrobazia effettuate al cospetto di una folla", "coordinazione", 1, callback);
    },
    function(callback) {
      bonusCreate("Famiglia mercantile", "+1 ai tiri di Concettualizzazione (I) nel riconoscere e valutare oggetti di mercato", "concettualizzazione", 1, callback);
    },
    function(callback) {
      bonusCreate("Fool me once..._logica", "+2 ai tiri di Logica (I) e Sesto senso (P) e -2 ai tiri di Empatia (P) se inerenti a sospetti, tranelli o intrighi di altri Gemini.", "logica", 2, callback);
    },
    function(callback) {
      bonusCreate("Fool me once..._sesto_senso", "+2 ai tiri di Logica (I) e Sesto senso (P) e -2 ai tiri di Empatia (P) se inerenti a sospetti, tranelli o intrighi di altri Gemini.", "sesto_senso", 2, callback);
    },
    function(callback) {
      bonusCreate("Fool me once..._empatia", "+2 ai tiri di Logica (I) e Sesto senso (P) e -2 ai tiri di Empatia (P) se inerenti a sospetti, tranelli o intrighi di altri Gemini.", "empatia", -2, callback);
    },
    function(callback) {
      bonusCreate("Derviscio", "+2 ai tiri di Coordinazione (M) inerenti alla danza", "coordinazione", 2, callback);
    },
    function(callback) {
      bonusCreate("Adrenalina_tattica", "-2 ai tiri di Tattica (I) e +2 ai tiri di Elettrochimica (F) durante acrobazie e danze", "tattica", -2, callback);
    },
    function(callback) {
      bonusCreate("Adrenalina_elettrochimica", "-2 ai tiri di Tattica (I) e +2 ai tiri di Elettrochimica (F) durante acrobazie e danze", "elettrochimica", 2, callback);
    },
    function(callback) {
      bonusCreate("*OPA!", "Ritira uno o più dadi per i danni di un attacco frontale", "\\", 0, callback);
    },
    function(callback) {
      bonusCreate("Deflagrazione", "Se i danni subiti causano rimpicciolimento di taglia durante il combattimento, gli avversari nelle estreme vicinanze prendono 2d8 danni e danni alla lucidità", "\\", 0, callback);
    },
    function(callback) {
      bonusCreate("Storie della Mala Bolina_cultura", "+4 Cultura (I) e Pragmatica (I) riguardo pratiche e personalità criminali", "cultura", 4, callback);
    },
    function(callback) {
      bonusCreate("Storie della Mala Bolina_pragmatica", "+4 Cultura (I) e Pragmatica (I) riguardo pratiche e personalità criminali", "pragmatica", 4, callback);
    },
    function(callback) {
      bonusCreate("Animale da mischia", "Vantaggio su tutti i tiri di MOTORICS in combattimenti con 7 avversari o più", "motorics", 0, callback);
    },
    function(callback) {
      bonusCreate("Cuore di pulce", "+4 Empatia (P) nei confronti di creature piccole e inoffensive", "empatia", 4, callback);
    },
    function(callback) {
      bonusCreate("Pellegrino di Thiagoras_concettualizzazione", "+2 Concettualizzazione (I), Cultura (I) e Connessione divina (P) riguardo Thiagoras e la cultura eteride in generale", "concettualizzazione", 2, callback);
    },
    function(callback) {
      bonusCreate("Pellegrino di Thiagoras_cultura", "+2 Concettualizzazione (I), Cultura (I) e Connessione divina (P) riguardo Thiagoras e la cultura eteride in generale", "cultura", 2, callback);
    },
    function(callback) {
      bonusCreate("Pellegrino di Thiagoras_connessione_divina", "+2 Concettualizzazione (I), Cultura (I) e Connessione divina (P) riguardo Thiagoras e la cultura eteride in generale", "connessione_divina", 2, callback);
    },
    function(callback) {
      bonusCreate("Competizione di razza", "+2 Prestanza (F) in combattimento contro altri eteridi", "prestanza", 2, callback);
    },
    function(callback) {
      bonusCreate("Ambizione", "+3 Forza di volontà (P)  in presenza di personalità potenti", "forza_di_volonta", 3, callback);
    },
    function(callback) {
      bonusCreate("Vendicativo", "+3 Istinto animale (F) in combattimento se mosso da vendetta", "istinto_animale", 3, callback);
    },
    function(callback) {
      bonusCreate("Furfante di mare_reazione", "+2 Reazione (M), Coordinazione (M) e Pragmatica (I) in mare", "reazione", 2, callback);
    },
    function(callback) {
      bonusCreate("Furfante di mare_coordinazione", "+2 Reazione (M), Coordinazione (M) e Pragmatica (I) in mare", "coordinazione", 2, callback);
    },
    function(callback) {
      bonusCreate("Furfante di mare_pragmatica", "+2 Reazione (M), Coordinazione (M) e Pragmatica (I) in mare", "pragmatica", 2, callback);
    },
    function(callback) {
      bonusCreate("Pollice verde", "+4 Pragmatica (I) nella cura delle piante", "pragmatica", 4, callback);
    }
    ],
        // optional callback
        cb);
}
/*
function massTatticheCreate(cb) {
  async.series([
    function(callback) {
      tatticheCreate("Maestria Acrobatica_secondo_turno", 
                    "Ogni turno puoi attaccare i tuoi avversari in modo acrobatico. Durante il secondo attacco ottieni un bonus di +2 a tutti i tiri di MOTORICS e +1d8 a tutti i danni.", 
                    "\\",
                    0, 
                    "\\", 
                    "motorics",
                    2, 
                    "1d8", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Maestria Acrobatica_terzo_turno", 
                    "Ogni turno puoi attaccare i tuoi avversari in modo acrobatico. Durante il terzo attacco superi una prova di Coordinazione difficoltà 18, e ottieni un bonus di +4 a tutti i tiri di MOTORICS e +2d8 a tutti i danni.", 
                    "coordinazione",
                    18, 
                    "\\", 
                    "motorics",
                    4, 
                    "2d8", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Maestria Acrobatica_N_turno", 
                    "Ogni turno puoi attaccare i tuoi avversari in modo acrobatico. È possibile progredire con attacchi acrobatici ogni attacco aumentando la difficoltà della prova di 5, i danni di 1d8 e il bonus ai tiri di MOTORICS di +2, fino a che una prova non fallisce o l’azione viene interrotta.", 
                    "coordinazione",
                    5, 
                    "\\", 
                    "motorics",
                    2, 
                    "1d8", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Attacchi a tempo_12/8", 
                    "Durante i combattimenti, puoi scegliere un ritmo su cui danzare mentre combatti, purché ci sia musica nei paraggi. Durante ogni turno risultati specifici su tiri di caratteristiche (solo tiri di combattimento) risultano in un’azione extra. Non è possibile ottenere più di tre azioni extra con questo tempo. 1 Round: 3 2 Round: 6 3 Round: 9 4 Round: 12", 
                    "\\",
                    0, 
                    "\\", 
                    "\\",
                    0, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Attacchi a tempo_4/4_1", 
                    "Durante i combattimenti, puoi scegliere un ritmo su cui danzare mentre combatti, purché ci sia musica nei paraggi. Al primo round hai il seguente modificatore: -1 Motorics", 
                    "\\",
                    0, 
                    "\\", 
                    "motorics",
                    -1, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Attacchi a tempo_4/4_2", 
                    "Durante i combattimenti, puoi scegliere un ritmo su cui danzare mentre combatti, purché ci sia musica nei paraggi. Al primo round hai il seguente modificatore: +2 Motorics", 
                    "\\",
                    0, 
                    "\\", 
                    "motorics",
                    2, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Attacchi a tempo_4/4_3", 
                    "Durante i combattimenti, puoi scegliere un ritmo su cui danzare mentre combatti, purché ci sia musica nei paraggi. Al primo round hai il seguente modificatore: -3 Motorics", 
                    "\\",
                    0, 
                    "\\", 
                    "motorics",
                    -3, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Attacchi a tempo_4/4_4", 
                    "Durante i combattimenti, puoi scegliere un ritmo su cui danzare mentre combatti, purché ci sia musica nei paraggi. Al primo round hai il seguente modificatore: +4 Motorics", 
                    "\\",
                    0, 
                    "\\", 
                    "motorics",
                    4, 
                    "4d8", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Attacco a distanza pianificato", 
                    "Puoi preparare un attacco per un massimo di 4 turni. Quando sferri l’attacco tira con un tiro di Tattica (I) per ogni turno preparato e seleziona il migliore.", 
                    "tattica",
                    0, 
                    "\\", 
                    "\\",
                    0, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Esplosione di scaglie", 
                    "saurisci completamente il tuo mana. Genera un’esplosione di cristalli che colpisce in un’area dal raggio di 5 metri. Il danno effettuato è pari a 8d8 +1 per ogni 1% mana esaurito nell’effettuazione di questa magia.", 
                    "\\",
                    0, 
                    "\\", 
                    "\\",
                    0, 
                    "8d8", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Attacco a distanza preparato", 
                    "Puoi preparare un attacco per un massimo di 4 turni. Quando sferri l’attacco fai una prova di Precisone (M) per ogni turno preparato e seleziona il migliore. Se va a segno infligge danni pari ai danni dell’arma.", 
                    "precisione",
                    0, 
                    "\\", 
                    "\\",
                    0, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Mira scrupolosa", 
                    "Durante questo turno tira con vantaggio il primo tiro per colpire.", 
                    "\\",
                    0, 
                    "\\", 
                    "\\",
                    0, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Colpo sicuro", 
                    "Sostituisci 8 a qualsiasi tiro per colpire per gli attacchi durante questo turno.", 
                    "\\",
                    0, 
                    "\\", 
                    "\\",
                    0, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Spaccaossa", 
                    "Durante questo turno ogni attacco infligge un -1 FORZA addizionale (non cumulabile)", 
                    "\\",
                    0, 
                    "\\", 
                    "\\",
                    0, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Tagliatendini", 
                    "Durante questo turno ogni attacco infligge un -1 MOTORICS addizionale (non cumulabile)", 
                    "\\",
                    0, 
                    "\\", 
                    "\\",
                    0, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Doppio attacco", 
                    "Guadagna un attacco aggiuntivo contro un avversario durante questo turno. Il doppio attacco deve essere eseguito contro lo stesso bersaglio del primo attacco del turno.", 
                    "\\",
                    0, 
                    "\\", 
                    "\\",
                    0, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Ostinazione", 
                    "Durante questo turno ignora i danni alle caratteristiche e alla Lucidità.", 
                    "\\",
                    0, 
                    "\\", 
                    "\\",
                    0, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Toccata e fuga", 
                    "Guadagna un’azione di movimento aggiuntiva durante questo turno. L’azione deve essere eseguita DOPO l’eventuale attacco.", 
                    "\\",
                    0, 
                    "\\", 
                    "\\",
                    0, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Ferocia", 
                    "Durante questo turno, per ogni attacco, effettua il valore massimo di danni possibile tirando i dadi (es. 4d8 + 8 = 40). Alla fine del turno perdi 15% Lucidità.", 
                    "\\",
                    0, 
                    "15 luc", 
                    "\\",
                    0, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Vortice", 
                    "Durante questo turno puoi attaccare contemporaneamente tutti gli avversari entro la tua portata. L’attacco in vortice vale come un singolo attacco.", 
                    "\\",
                    0, 
                    "\\", 
                    "\\",
                    0, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Tenere il terreno_CA", 
                    "Fino al tuo prossimo turno, guadagni +2 CA e +3 Coordinazione (M) e +3 Prestanza (F) per evitare di essere sbilanciata/disarmata/ribaltata.", 
                    "\\",
                    0, 
                    "\\", 
                    "CA",
                    2, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Tenere il terreno_coordinazione", 
                    "Fino al tuo prossimo turno, guadagni +2 CA e +3 Coordinazione (M) e +3 Prestanza (F) per evitare di essere sbilanciata/disarmata/ribaltata.", 
                    "\\",
                    0, 
                    "\\", 
                    "coordinazione",
                    3, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Tenere il terreno_prestanza", 
                    "Fino al tuo prossimo turno, guadagni +2 CA e +3 Coordinazione (M) e +3 Prestanza (F) per evitare di essere sbilanciata/disarmata/ribaltata.", 
                    "\\",
                    0, 
                    "\\", 
                    "prestanza",
                    3, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Parry", 
                    "Fino al tuo prossimo turno, guadagni +2CA contro un avversario. Se questo tuo avversario effettua un attacco contro di te e fallisce, puoi sferrare un attacco gratuito (senza bonus) contro di lui con un’arma che stai già impugnando.", 
                    "\\",
                    0, 
                    "\\", 
                    "CA",
                    2, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Temporeggiamento", 
                    "Ottieni un bonus aggiuntivo tra le tattiche di combattimento al tuo prossimo turno.", 
                    "\\",
                    0, 
                    "\\", 
                    "\\",
                    0, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Estrazione rapida", 
                    "Cambia arma come azione gratuita.", 
                    "\\",
                    0, 
                    "\\", 
                    "\\",
                    0, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Euforia", 
                    "Da questo turno in poi e fino alla fine del combattimento, ogni attacco infligge 1d8 aggiuntivo di danni.", 
                    "\\",
                    10, 
                    "luc", 
                    "\\",
                    0, 
                    "1d8", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Finta", 
                    "Rinuncia ad attaccare durante questo turno. Scegli un avversario con cui sei in combattimento ed effettua una prova di Reazione (M) contrapposta. Se vinci la prova, il tuo avversario prende -5 CA finché non si riassesta difensivamente o fino al tuo prossimo turno", 
                    "reazione",
                    0, 
                    "\\", 
                    "\\",
                    0, 
                    "-5 alla CA dell'avversario", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Prepararsi all’impatto", 
                    "Rinuncia ad attaccare durante questo turno. Durante il tuo prossimo turno, raddoppia i d8 di danni di ogni tuo attacco.", 
                    "\\",
                    0, 
                    "\\", 
                    "\\",
                    0, 
                    "\\", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Colpo netto", 
                    "Durante questo turno, ogni tuo attacco infligge 1d8 aggiuntivo di danni.", 
                    "\\",
                    0, 
                    "\\", 
                    "\\",
                    0, 
                    "1d8", 
                    callback);
    },
    function(callback) {
      tatticheCreate("Stance difensiva", 
                    "Rinuncia ad attaccare durante questo turno. Fino al tuo prossimo turno, guadagni +4 CA.", 
                    "\\",
                    0, 
                    "\\", 
                    "CA",
                    4, 
                    "\\", 
                    callback);
    },
    ],
        // optional callback
        cb);
}

function massInventarioCreate(cb) {
  async.series([
    function(callback) {
      inventarioCreate("Rampino Nomadyn", "Bonus di +3 alle prove di Prestanza (F) inerenti allo scalare.", "\\", 1, "prestanza", 3, callback);
    },
    function(callback) {
      inventarioCreate("Ossa dei vendicativi", "+1 Armatura", "\\", 1, "CA", 1, callback);
    },
    function(callback) {
      inventarioCreate("Vertigini", "Due pugnali gemelli. Per ogni colpo inflitto, chi ha subito il danno fa una prova di Forza di Volontà (P) (CD Media).  Se fallisce, subisce visioni di lanci vertiginosi nei pressi dei Canyon di Alsafar, rimanendo di fatto accecato e nauseato per un turno e recuperando gradualmente. Un avversario può essere affetto solo una volta per combattimento dalle Vertigini.", "rosa", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Guanti fantasma del beduino", "Guanti sottilissimi che aumentano di il raggio d’azione di un Gemini. Il raggio aumenta di tanti metri quanto sono i punti di Intuito di Razza (M)", "rosa", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Stivali Lama-urto di Guiburgis", "Stivali dotati di una lama a scatto. Danni: 1d8 Attivazione: Onda d’urto di Guiburgis L’onda d’urto che spinge via ogni elemento esterno intorno a te. L’urto in sé infligge 1d8 danni, più altri danni eventuali da caduta o da urto, fino a un massimo di 3d8.", "verde", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Polvere della fretta", "Guanti sottilissimi che aumentano di il raggio d’azione di un Gemini. Il raggio aumenta di tanti metri quanto sono i punti di Intuito di Razza (M)", "rosa", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Guanti fantasma del beduino", "Guanti sottilissimi che aumentano di il raggio d’azione di un Gemini. Il raggio aumenta di tanti metri quanto sono i punti di Intuito di Razza (M)", "rosa", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Polvere della fretta", "La Polvere della Fretta può accelerare la pratica di molte magie (1 round per magie sotto i 15 minuti, 1-3 minuti per magie di lunga o lunghissima durata).", "rosa", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Remo in legno di Bolina", "Questo remo, fabbricato a Bolina Levante, è stato eterizzato presso la fonte di magia nera a Thiagoras. Scalando di dimensioni insieme al suo portatore, inoltre, infligge danni in base alla tua stazza: -Colossale: 6d8 + 15 -Grande:  4d8 +9 -Medio: 3d8 + 6 -Piccolo: 2d8 -Minuscolo: / Per ogni 25 danni (inclusi i danni aggiuntivi di Forza Bruta) quest’arma applica anche 1 danno magico a MOTORICS. Inoltre, il Remo può assorbire fino a 2 magie di qualsiasi tipo e replicarle, se possibile, sotto forma di magia nera. L’assorbimento richiede una prova di Pratica Magica (P) e può essere praticato solo su alleati. Uno stesso slot può essere occupato da varie repliche della stessa magia senza limite.", "nera", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Coltellaccio Dromos", "Se il tuo avversario ha mana, lui perde 3% di mana e tu guadagni 3% di mana (non cumulabile).", "nera", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Bombe Reset", "Utilizzabili con fionda. 1 danno + effetto Reset", "nera", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Cappello della pulce", "Se sei di taglia piccola o minuscola, puoi ritirare un fallimento critico.", "nera", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Ciondolo", "Un piccolo medaglione retto da una catenina con una chiusura magnetica. Contiene al suo interno i ritratti dei genitori di Guiburgis.", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Unguento dell'equilibrio_coordinazione", "Bonus di +2 ai tiri di Coordinazione (M) relativi a prove acrobatiche e +2 ai tiri di Prestanza (F) relativi a prove di scalare o resistenza a scosse. Dura circa 3 minuti, applicarlo completamente richiede almeno un minuto.", "verde", 1, "coordinazione", 2, callback);
    },
    function(callback) {
      inventarioCreate("Unguento dell'equilibrio_prestanza", "Bonus di +2 ai tiri di Coordinazione (M) relativi a prove acrobatiche e +2 ai tiri di Prestanza (F) relativi a prove di scalare o resistenza a scosse. Dura circa 3 minuti, applicarlo completamente richiede almeno un minuto.", "verde", 1, "prestanza", 2, callback);
    },
    function(callback) {
      inventarioCreate("Tirelire", "Un piccolo salvadanaio capace di conservare mana verde inutilizzato. Può conservare fino a 50% di mana. Per “caricarlo” è necessario conservare mana inutilizzato da giorni precedenti, che viene parzialmente conservato (50% del mana inutilizzato viene mantenuto).", "verde", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Talco verde", "Talco che aumenta il raggio d’azione delle magie un Djinn. Il raggio aumenta di tanti metri quanto sono i punti di Intuito di Razza (M). Può essere utilizzato due volte prima di essere temporaneamente consumato. L’applicazione richiede un minuto.", "verde", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Elmetto dell'eroe Syd", "+1 CA. Magia grigia. Se attivato con un azione di movimento (strofinandolo fortemente), per 1 round, ottieni +1 a TUTTI I TIRI per ciascuno dei tuoi alleati in combattimento (fino a 6). La magia funziona fintanto che il suo portatore è altruista e legato ai suoi alleati.", "grigia", 1, "CA", 1, callback);
    },
    function(callback) {
      inventarioCreate("Cappotto rinforzato dell'eroe Syd", "+1 CA Magia grigia. Se raggiungi i 0 pf o svieni, il Cappotto si animerà e proverà a trascinarti verso la salvezza. La magia funziona fintanto che il suo portatore è disposto a rischiare coraggiosamente per raggiungere i suoi obiettivi.", "grigia", 1, "CA", 1, callback);
    },
    function(callback) {
      inventarioCreate("Stivali dell'eroe Syd", "Se attivati, compaiono, dove possibile, delle impronte di stivale per terra che conducono verso un luogo presumibilmente sicuro nelle vicinanze o in direzione di casa. La magia funziona fintanto che il suo portatore non dimentica mai le sue origini e la sua provenienza.", "grigia", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Mantello di Matisca", "Magia Verde: rende possibile trasformarsi in vari animali con varie qualità (trasformazione pura, qualità secondaria, qualità terziaria) -Camaleonte -Riccio -Pesce spada -Pavone L’effetto dura un massimo di due round.", "verde", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Flauto di Hamas", "Produce un rumore ampio e infausto più simile a quello di un organo. Ha un effetto attrattivo o repulsivo per gli spiriti, e crea per gli umanoidi un senso di smarrimento e fastidio. Il suo suono, prolungato, provoca -2 a TUTTI I TIRI di PSICHE.", "rossa", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Lira di Matisca", "Magia verde: una lira capace di ammaliare animali di ogni tipo. Richiede una prova di Pragmatica (I) per essere utilizzata al meglio delle sue possibilità.", "verde", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Freccia del beduino", "Magia rosa. Questa freccia ritorna automaticamente sulla corda dopo essere stata scoccata, e può “sostituire” una qualsiasi altra freccia presente nella faretra (consumandola).", "rosa", 1, "coordinazione", 3, callback);
    },
    function(callback) {
      inventarioCreate("Anello di vetro", "Magia verde. Potere ignoto.", "verde", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Pugnale eteride", "Magia nera. Danni: 1d8 + 1 danno MOTORICS (non cumulabile)", "nera", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Bo", "Puoi ripetere la tattica “tenere il terreno” senza malus di iterazione.", "\\", 1, "\\", 2, callback);
    },
    function(callback) {
      inventarioCreate("Katana", "Se durante questo turno effettui attacchi multipli o con più bersagli, il danno di quest’arma è invece di 3d8 +8", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Nagajka", "Se effettui con successo una tattica “finta” con quest’arma, il tuo prossimo attacco infligge 8 danni aggiuntivi.", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Kaiken", "Il danno di quest’arma è 4d8 +8 negli attacchi extra (es. turni extra, parry).", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Lente d'ingrandimento", "+3 Percezione (M) - Osservazione a breve distanza nell’analisi di piccoli oggetti e nella ricerca di dettagli.", "\\", 1, "percezione", 3, callback);
    },
    function(callback) {
      inventarioCreate("Rampino semplice", "+2 Prestanza (F) Scalare", "\\", 1, "prestanza", 2, callback);
    },
    function(callback) {
      inventarioCreate("Lanterna", "Alimentata a olio, è estremamente efficace nell’illuminare in condizioni di nebbia.", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Clessidra", "Della durata di 10 minuti", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Bilancino", "Efficace per individuare falsi e per misurazioni in genere", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Fischietto da richiamo", "Può attirare uccelli o altri animali con una prova di Pragmatica (I)", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Bavaglio San", "Scherma (parzialmente) il volto dallo Shiro e da fumi tossici", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Bacio della rana", "Unguento dal forte odore che aiuta a resistere alla nausea", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Pennino, caboncini, taccuino", "Taccuino in cuoio pregiato", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Acciarino e pietra focaia", "Per accendere un fuoco", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Corde", "Varie dimensioni e spessore, utilizzabili anche per lo spelunking", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Bisaccia in pelle", "Per i viaggi", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Grimaldello", "Permette di scassinare serrature con una prova di Pragmatica (I)", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Vanga", "Piccole dimensioni, smontabile", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Piccone", "Piccole dimensioni, smontabile", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Custodia cilindrica", "Contiene il tuo bottino più interessante: pergamene, pagine d’archivio, documenti storici", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Copricapo Ensui", "Cappello largo che fa ombra e ripara dalla pioggia. Sul suo lato interno c’è una rappresentazione stilizzata di una mappa dei distretti antichi di Kin Resu.", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Fazzoletto Ryokosha", "Fazzoletto con un semplice ricamo: una virgola rossa iscritta in un cerchio nero su campo bianco. È un simbolo non ufficiale dei Ryokosha e simboleggia una lanterna (che custodisce e protegge il fuoco del sapere dell’uomo) contro la minaccia dello Shiro.", "\\", 1, "\\", 0, callback);
    },
    function(callback) {
      inventarioCreate("Scrigno di ferro", "Contiene i tuoi risparmi personali", "\\", 1, "\\", 0, callback);
    },
    ],
        // optional callback
        cb);
}

function massMagieCreate(cb) {
  async.series([
    function(callback) {
      magieCreate("Primo dono dei marci", "\\", 
                  "\\", 0, 15, "\\", 
                  "\\", 0, "\\", "Fino alla fine del combattimento, l'arma incantata infligge in aggiunta 1 danno a INTELLIGENZA o PSICHE", 
                  callback);
    },
    function(callback) {
      magieCreate("Secondo dono dei marci", "\\", 
                  "\\", 0, 15, "\\", 
                  "\\", 0, "\\", "Fino alla fine del combattimento, l'arma incantata infligge in aggiunta 1 danno a FORZA o MOTORICS", 
                  callback);
    },
    function(callback) {
      magieCreate("Ferita magica", "\\", 
                  "pratica_magica", 0, 20, "\\", 
                  "\\", 0, "\\", "Infliggi 1 danno PSICHE a un avversario in combattimento con te. Fino alla fine del combattimento, ogniqualvolta il tuo avversario lancia una magia, perde 10 PF e 5% aggiuntivi di mana.", 
                  callback);
    },
    function(callback) {
      magieCreate("Reset", "\\", 
                  "\\", 0, 10, "\\", 
                  "\\", 0, "\\", "Infliggi 1 danno INTELLIGENZA  a un avversario in combattimento con te, poi uno sbuffo di magia nera si espande nel raggio di 7 metri. Ogni  avversario nei paraggi che sta canalizzando/preparando una magia esegue una prova di Pragmatica (I), difficoltà Media, per non interrompere la magia.", 
                  callback);
    },
    function(callback) {
      magieCreate("Mors tua vita mea", "\\", 
                  "itinto_animale", 0, 20, "\\", 
                  "forza", 1, "\\", "Infliggi 1 danno FORZA a un avversario in combattimento con te. Fino alla fine del combattimento, ottieni +1 a tutti i tiri di FORZA.", 
                  callback);
    },
    function(callback) {
      magieCreate("Indurre al delirio", "\\", 
                  "elettrochimica", 0, 30, "Terreno non artificiale", 
                  "\\", 0, "\\", "Infliggi 1 danno PSICHE a un avversario in combattimento con te. Durante il turno successivo, effettua un tiro contrapposto di Elettrochimica (F) per aumentare il danno a PSICHE a 2.", 
                  callback);
    },
    function(callback) {
      magieCreate("Infierire", "Una nube di pura magia nera si espande immediatamente attorno a te, fino a un raggio di 7 metri.", 
                  "\\", 0, 40, "\\", 
                  "\\", 0, "3d8", "Una nube di pura magia nera si espande immediatamente attorno a te, fino a un raggio di 7 metri. Tutti gli avversari nei paraggi che hanno subito danni a INTELLIGENZA, PSICHE, FORZA O MOTORICS provenienti da una tua fonte prendono 3d8 danni per ciascuno dei danni alle caratteristiche.", 
                  callback);
    },
    function(callback) {
      magieCreate("Polvere alla polvere", "Sottrae le qualità magiche a un oggetto", 
                  "pratica_magica", 0, 5, "\\", 
                  "mana", 25, "\\", "Sottrae le qualità magiche a un oggetto. Ripristina fino a 25% mana. Dura fino a un'ora", 
                  callback);
    },
    function(callback) {
      magieCreate("Rilascio vitale", "\\", 
                  "intuito_di_razza", 0, 25, "\\", 
                  "mana", 25, "\\", "Diminuisce gradualmente i tuoi Punti Ferita. Ripristina fino a 25% mana.", 
                  callback);
    },
    function(callback) {
      magieCreate("Recupero brillante", "Se un tuo alleato ha fallito una magia (eccetto che per cause esterne), puoi effettuare una prova variabile di Reazione (M). Se superi la prova, il tuo alleato ripristina il 50% del mana utilizzato per lanciare la magia. Nota: puoi tirare con vantaggio se il lancio è programmato o canalizzato molto lentamente.", 
                  "reazione", 0, 0, "Un tuo alleato ha fallito il lancio di una magia", 
                  "\\", 0, "\\", "Ripristina il 50% del mana utilizzato da un alleato per lanciare una magia fallita.", 
                  callback);
    },
    function(callback) {
      magieCreate("Deus ex machina", "Prega gli Dèi per un'intercessione", 
                  "connessione_divina", 0, 0, "\\", 
                  "\\", 0, "\\", "\\", 
                  callback);
    },
    function(callback) {
      magieCreate("Coscienza condivisa", "\\", 
                  "\\", 0, 10, "2 petali", 
                  "\\", 0, "\\", "Per i prossimi 15 minuti, è possibile agire contemporaneamente con entrambi i corpi.", 
                  callback);
    },
    function(callback) {
      magieCreate("Dono delle sabbie di Alsafar", "Incanta un'arma", 
                  "\\", 0, 10, "1 petalo", 
                  "\\", 0, "\\", "L’arma incantata applica l’effetto di Vertigini: dopo il primo danno subito effettua una prova di Forza di Volontà (P) (CD Difficile): se fallisce, subisce visioni di lanci vertiginosi nei pressi dei Canyon di Alsafar, rimanendo di fatto accecato e nauseato per un turno e recuperando gradualmente.", 
                  callback);
    },
    function(callback) {
      magieCreate("Richiamo del canyon", "Questa magia non è un attacco, ma una condizione che si applicherà al tuo prossimo attacco a segno sull’avversario.", 
                  "\\", 0, 10, "1 petalo. L'avversario è affetto da vertigini", 
                  "\\", 0, "\\", "Il tuo prossimo colpo inflitto spingerà il nemico a gettarsi per terra a meno che non superi una prova di Forza di Volontà (P) (CD Difficile) o di Istinto Animale (F) (CD Difficile)", 
                  callback);
    },
    function(callback) {
      magieCreate("Richiamo di Alsafar", "Questa magia non è un attacco, ma una condizione che si applicherà al tuo prossimo attacco a segno sull’avversario.", 
                  "\\", 0, 20, "5 petali. L'avversario è affetto da vertigini", 
                  "\\", 0, "\\", "Se il tuo avversario è affetto da vertigini, il tuo prossimo colpo inflitto spingerà il nemico a gettarsi nel portale aperto più vicino a meno che non superi una prova di Forza di Volontà (P) (CD Difficile) o di Istinto Animale (F) (CD Difficile). Se hai un Sigillo di ritorno attivo, puoi invece forzare il tuo avversario a teletrasportarsi presso di esso.", 
                  callback);
    },
    function(callback) {
      magieCreate("Campo di ubiquità", "\\", 
                  "\\", 0, 22, "1 petalo", 
                  "\\", 0, "\\", "Puoi teletrasportarti gratuitamente con un’azione di movimento entro un perimetro di massimo 500m² (considerandoti al centro del perimetro) che già hai analizzato visivamente (anche attraverso Panoramica)", 
                  callback);
    },
    function(callback) {
      magieCreate("Sigillo di ritorno", "\\", 
                  "\\", 0, 5, "1 petalo", 
                  "\\", 0, "\\", "Crea sul terreno un sigillo presso cui è possibile teletrasportarsi nei successivi tre turni (oppure, con un portale a braccio, entro il giorno successivo).", 
                  callback);
    },
    function(callback) {
      magieCreate("Portale a braccio", "\\", 
                  "\\", 0, 20, "2 petali", 
                  "\\", 0, "\\", "Con due movimenti del braccio si aprono due portali della durata di 1 minuto che collegano due punti a massimo 1500 metri di distanza. Con un solo movimento è possibile aprire un portale presso un Sigillo di ritorno (eseguito non più di 24 ore prima).", 
                  callback);
    },
    function(callback) {
      magieCreate("Portale di ribalta", "\\", 
                  "pratica_magica", 18, 10, "1 petalo", 
                  "\\", 0, "\\", "Tracciando un movimento circolare su una superficie, crea un portale che trasporta le persone all’interno del cerchio dal lato opposto della superficie. Se la superficie è troppo spessa o non ha un accesso presso l’altro lato la magia non ha effetto. Il portale dura circa 15 secondi. ", 
                  callback);
    },
    function(callback) {
      magieCreate("Panoramica", "\\", 
                  "\\", 0, 2, "1 petalo", 
                  "percezione", 3, "\\", "Osserva il luogo circostante come se fosse osservato dall’alto (1.000m²).", 
                  callback);
    },
    function(callback) {
      magieCreate("Panoramica_citta", "La panoramica è estesa a 1.000km2", 
                  "pratica_magica", 20, 2, "3 petali", 
                  "percezione", 3, "\\", "Osserva il luogo circostante come se fosse osservato dall’alto (1.000km²).", 
                  callback);
    },
    function(callback) {
      magieCreate("Panoramica_regione", "La panoramica è estesa a 20.000km2", 
                  "pratica_magica", 23, 40, "4 petali", 
                  "percezione", 3, "\\", "Osserva il luogo circostante come se fosse osservato dall’alto (20.000km²).", 
                  callback);
    },
    function(callback) {
      magieCreate("Teletrasporto minore", "\\", 
                  "pratica_magica", 17, 10, "1 petalo", 
                  "\\", 0, "\\", "Uno dei due corpi effettua un teletrasporto a distanza di massimo due metri. Questo movimento può attraversare quasi ogni barriera, ma non è infallibile.", 
                  callback);
    },
    function(callback) {
      magieCreate("Visione in prestito", "\\", 
                  "empatia", 0, 10, "1 petalo. 10 minuti di preparazione", 
                  "\\", 0, "\\", "È possibile osservare attraverso gli occhi di un soggetto bendisposto per la durata di 10 minuti.", 
                  callback);
    },
    function(callback) {
      magieCreate("Arto fantasma", "\\", 
                  "\\", 0, 10, "2 petali", 
                  "\\", 0, "\\", "Permette di effettuare azioni “telecinetiche” a distanza (il movimento è replicato a X metri di distanza, dove X è sono i PUNTI di Intuito di Razza (M).", 
                  callback);
    },
    function(callback) {
      magieCreate("Portale continentale", "Il portale su luoghi non familiari o non fissi ha una più alta possibilità di fallimento.", 
                  "pratica_magica", 0, 50, "4 petali. 5 ore di preparazione", 
                  "\\", 0, "\\", "Apri un portale verso ogni luogo familiare sul continente", 
                  callback);
    },
    function(callback) {
      magieCreate("Richiudi portale", "\\", 
                  "\\", 0, 1, "1 petalo. Per richiudere un portale aperto da qualcun altro è necessario l’utilizzo di più petali e una prova di Forza di volontà (P), difficoltà variabile.", 
                  "\\", 0, "\\", "Richiudi un portale che hai aperto", 
                  callback);
    },
    function(callback) {
      magieCreate("Insabbiare visione", "Segna due parentesi con due diversi petali presso due superfici una di fronte all’altra.", 
                  "\\", 0, 10, "2 petali. Una prova di Forza di volontà (P), difficoltà 20, supera l'ostacolo", 
                  "\\", 0, "\\", "Lo spazio tra le due superfici è oscurato a tentativi magici di spionaggio, fino a 5 ore.", 
                  callback);
    },
    function(callback) {
      magieCreate("Scrutare", "\\", 
                  "pratica_magica", 0, 18, "4 petali", 
                  "\\", 0, "\\", "Osserva attraverso un portale percettivo un luogo familiare.", 
                  callback);
    },
    function(callback) {
      magieCreate("Compresenza", "\\", 
                  "\\", 0, 15, "2 petali", 
                  "\\", 0, "\\", "Trasferisce un oggetto da un corpo all'altro", 
                  callback);
    },
    function(callback) {
      magieCreate("Proiezione semplice", "\\", 
                  "pratica_magica", 16, 15, "1 petalo. 2 minuti di preparazione", 
                  "\\", 0, "\\", "Crea una proiezione impalpabile del tuo corpo. La proiezione è impalpabile e può essere controllata come se fosse uno dei propri corpi gemini, ma richiede che gli altri corpi siano a riposo (o in Coscienza condivisa). La proiezione non può lanciare magie. La proiezione ha 2 PF, nel caso in cui dovesse venire attaccata e dissolta effettua una prova variabile di Sopportazione del dolore (F) per non avere effetti collaterali.", 
                  callback);
    },
    function(callback) {
      magieCreate("Proiezione complessa", "\\", 
                  "pratica_magica", 19, 25, "4 petali. 5 minuti di preparazione", 
                  "\\", 0, "\\", "Crea una proiezione impalpabile del tuo corpo. La proiezione è impalpabile e può essere controllata liberamente, contemporaneamente agli altri corpi. La proiezione può effettuare ogni tipo di magia non offensiva. La proiezione ha 50 PF.", 
                  callback);
    },
    function(callback) {
      magieCreate("Proiezione libera", "\\", 
                  "pratica_magica", 28, 25, "7 petali. 10 minuti di preparazione", 
                  "\\", 0, "\\", "Crea una proiezione impalpabile del tuo corpo. La proiezione è impalpabile e può essere controllata liberamente, contemporaneamente agli altri corpi. La proiezione può effettuare magie come se fosse un ulteriore corpo e attraversare pareti e altre persone. La proiezione ha 350 PF, ma attraversare elementi solidi reca danno alla proiezione.", 
                  callback);
    },
    function(callback) {
      magieCreate("Crea polvere della fretta", "Se non conservata adeguatamente la Polvere della Fretta decade in 5 giorni.", 
                  "\\", 0, 50, "5 petali. 4 ore di preparazione", 
                  "\\", 0, "\\", "Tramuta della normale sabbia o materiale simile in Polvere della Fretta. Una sessione di tramutazione genera 10 utilizzi di Polvere della Fretta.", 
                  callback);
    },
    function(callback) {
      magieCreate("Tributo all'oltremondo", "\\", 
                  "\\", 0, 1, "4 petali. 1 minuto di preparazione. Trasferisci un oggetto all'Oltremondo Gemini", 
                  "mana", 0, "\\", "A seconda del valore universale e del significato dell’oggetto trasferito, è possibile ripristinare in questo modo una percentuale di mana.", 
                  callback);
    },
    function(callback) {
      magieCreate("Chiavi di Majra Tat", "\\", 
                  "intuito_di_razza", 22, 100, "7 petali. Fino a 12 ore di preparazione. Trasferisci un oggetto all'Oltremondo Gemini", 
                  "\\", 0, "\\", "Accedi a una versione dell’Oltremondo confusionaria e instabile, che si sviluppa non solo nello spazio ma anche nel tempo passato e futuro.", 
                  callback);
    },
    function(callback) {
      magieCreate("Eterna danza di Sulaiman e Raqshi", "Esibisciti in un’incessabile e frenetica danza (fa riferimento all’episodio sacro di Sulaiman e Raqshi).", 
                  "coordinazione", 0, 1, "4 petali. 10 minuti di preparazione. La performance deve essere sensata", 
                  "mana", 0, "\\", "A seconda della passione e del coinvolgimento nella performance (anche da parte degli astanti) questa magia può ripristinare parzialmente o completamente il proprio mana, fino al 130%.", 
                  callback);
    },
    function(callback) {
      magieCreate("Lezione sacra", "Chiedi consiglio alla Dea Zahira sfogliando il suo testo sacro", 
                  "connessione_divina", 0, 40, "1 petalo. Fino a 1 ora di preparazione. Sfoglia li Libro di Zahira", 
                  "\\", 0, "\\", "Questa magia è indicata per la ricerca di petali, ma si manifesta in modo criptico", 
                  callback);
    },
    function(callback) {
      magieCreate("Arsenale", "Crea un'arma temporanea che si materializza nella mano", 
                  "pratica_magica", 20, 15, "\\", 
                  "\\", 0, "\\", "Crea una di queste armi: Spada corta, Scudo da braccio, Balestra, Cannone da braccio", 
                  callback);
    },
    function(callback) {
      magieCreate("Difesa impenetrabile", "\\", 
                  "\\", 0, 8, "\\", 
                  "CA", 2, "\\", "Un Artefice guadagna +2 CA per ogni 20% di mana.", 
                  callback);
    },
    function(callback) {
      magieCreate("Ricostruire organismi", "\\", 
                  "\\", 0, 10, "Tiro di pragmatica e di pratica magica per calcolare la guarigione", 
                  "forza", 2, "\\", "Cura un alleato ferito. La cura equivale al tiro di Pragmatica (I) sommato al tiro di Pratica Magica (P) Un alleato curato in questo modo ottiene +2 a tutti i tiri di FORZA durante il suo prossimo round.", 
                  callback);
    },
    function(callback) {
      magieCreate("Prigione di cristallo", "Questa magia può essere lanciata in un determinato luogo come trappola ad attivazione ritardata", 
                  "\\", 0, 25, "\\", 
                  "\\", 0, "\\", "Un avversario viene immobilizzato in una coltre di cristalli che permane per 3 round. Per liberarsi occorre superare una prova Difficile di Forza Bruta (F). Nella Prigione di cristallo l’avversario non può muoversi se non per liberarsi da essa. Un attacco riuscito da parte di un alleato rompe automaticamente i cristalli.", 
                  callback);
    },
    function(callback) {
      magieCreate("Dono dell'artefice", "Un'arma viene incantata con magia celeste", 
                  "\\", 0, 5, "\\", 
                  "\\", 0, "\\", "Aumenta enormemente la resistenza dell'arma, che viene resa pressoché indistruttibile", 
                  callback);
    },
    function(callback) {
      magieCreate("Scansione", "Analizza l'ambiente circostante o il campo di battaglia", 
                  "\\", 0, 5, "\\", 
                  "tattica", 6, "\\", "Ottieni un bonus temporaneo di +6 Tattica. Nota eventuali debolezze o punti di forza nel contesto.", 
                  callback);
    },
    function(callback) {
      magieCreate("Fabbricare da zero oggetti piccoli", "\\", 
                  "\\", 0, 12, "1 round completo", 
                  "\\", 0, "\\", "Fabbrica o ripara oggetti piccoli. Gli oggetti hanno dettagli in vetro opaco e sono facilmente riconoscibili come fabbricazioni, ma sono perfettamente funzionali.", 
                  callback);
    },
    function(callback) {
      magieCreate("Fabbricare da zero oggetti medi", "\\", 
                  "pratica_magica", 18, 16, "2 round completi", 
                  "\\", 0, "\\", "Fabbrica o ripara oggetti medi. Gli oggetti hanno dettagli in vetro opaco e sono facilmente riconoscibili come fabbricazioni, ma sono perfettamente funzionali.", 
                  callback);
    },
    function(callback) {
      magieCreate("Fabbricare da zero oggetti grandi", "Questi costi valgono anche per oggetti complessi, offensivi o in serie", 
                  "pratica_magica", 23, 20, "2 minuti", 
                  "\\", 0, "\\", "Fabbrica o ripara oggetti grandi. Gli oggetti hanno dettagli in vetro opaco e sono facilmente riconoscibili come fabbricazioni, ma sono perfettamente funzionali.", 
                  callback);
    },
    function(callback) {
      magieCreate("Fabbricare con componente materiale", "Come Fabbricare da zero, ma richiede essere provvisti del materiale giusto per poter realizzare uno specifico oggetto e il costo in mana e la durata di cast sono ridotte della metà.", 
                  "\\", 0, 0, "\\", 
                  "\\", 0, "\\", "", 
                  callback);
    },
    function(callback) {
      magieCreate("Disassemblare", "\\", 
                  "\\", 0, 0, "Decostruisci un oggetto che hai recentemente fabbricato da zero, riannettendolo a te sotto forma di cristallo. L’oggetto non deve essere stato manomesso né aver subito urti.", 
                  "\\", 0, "\\", "Recuperi metà del mana utilizzato per la fabbricazione dell'oggetto disassemblato", 
                  callback);
    },
    function(callback) {
      magieCreate("Eureka", "È possibile effettuare questa magia senza specificare qualità o dettagli. In questo caso l’invenzione scoperta sarà random e dipendente dalla sola prova di Pragmatica. È possibile aggiungere altri dettagli all’invenzione che si sta cercando di produrre per un effetto più favorevole.", 
                  "pragmatica", 0, 25, "30 minuti per la preparazione, 24-48 ore per l'effetto. Scegli le qualità della prossima invenzione di natura magica:  Combattimento / Versatile;  Dimensioni piccole / medie / grandi; Materiale duro / Materiale morbido  Effetto permanente / Ad attivazione", 
                  "\\", 0, "\\", "Ottieni l’idea per un’invenzione quanto più possibile simile alle qualità scelte (varia a seconda della prova di Pragmatica).  Magie di Fabbricazione relative all’invenzione scoperta non richiedono prove di Pratica Magica (P)", 
                  callback);
    },
    function(callback) {
      magieCreate("Golem", "\\", 
                  "\\", 0, 15, "1 ora per la preparazione", 
                  "\\", 0, "\\", "Genera un organismo animato di dimensioni ridotte (non più di 80 cm di altezza) al tuo servizio. Può comunicare con te ed è capace di eseguire uno o due comandi semplici. Dopo 24 ore si frantuma a meno che non sia speso 15% mana per tenerlo attivo.", 
                  callback);
    },
    function(callback) {
      magieCreate("Analisi strutturale", "\\", 
                  "pragmatica", 0, 0, "fino a 1 ora per la preparazione", 
                  "\\", 0, "\\", "Analizza un oggetto o un essere vivente nella sua struttura e conformazione", 
                  callback);
    },
    function(callback) {
      magieCreate("Analisi mentale", "\\", 
                  "pratica_magica", 0, 0, "fino a 1 ora per la preparazione", 
                  "\\", 0, "\\", "Analizza un oggetto o un essere vivente nella sua struttura e conformazione", 
                  callback);
    },
    function(callback) {
      magieCreate("Incapsulare magia", "\\", 
                  "pratica_magica", 0, 30, "fino a 3 ore per la preparazione", 
                  "\\", 0, "\\", "Permette di conservare in una capsula artificiale sigillata e resistente una magia (propria o altrui). Questa magia può essere utilizzata per incantare armi o oggetti di qualsiasi tipo (come se fossero la capsula della magia scelta). Il mana richiesto è di 30% + il mana utilizzato da te o un tuo alleato per praticare la magia. Richiede una prova variabile di Pratica Magica (P)", 
                  callback);
    },
    function(callback) {
      magieCreate("Cancerizzazione", "\\", 
                  "pratica_magica", 14, 15, "Componente materiale: laccio di pelle animale", 
                  "\\", 0, "1d8", "+1d8 al prossimo attacco. L'avversario colpito effettua una prova di Sopportazione del dolore (F) (CD Media). Se la prova non viene superata, nel corso dei turni successivi, la zona colpita decade rapidamente in cancrena.", 
                  callback);
    },
    function(callback) {
      magieCreate("Evoca spirito dell'avvoltoio dei valorosi", "\\", 
                  "empatia", 16, 35, "componente materiale: arma macchiata da sangue nemico", 
                  "\\", 0, "\\", "Evoca uno spirito affine a uno dei propri spiriti guida", 
                  callback);
    },
    function(callback) {
      magieCreate("Evoca spirito dell'avvoltoio reietto", "\\", 
                  "empatia", 16, 35, "componente materiale: pelle animale", 
                  "\\", 0, "\\", "Evoca uno spirito affine a uno dei propri spiriti guida", 
                  callback);
    },
    function(callback) {
      magieCreate("Evoca spirito dell'eremita di Motu Kaora", "\\", 
                  "empatia", 16, 35, "componente materiale: pelle animale", 
                  "\\", 0, "\\", "Evoca uno spirito affine a uno dei propri spiriti guida", 
                  callback);
                },
    function(callback) {
      magieCreate("Forma del Condor", "\\", 
                  "\\", 0, 25, "componente materiale: una manciata di penne di volatile. 2 round di preparazione", 
                  "\\", 0, "\\", "Spogliato di ogni elemento artificiale, il tuo corpo si trasforma in quello di un Condor delle dimensioni di un metro. Può sferrare un attacco con artigli e con il becco per un totale di 3d8 + 10. Le prove di Coordinazione (M) e di Percezione (M) (visiva) hanno un bonus di +5. Dopo aver subito 25 danni, la forma viene automaticamente interrotta. Con prove variabili di Istinto animale (F) o Empatia (P) è possibile comunicare con altri volatili.", 
                  callback);
    },
    function(callback) {
      magieCreate("Occhio rapace", "\\", 
                  "\\", 0, 10, "componente materiale: una penna di volatile", 
                  "precisione", 0, "1d8", "+1d8 Precisione al prossimo attacco", 
                  callback);
    },
    function(callback) {
      magieCreate("Ali nere", "\\", 
                  "pratica_magica", 14, 15, "componente materiale: una piuma animale", 
                  "\\", 0, "\\", "Spuntano in corrispondenza delle spalle un paio di ali proporzionate.", 
                  callback);
    },
    function(callback) {
      magieCreate("Memoria delle ossa", "\\", 
                  "\\", 0, 100, "componente materiale: ossa animali. 2 ore di preparazione", 
                  "\\", 0, "\\", "Risveglia le forze di uno spirito consumandone le ossa (sia morto recentemente che anticamente). Nel corso delle successive 12 ore alcuni poteri della creatura consumata e memorie della sua vita si risveglieranno in te. Non è possibile conservare contemporaneamente in sè più di una 'memoria'. Richiede una prova variabile a seconda dello spirito assimilato ", 
                  callback);
    },
    function(callback) {
      magieCreate("Eredità di Adhas Sto Shasil", "\\", 
                  "\\", 0, 7, "\\", 
                  "\\", 0, "\\", "Acquisisci estrema resistenza al caldo, la tua pelle diventa scura e ardente. Il tuo prossimo attacco riuscito dopo l’attivazione infligge 15 danni aggiuntivi e ustiona l’avversario (non più di una volta per combattimento). Durante l’attivazione puoi evocare un Wurm delle Sabbie di Grandi dimensioni che divora il territorio circostante (non più di una volta al giorno). Il controllo di questa bestia richiede una prova variabile di Empatia (P) a seconda della complessità del comando. Dopo un minuto dall’evocazione, la bestia si dissolve. Durante l’attivazione inoltre: +5 a Prestanza (F), Istinto animale (F) e Forza di volontà (P)",
                  callback);
    },
    function(callback) {
      magieCreate("Richiamo degli spiriti", "\\", 
                  "connessione_divina", 0, 40, "Componente materiale: variabile. 2 minuti di preparazione", 
                  "\\", 0, "\\", "Propizia l'incontro con uno o più spiriti",
                  callback);
    },
    function(callback) {
      magieCreate("Nulla è sprecato", "\\", 
                  "pratica_magica", 15, 10, "Componente materiale: ossa animali. 5 minuti di preparazione", 
                  "pf", 0, "\\", "A seconda della quantità di ossa consumate, viene ripristinata una quantità di PF a te o a un alleato, fino a 50 PF. Applicando la magia su di te, questa può ripristinare fino a 35% di mana al posto di PF.",
                  callback);
    },
    function(callback) {
      magieCreate("Presagio di morte", "\\", 
                  "sesto_senso", 0, 30, "Componente materiale: sangue animale. 20 minuti di preparazione", 
                  "\\", 0, "\\", "Intercedi con spiriti potenti per ottenere divinazioni relative alla morte.",
                  callback);
    },
    function(callback) {
      magieCreate("Stomaco di ferro_elettrochimica", "\\", 
                  "istinto_animale", 0, 5, "Componente materiale: un pizzico di sale", 
                  "elettrochimica", 6, "\\", "Ottieni +6 a ogni prova di Elettrochimica (F) o Sopportazione del dolore (F) che riguardi la sopportazione di sostanze velenose/tossiche per le prossime 2 ore. Sei immune fino al giorno successivo da ogni tipo di intossicazione alimentare.",
                  callback);
    },
    function(callback) {
      magieCreate("Stomaco di ferro_sopportazione_del_dolore", "\\", 
                  "istinto_animale", 0, 5, "Componente materiale: un pizzico di sale", 
                  "sopportazione_del_dolore", 6, "\\", "Ottieni +6 a ogni prova di Elettrochimica (F) o Sopportazione del dolore (F) che riguardi la sopportazione di sostanze velenose/tossiche per le prossime 2 ore. Sei immune fino al giorno successivo da ogni tipo di intossicazione alimentare.",
                  callback);
    },
    function(callback) {
      magieCreate("Presagio del raccolto", "\\", 
                  "connessione_divina", 0, 10, "Componente materiale: frutta acerba. 10 minuti di preparazione", 
                  "\\", 0, "\\", "Ottieni informazioni sul Raccolto degli Spiriti, la fase stagionale di nascita ed emissione di nuovi spiriti e remissione di spiriti vicini alla propria fine. Il Vento del Raccolto è un fenomeno ampio e potente e può coinvolgere qualsiasi creatura (animali, umani, satiri e ogni razza) risvegliando e manifestando il suo spirito – o manifestando lo spirito di oggetti inanimati.",
                  callback);
    },
    ],
        // optional callback
        cb);
}*/
/*
function massMissioniCreate(cb) {
  async.series([
    function(callback) {
      missioniCreate("Lascia Kin Resu", "L’isola ti sta stretta. Il desiderio di partire è forte.", callback);
    },
    function(callback) {
      missioniCreate("Impara a praticare una magia", "Il mondo pullula di dèi potenti e creature formidabili: le tue potenzialità sono inesplorate", callback);
    },
    function(callback) {
      missioniCreate("Scopri il contenuto dei messaggi criptati dell''archivio Yon'", "Biglie di vetro avvolte in codici incomprensibili: qual è il loro significato?", callback);
    },
    ],
        // optional callback
        cb);
}*/

// Async call
async.series([
  massBonusCreate
    /*massAttacchiCreate,
    
    massAbilitaCreate
   ,
    massTatticheCreate,
    massInventarioCreate,
    massMissioniCreate
    massMagieCreate*/
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Done');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
