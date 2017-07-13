const express = require('express');
const fs = require('fs');
const words = fs.readFileSync('/usr/share/dict/words', 'utf-8').toLowerCase().split('\n');
const router = express.Router();

let randomIndex = Math.floor(Math.random() * words.length);   //grabbing a random word located in the './dict/words' folder
let randomWord = words[randomIndex].toUpperCase();            //setting all the characters to be upper case
let wordLetters = randomWord.split('');                       //splitting up the word's characters into individual strings
let spaces = wordLetters.length;                              //counting # of characters in the random word

console.log(wordLetters);

//creating a starting point for our variables

let guessWord = [];
let gameLife = 8;
let lettersBucket = [];
let gameWin = 0;
let gameLose = 0;

let sess;       //making a variable sess so we can use it later




router.get('/', function(req, res){
  res.render('menu');
});

//

router.get('/game', function(req, res){
  sess = req.session;                         //short-handing req.session.____
  sess.wordLetters = wordLetters;
  sess.gameLife = gameLife;
  sess.lettersBucket = lettersBucket;
  sess.gameWin = gameWin;
  sess.gameLose = gameLose;
  sess.guessWord = guessWord;
  sess.spaces = spaces;
  let gameTags = {                            //grouping all of the variables that we had created earlier
    wordLetters: sess.wordLetters,
    gameLife: sess.gameLife,
    lettersBucket: sess.lettersBucket,
    gameWin: sess.gameWin,
    gameLose: sess.gameLose,
    guessWord: sess.guessWord,
    spaces: sess.spaces
  };
  if (!sess.wordLetters) {
    let randomWord = words[randomIndex].toUpperCase();
    let wordLetters = randomWord.split('');
    sess.wordLetters = wordLetters;
    console.log(req.session);
    res.render('index', {gameTags: gameTags});
  } else {
    console.log(req.session);
    res.render('index', {gameTags: gameTags});
  }
});

//check to see if the guess is only once character long, instruct the user if it is more than that

router.post('/guess', function(req, res){
  sess = req.session;
  if (req.body.guess.length > 1) {
    res.send('Please only enter 1 letter at a time');
  }

//validate the guess against the random word and send the guess where it needs to go

  let letterGuess = req.body.guess.toUpperCase();
  if (lettersBucket.includes(letterGuess)) {
    res.send('Letter has already been used!!');
  } else if (wordLetters.includes(letterGuess)) {
    for (var i = 0; i < wordLetters.length; i++) {
      if (letterGuess === wordLetters[i]) {
        guessWord[i] = wordLetters[i];
      }
    }
    lettersBucket.push(letterGuess);
  } else if (!wordLetters.includes(letterGuess)) {
    lettersBucket.push(letterGuess);
    gameLife--;
  }
  if (gameLife === 0) {                         //as soon as the gameLife counter gets to zero, end the game
    gameLose++;
    randomIndex = Math.floor(Math.random() * words.length);
    randomWord = words[randomIndex].toUpperCase();
    wordLetters = randomWord.split('');
    guessWord = [];
    gameLife = 8;
    lettersBucket = [];
    spaces = wordLetters.length;
    sess = req.session;
    sess.wordLetters = wordLetters;
    sess.gameLife = gameLife;
    sess.lettersBucket = lettersBucket;
    sess.guessWord = guessWord;
    sess.spaces = spaces;
  }
if (guessWord.join('') == wordLetters.join('')) {           //if all the letters from the word get filled in, end the game and win!
    gameWin++;
    randomIndex = Math.floor(Math.random() * words.length);
    randomWord = words[randomIndex].toUpperCase();
    wordLetters = randomWord.split('');
    guessWord = [];
    gameLife = 8;
    lettersBucket = [];
    spaces = wordLetters.length;
    sess = req.session;
    sess.wordLetters = wordLetters;
    sess.gameLife = gameLife;
    sess.lettersBucket = lettersBucket;
    sess.guessWord = guessWord;
    sess.spaces = spaces;
  }
  res.redirect('/game');
});

module.exports = router;
