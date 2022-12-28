
const Tattiche = require("../models/tattiche");
const Personaggio = require("../models/personaggio");
const Missioni = require("../models/missioni");
const Magie = require("../models/magie");
const Inventario = require("../models/inventario");
const Bonus = require("../models/bonus");
const Attacchi = require("../models/attacchi");
const Abilita = require("../models/abilita_innate");
const async = require("async");

exports.tatticheList = function(req, res, next) {
    Tattiche.find()
    .exec(function (err, detail) {
       if (err) {
         return next(err);
       }
     res.send(detail);
       //Successful, so render
     }
     );
     
 }

exports.personaggioList = function(req, res, next) {
     Personaggio.find()
     .exec(function (err, detail) {
        if (err) {
          return next(err);
        }
      res.send(detail);
        //Successful, so render
      }
      );
    }

exports.missioniList = function(req, res, next) {
        Missioni.find()
        .exec(function (err, detail) {
           if (err) {
             return next(err);
           }
         res.send(detail);
           //Successful, so render
         }
         );
         
     }

exports.magieList = function(req, res, next) {
        Magie.find()
        .exec(function (err, detail) {
           if (err) {
             return next(err);
           }
         res.send(detail);
           //Successful, so render
         }
         );
         
     }

exports.inventarioList = function(req, res, next) {
        Inventario.find()
        .exec(function (err, detail) {
           if (err) {
             return next(err);
           }
         res.send(detail);
           //Successful, so render
         }
         );
         
     }

exports.bonusList = function(req, res, next) {
         Bonus.find()
         .exec(function (err, detail) {
            if (err) {
              return next(err);
            }
          res.send(detail);
            //Successful, so render
          }
          );
          
      }

exports.attacchiList = function(req, res, next) {
        Attacchi.find()
        .exec(function (err, detail) {
           if (err) {
             return next(err);
           }
         res.send(detail);
           //Successful, so render
         }
         );
         
     }

exports.abilitaList = function(req, res, next) {
        Abilita.find()
        .exec(function (err, detail) {
           if (err) {
             return next(err);
           }
         res.send(detail);
           //Successful, so render
         }
         );
         
     }

exports.pgDetail = function(req, res, next) {
    Personaggio.find({"nome": req.params.nome})
        .exec(function (err, detail) {
           if (err) {
             return next(err);
           }
         res.send(...detail);
           //Successful, so render
         }
         );
}