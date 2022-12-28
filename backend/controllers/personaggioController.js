
const Personaggio = require("../models/personaggio");
const async = require("async");

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