const Bonus = require("../models/bonus");

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
 