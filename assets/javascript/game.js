var wordList = [
'childlike',
'curtain',
'freeze',
'skate',
'friends',
'bashful',
'craven',
'agreeable',
'home',
'ragged',
'crow',
'optimal',
'fireman',
'nebulous',
'pray',
'chunky',
'interest',
'squirrel',
'spooky',
'ancient',
'mammoth',
'calendar',
'vagabond',
'geese',
'chip',
'throw',
'plucky',
'exclusive',
'materialistic',
'coordinated',
'magenta',
'temporary',
'mixed',
'kittens',
'attention',
'abundant',
'juicy',
'simplistic',
'lean',
'scarecrow',
'mysterious',
'scarecrow',
'grape',
'childlike',
'assorted',
'necessary',
'lunchroom',
'toothpaste',
'clock',
'zipper',
'banana'
];

(function(){
    var game = {
        init: function() {
            this.matchingArr = [];
            this.nonMatchingArr = [];
            guessedArr = [];
            correctGuessesArr = [];
            indicesArr = [];
            guessCt = 1;
            wins = 0;
            loses = 0;
            this.nonMatchEl = document.getElementById('non-matching');
            wordToGuessEl = document.getElementById('word-to-guess');
            spanEl = document.createElement('span');
            totalGuessesEl = document.getElementById('total-guesses');
            winsEl = document.getElementById('wins');
            losesEl = document.getElementById('loses');
            this.setup();
            this.listener(); // start listening for keyup events
        },
        play: function(letter) {
            guessedArr.push(this.letter);
            totalGuessesEl.innerHTML = guessCt;
            // more than one instance of the letter?
            console.log(this.randomWord + '--' + letter)
            indicesArr = this.indexesOf(this.randomWord, letter);
            guessCt++;
            if (indicesArr.length) { // has one or more letters in word
                indicesArr.map(function(x){
                    thisSpan = spanEl.cloneNode(true);
                    thisSpan.innerHTML = letter;
                    wordToGuessEl.replaceChild(thisSpan, wordToGuessEl.childNodes[x]);
                    correctGuessesArr[x] = letter;
                });
                correctGuess = correctGuessesArr.join('');
                if (correctGuess == this.randomWord) {
                    var w = ++wins;
                    winsEl.innerHTML = w;
                    var newGameWin = confirm('GAME OVER! \r\nYOU WIN! Congrats, mi amigo. \r\n\r\n Play again?');
                    if (newGameWin) this.reset();
                }
            } else { // letter not in word 
                if (this.nonMatchingArr.indexOf(letter) > -1){
                } else {
                    p = spanEl.cloneNode(true);
                    p.innerHTML = letter;                
                    this.nonMatchEl.appendChild(p);
                    this.nonMatchingArr.push(letter);
                }
            }

            // console.log('this.nonMatchingArr.length: ' +this.nonMatchingArr.length);
            if (this.nonMatchingArr.length > 4) {
                var newGameLose = confirm('GAME OVER! \r\nOh no, you lose! \r\n\r\n Play again?');
                var l = ++loses;
                losesEl.innerHTML = l;
                if (newGameLose) this.reset();
            }
        },
        listener: function(){
            var _this = this;
            document.addEventListener('keyup', function(event){ 
                var char = String.fromCharCode(event.keyCode);
                var isAlpha = char.match(/[a-zA-Z]/g);
                this.letter = char.toLowerCase();
                if (isAlpha) {
                    var play = new _this.play(this.letter);
                    //_this.play() ;
                }
            });
        },
        setup: function() {
            this.randomWord = wordList[Math.floor(Math.random() * wordList.length)];
            
            console.log('new word: ' + this.randomWord);
            
            for (var x = 0; x < this.randomWord.length; x++) {
                p = spanEl.cloneNode(true);
                p.innerHTML = '&nbsp;';
                wordToGuessEl.appendChild(p);
            }
        },
        reset: function(){
            while (wordToGuessEl.firstChild) { // empty node
                wordToGuessEl.removeChild(wordToGuessEl.firstChild);
            }
            while (this.nonMatchEl.firstChild) { // empty node
                this.nonMatchEl.removeChild(this.nonMatchEl.firstChild);
            }
            totalGuessesEl.innerHTML = '';
            this.init();
        },
        indexesOf: function(string, char) { // helper function
            var indices = [];
            console.log(string + '  === ' + char);
            for(var i=0; i < string.length;i++) {
                if (string[i] === char) indices.push(i);
            }
            return indices;
        }
    };
    game.init();
    
})();

