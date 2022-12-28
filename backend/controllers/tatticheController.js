
const Tattiche = require("../models/tattiche");
const async = require("async");

exports.tatticheList = function(req, res, next) {
    Tattiche.find()
    .exec(function (err, pg) {
       if (err) {
         return next(err);
       }
     res.send(pg);
       //Successful, so render
     }
     );
     
 }