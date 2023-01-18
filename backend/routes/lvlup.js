var express = require('express');
var router = express.Router();
var path = require('path')
const { body, validationResult } = require("express-validator");
const bodyParser = require('body-parser');

const Abilita = require('../models/abilita_innate')
const Attacco = require('../models/attacchi')
const Bonus = require('../models/bonus')
const Inventario = require('../models/inventario')
const Magia = require('../models/magie')
const Missione = require('../models/missioni')
const Personaggio = require('../models/personaggio')
const Tattica = require('../models/tattiche')

router.use(bodyParser.text());

router.post("/abilita_innate", 
    body("nome").trim().isLength( {min: 1} ).escape(),
    body("summary").trim().isLength( {min: 1} ).escape(),
    body("skill").trim().isLength( {min: 1} ).escape(),
    body("bonus").trim().isLength( {min: 1} ).escape(),
    (req, res) => {
    console.log(req.body.personaggio)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
        const {nome, summary, skill, bonus, personaggio} = req.body
        Abilita.findOne({ nome: nome }, (err, data) => {
            if (err) {
                console.log('User.js post error: ', err)
            } 
            else if (data) {
                res.status(210);
                res.end()
            }
            else {
                const newAbilita = new Abilita({
                    nome: nome,
                    summary: summary,
                    modificatore: {
                        skill: skill,
                        bonus: bonus
                    }
                })
                newAbilita.save((err, saved) => {
                    if (err) return res.json(err)
                    res.json(saved)
                })

                personaggio.forEach( function(pg) {
                    Personaggio.findOneAndUpdate({nome: pg}, {"$push": {"abilita_innate": nome}}, function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(success);
                        }
                    })
                })

            }
        });
    }
});

router.post("/attacchi", 
    body("nome").trim().isLength( {min: 1} ).escape(),
    body("summary").trim().isLength( {min: 1} ).escape(),
    body("check").trim().isLength( {min: 1} ).escape(),
    body("danni").trim().isLength( {min: 1} ).escape(),
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
        const {nome, summary, check, danni, personaggio} = req.body
        Attacco.findOne({ nome: nome }, (err, data) => {
            if (err) {
                console.log('User.js post error: ', err)
            } 
            else if (data) {
                res.status(210);
                res.end()
            }
            else {
                const newAttacco = new Attacco({
                    nome: nome,
                    summary: summary,
                    check: check,
                    effetto: {
                        danni: danni
                    }
                })
                newAttacco.save((err, saved) => {
                    if (err) return res.json(err)
                    res.json(saved)
                })
                personaggio.forEach( function(pg) {
                    Personaggio.findOneAndUpdate({nome: pg}, {"$push": {"attacchi": nome}}, function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(success);
                        }
                    })
                })
            }
        });
    }
});

router.post("/bonus", 
    body("nome").trim().isLength( {min: 1} ).escape(),
    body("summary").trim().isLength( {min: 1} ).escape(),
    body("skill").trim().isLength( {min: 1} ).escape(),
    body("bonus").trim().isLength( {min: 1} ).escape(),
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        const {nome, summary, skill, bonus, personaggio} = req.body
        Bonus.findOne({ nome: nome }, (err, data) => {
            if (err) {
                console.log('User.js post error: ', err)
            } 
            else if (data) {
                res.status(210);
                res.end()
            }
            else {
                const newBonus = new Bonus({
                    nome: nome,
                    summary: summary,
                    modificatore: {
                        skill: skill,
                        bonus: bonus
                    }
                })
                newBonus.save((err, saved) => {
                    if (err) return res.json(err)
                    res.json(saved)
                })
                personaggio.forEach( function(pg) {
                    Personaggio.findOneAndUpdate({nome: pg}, {"$push": {"bonus": nome}}, function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(success);
                        }
                    })
                })
            }
        });
    }
});

