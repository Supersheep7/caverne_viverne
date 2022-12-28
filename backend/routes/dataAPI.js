var express = require("express");
var router = express.Router();
const async = require("async");
const personaggioController = require("../controllers/personaggioController")
const abilitaController = require("../controllers/abilitaController")
const attacchiController = require("../controllers/attacchiController")
const bonusController = require("../controllers/bonusController")
const inventarioController = require("../controllers/inventarioController")
const magieController = require("../controllers/magieController")
const missioniController = require("../controllers/missioniController")
const tatticheController = require("../controllers/tatticheController")

router.get("/personaggio666", personaggioController.personaggioList),
router.get("/abilita666", abilitaController.abilitaList),
router.get("/attacchi666", attacchiController.attacchiList),
router.get("/bonus666", bonusController.bonusList),
router.get("/inventario666", inventarioController.inventarioList),
router.get("/magie666", magieController.magieList),
router.get("/missioni666", missioniController.missioniList),
router.get("/tattiche666", tatticheController.tatticheList)

module.exports = router;