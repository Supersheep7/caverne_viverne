
const Magie = require("../models/magie");

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