router.post("/inventario",
    body("nome").trim().isLength( {min: 1} ).escape(),
    body("summary").trim().isLength( {min: 1} ).escape(),
    body("skill").trim().isLength( {min: 1} ).escape(),
    body("bonus").trim().isLength( {min: 1} ).escape(),
    body("magia").trim().isLength( {min: 1} ).escape(),
    body("quantity").trim().isLength( {min: 1} ).escape(),
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).end()
    }
    else {
        const {nome, summary, skill, bonus, magia, personaggio, quantity} = req.body
        Inventario.findOne({ nome: nome }, (err, data) => {
            if (err) {
                console.log('User.js post error: ', err)
            } 
            else if (data) {
                res.status(210);
                res.end()
            }
            else {
                const newInventario = new Inventario({
                    nome: nome,
                    summary: summary,
                    modificatore: {
                        skill: skill,
                        bonus: bonus
                    },
                    magia: magia
                })
                newInventario.save((err, saved) => {
                    if (err) return res.json(err)
                    res.json(saved)
                })
                personaggio.forEach( function(pg) {
                    Personaggio.findOneAndUpdate({nome: pg}, {"$push": {"inventario": {nome: nome, quantita: quantity}}}, function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(success);
                        }
                    })
                })
            }
        });
    }
});

router.post("/magie", 
    body("nome").trim().isLength( {min: 1} ).escape(),
    body("summary").trim().isLength( {min: 1} ).escape(),
    body("mana").trim().isLength( {min: 1} ).escape(),
    body("skill").trim().isLength( {min: 1} ).escape(),
    body("cd").trim().isLength( {min: 1} ).escape(),
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
        const {nome, summary, mana, skill, cd, personaggio} = req.body
        Magia.findOne({ nome: nome }, (err, data) => {
            if (err) {
                console.log('User.js post error: ', err)
            } 
            else if (data) {
                res.status(210);
                res.end()
            }
            else {
                const newMagia = new Magia({
                    nome: nome,
                    summary: summary,
                    costo: {
                        skill: skill,
                        cd: cd,
                        mana: mana
                    }
                })
                newMagia.save((err, saved) => {
                    if (err) return res.json(err)
                    res.json(saved)
                })
                personaggio.forEach( function(pg) {
                    Personaggio.findOneAndUpdate({nome: pg}, {"$push": {"magie": nome}}, function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(success);
                        }
                    })
                })
            }
        });
    }
});

router.post("/missioni", 
    body("nome").trim().isLength( {min: 1} ).escape(),
    body("summary").trim().isLength( {min: 1} ).escape(),
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
        const {nome, summary, personaggio} = req.body
        Missione.findOne({ nome: nome }, (err, data) => {
            if (err) {
                console.log('User.js post error: ', err)
            } 
            else if (data) {
                res.status(210);
                res.end()
            }
            else {
                const newMissione = new Missione({
                    nome: nome,
                    summary: summary
                })
                newMissione.save((err, saved) => {
                    if (err) return res.json(err)
                    res.json(saved)
                })
                personaggio.forEach( function(pg) {
                    Personaggio.findOneAndUpdate({nome: pg}, {"$push": {"missioni": nome}}, function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(success);
                        }
                    })
                })
            }
        });
    }
});

router.post("/tattiche",
    body("nome").trim().isLength( {min: 1} ).escape(),
    body("summary").trim().isLength( {min: 1} ).escape(),
    body("check").trim().isLength( {min: 1} ).escape(),
    body("cd").trim().isLength( {min: 1} ).escape(),
    (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else {
        const {nome, summary, check, cd, personaggio} = req.body
        Tattica.findOne({ nome: nome }, (err, data) => {
            if (err) {
                console.log('User.js post error: ', err)
            } 
            else if (data) {
                res.status(210);
                res.end()
            }
            else {
                const newTattica = new Tattica({
                    nome: nome,
                    summary: summary,
                    costo: {
                        check: check,
                        cd: cd
                    }
                })
                newTattica.save((err, saved) => {
                    if (err) return res.json(err)
                    res.json(saved)
                })
                personaggio.forEach( function(pg) {
                    Personaggio.findOneAndUpdate({nome: pg}, {"$push": {"tattiche": nome}}, function (error, success) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(success);
                        }
                    })
                })
            }
        });
    }
});

module.exports = router;
