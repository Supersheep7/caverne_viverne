
const Attacchi = require("../models/attacchi");
const async = require("async");

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