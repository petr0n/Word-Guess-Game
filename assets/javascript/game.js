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


var game = {
    settings: {
        guessedArr: [],
        incorrectGuessesArr: [],
        correctGuessesArr: [],
        indicesArr: [],
        guessCt: 0,
        wins: 0,
        losses: 0,
        nonMatchEl: document.getElementById('non-matching'),
        wordToGuessEl: document.getElementById('word-to-guess'),
        spanEl: document.createElement('span'),
        totalGuessesEl: document.getElementById('total-guesses'),
        winsEl: document.getElementById('wins'),
        lossesEl: document.getElementById('losses'),
        man: ['noose', 'head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg']
    },
    init: function(){
        s = this.settings;
        var randomWord = wordList[Math.floor(Math.random() * wordList.length)];
        // console.log('new word: ' + randomWord);
        for (var x = 0; x < randomWord.length; x++) {
            var p = s.spanEl.cloneNode(true);
            p.innerHTML = '&nbsp;';
            s.wordToGuessEl.appendChild(p);
        }
        game.listener(randomWord);  
    },
    play: function(randomWord, letter) {
        if (s.guessedArr.indexOf(letter) === -1) {
            s.guessedArr.push(letter);
            s.totalGuessesEl.innerHTML = s.guessedArr.length;
        }
        console.log(randomWord + '--' + letter);
        // get all indexes of the letter
        s.indicesArr = game.indexesOf(randomWord, letter);
        if (s.indicesArr.length) { // has one or more letters in word
            s.indicesArr.map(function(x){
                var thisSpan = s.spanEl.cloneNode(true);
                thisSpan.innerHTML = letter;
                s.wordToGuessEl.replaceChild(thisSpan, s.wordToGuessEl.childNodes[x]);
                s.correctGuessesArr[x] = letter;
            });
            var correctGuess = s.correctGuessesArr.join('');
            // console.log('correctGuess: ' + correctGuess);
            if (correctGuess == randomWord) {
                s.wins++;
                s.winsEl.innerHTML = s.wins;
                
                var youWin = new Audio('assets/audio/you-win.mp3');
                youWin.play();
                // bootstrap modal
                popModal('YOU WIN!','GAME OVER! \r\ Congrats, mi amigo. \r\n\r\n Play again?');
            }
        } else { // letter not in word 
            if (s.incorrectGuessesArr.indexOf(letter) > -1){
            } else {
                var wrongLetter = new Audio('assets/audio/wrong-letter.mp3');
                wrongLetter.play();
                var p = s.spanEl.cloneNode(true);
                p.innerHTML = letter;                
                s.nonMatchEl.appendChild(p);
                s.incorrectGuessesArr.push(letter);
                // make man appear 
                if (s.incorrectGuessesArr.length !== 7){
                    var part = document.getElementsByClassName(s.man[s.incorrectGuessesArr.length-1]);
                    part[0].style.display = "block";
                }
            }
            if (s.incorrectGuessesArr.length > 6) {
                var youLose = new Audio('assets/audio/you-lose.mp3');
                youLose.play();
                popModal('YOU LOSE!','GAME OVER!\r\nOh no, you lose! \r\n\r\n Play again?');
                s.losses++;
                s.lossesEl.innerHTML = s.losses;
            }
        }
    },
    listener: function(randomWord){
        _myListener = function(event){ 
            var char = String.fromCharCode(event.keyCode);
            var isAlpha = char.match(/[a-zA-Z]/g);
            this.letter = char.toLowerCase();
            if (isAlpha) {
                game.play(randomWord, this.letter);
            }
        };
        document.addEventListener('keyup', _myListener, false);
    },
    reset: function(){
        while (s.wordToGuessEl.firstChild) { // empty node
            s.wordToGuessEl.removeChild(s.wordToGuessEl.firstChild);
        }
        while (s.nonMatchEl.firstChild) { // empty node
            s.nonMatchEl.removeChild(s.nonMatchEl.firstChild);
        }
        s.incorrectGuessesArr = [];
        s.totalGuessesEl.innerHTML = '';
        document.removeEventListener('keyup', _myListener, false);
        var manParts = document.getElementById('hangman').childNodes;
        manParts.map(function(x){
            x.style.display = 'none';
        });
    },
    indexesOf: function(string, char) { // helper function
        var indices = [];
        // console.log(string + '  === ' + char);
        for(var i=0; i < string.length;i++) {
            if (string[i] === char) indices.push(i);
        }
        return indices;
    }
};
(function(){
    game.init();
})();

function popModal(title,body){
    myModal = $('#winLoseModal');
    myModal.modal();
    myModal.on('shown.bs.modal', function () {
        document.getElementById('winLoseModalBody').innerHTML = body;
        document.getElementById('winLoseModalTitle').innerHTML = title;
        yesBtn = document.getElementById('play-again');
        yesBtn.addEventListener('click', function(){
            game.reset();
            game.init();
        });
    });
}
