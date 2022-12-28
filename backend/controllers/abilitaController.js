
const Abilita = require("../models/abilita_innate");
const async = require("async");

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