//
const express = require('express');
const fs = require('fs');
const words = fs.readFileSync('/usr/share/dict/words', 'utf-8').toLowerCase().split('\n');
const router = express.Router();

let randomIndex = Math.floor(Math.random() * words.length);
let randomWord = words[randomIndex];
let wordLetters = randomWord.split('');
let spaces = wordLetters.length;

console.log(wordLetters);

let guessWord = [];
let gameLife = 8;
let lettersBucket = [];
let gameWin = 0;
let gameLose = 0;

router.get('/', function(req, res) {
  res.render('menu');
});

router.get('/game', function(req, res) {
  req.session.wordLetters = wordLetters;
  req.session.gameLife = gameLife;
  req.session.lettersBucket = lettersBucket;
  req.session.gameWin = gameWin;
  req.session.gameLose = gameLose;
  req.session.guessWord = guessWord;
  req.session.spaces = spaces;
  let gameTags = {
    wordLetters: req.session.wordLetters,
    gameLife: req.session.gameLife,
    lettersBucket: req.session.lettersBucket,
    gameWin: req.session.gameWin,
    gameLose: req.session.gameLose,
    guessWord: req.session.guessWord,
    spaces: req.session.spaces
  };
  if (!req.sessions.wordLetters) {
    let randomWord = words[randomIndex].toUpperCase();
    let wordLetters = randomWord.split('');
    req.session.wordLetters = wordLetters;
    console.log(req.session);
    res.render('index', {gameTags: gameTags});
  } else {
    console.log(req.session);
    res.render('index', {gameTags: gameTags});
  }
});


  console.log(req.session);
  res.render('index');
});


router.post('/guess', function(req, res){

  res.redirect('/game');
});

module.exports = router;
