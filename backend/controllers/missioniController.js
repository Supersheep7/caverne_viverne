const Missioni = require("../models/missioni");

exports.missioniList = function(req, res, next) {
    Missioni.find()
    .exec(function (err, pg) {
       if (err) {
         return next(err);
       }
     res.send(pg);
       //Successful, so render
     }
     );
     
 }