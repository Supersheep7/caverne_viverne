
const Personaggio = require("../models/personaggio");

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