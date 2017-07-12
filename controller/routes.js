const express = require('express');
const fs = require('fs');
const words = fs.readFileSync('/usr/share/dict/words', 'utf-8').toLowerCase().split('\n');
const router = express.Router();

let randomIndex = Math.floor(Math.random() * words.length);
let randomWord = words[randomIndex];
let wordLetters = randomWord.split('');


let gameLife = 8;
let lettersBucket = [];
let gameWin = true;
let gameLose = true;


router.get('/', function(req, res) {
  res.render('menu');
});

router.get('/game', function(req, res) {
  console.log(wordLetters);
  req.session.wordLetters = wordLetters;
  req.session.gameLife = gameLife;
  req.session.lettersBucket = lettersBucket;
  req.session.gameWin = gameWin;
  req.session.gameLose = gameLose;
  console.log(req.session);
  res.render('index');
});


router.post('/guess', function(req, res){

  res.redirect('/game');
});

module.exports = router;
