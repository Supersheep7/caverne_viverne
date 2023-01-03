
const Attacchi = require("../models/attacchi");

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