
const Inventario = require("../models/inventario");

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
 