var express = require('express');
var router = express.Router();
var path = require('path');
const pgController = require("../controllers/pgController");

/* GET home page. */
router.get("/", function (req, res) {
res.sendFile(path.join(process.env.FRONT + '/public/index.html'))
});

// GET request for one Book.
router.get("/personaggio/:nome", pgController.pgDetail);

module.exports = router;
