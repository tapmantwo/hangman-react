import './App.css';
import React, { useState, useEffect } from 'react'
import ConfettiExplosion from 'react-confetti-explosion';


const LOWER_CASE_A = 97;
const LOWER_CASE_Z = 122;

const words = [
  "apple",
  "arrow",
  "beach",
  "bench",
  "bible",
  "bread",
  "brick",
  "brush",
  "chair",
  "child",
  "church",
  "cloud",
  "coast",
  "earth",
  "field",
  "flower",
  "forest",
  "fruit",
  "glass",
  "glove",
  "grape",
  "grass",
  "guide",
  "heart",
  "horse",
  "house",
  "island",
  "knife",
  "lemon",
  "light",
  "market",
  "melon",
  "money",
  "month",
  "mount",
  "mouse",
  "music",
  "night",
  "ocean",
  "paint",
  "paper",
  "phone",
  "plane",
  "plant",
  "plate",
  "puppy",
  "rabbit",
  "river",
  "robot",
  "rocky",
  "salad",
  "shark",
  "shirt",
  "sight",
  "skirt",
  "slope",
  "smile",
  "snake",
  "space",
  "sugar",
  "table",
  "teeth",
  "tiger",
  "title",
  "torch",
  "train",
  "valve",
  "voice",
  "water",
  "wheel",
  "window",
  "woman",
  "world",
  "yacht",
  "zebra"
]
function Word({word, guesses}) {
  const characters = [...word]
  return (
    <div className="word">
      {characters.map((character, index) => {
          const isGuessed = guesses.includes(character)
          if(character === ' ') {
            return (
              <div class="scene scene--space">
                 &nbsp;
              </div>
            )
          } else {
          return (
            <div class="scene scene--card">
              <div key={`word-${index}`} class={`card ${isGuessed ? 'is-flipped' : ''}`}>
                <div class="card__face card__face--front">?</div>
                <div class="card__face card__face--back">
                  {isGuessed ? character : '_'}
                </div>
              </div>
            </div>
          )
          }
      })}
    </div>
  )
}

function Wrong({word, incorrectGuesses}) {
  return (
    <div id = "wrong">
      <ul>
        {incorrectGuesses.map((guess, index) => {
          const isLastGuess = index == incorrectGuesses.length -1
          
              return(
              <li key={`wrong-${index}`}>
              {guess.toUpperCase()}
              {!isLastGuess && ','}
              </li>
              )
        })}
      </ul>
    </div>
  )
}

function Scene({word, incorrectGuesses}) {
  const numOfIncorrectGuesses = incorrectGuesses.length + 1
  const imageUrl = `${process.env.PUBLIC_URL}/${numOfIncorrectGuesses}.jpg`
  return(
    <div id="scene">
      <img src={imageUrl}/>
    </div>
  )
}

const GameStates = {
	Playing: 0,
	Won: 1,
	Lost: 2,
  Start: 3,
  EnterWord: 4,
}

const pickWord = () => {
  const randomWord = Math.floor((Math.random() * words.length - 1));
  const pickedWord = words[randomWord]
  return pickedWord;
  //return 'i love cheese'
}

function App() {
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [word, setWord] = useState(pickWord());
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [gameState, setGameState] = useState(GameStates.Start);

  const checkIfWordIsGuessed = () => {
    for(let i = 0; i < word.length; i++) {
      const character = word[i];
      if (character === ' ') {
        continue;
      }
      
      if(!correctGuesses.includes(character)) {
        return false
      }
    }
    return true  
  }

  const resetGame = () => {
    const newWord = pickWord()
    setCorrectGuesses([])
    setWord(newWord)
    setIncorrectGuesses([])
    setGameState(GameStates.Playing)
  }

  const pickReset = () => {
    setGameState(GameStates.EnterWord);
    setCorrectGuesses([])
    setIncorrectGuesses([])
  }

  const startScreen = () => {
    setGameState(GameStates.Start)
    setCorrectGuesses([])
    setIncorrectGuesses([])
  }

  const startGame = () => {
    setGameState(GameStates.Playing)
    console.log(word)
  }

  const enterWord = () => {
    setGameState(GameStates.EnterWord)
    setWord("")
  }

  useEffect(() => {
    console.log(word)
  }, [word])

  useEffect(() => {
    if(checkIfWordIsGuessed() === true) {
      setGameState(GameStates.Won)
    }
  }, [correctGuesses])

  useEffect(() => {
    const handleKeyDown = (event) => {      
      console.log('key down', gameState)
      if(gameState === GameStates.Playing) {
        const letter = event.key.toLowerCase();
        const charCode = letter.charCodeAt(0);
        if(charCode < LOWER_CASE_A || charCode > LOWER_CASE_Z || letter.length > 1) {
            return
        }
        
        const characters = [...word]
        if (characters.includes(letter)){
          const newGuesses = [...correctGuesses, letter]
          setCorrectGuesses(newGuesses)
        } else if(!incorrectGuesses.includes(letter)){
          const newIncorrectGuesses = [...incorrectGuesses, letter]
          setIncorrectGuesses(newIncorrectGuesses)
          if(newIncorrectGuesses.length === 8) {
            setGameState(GameStates.Lost)
          }
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [correctGuesses, incorrectGuesses, word, gameState]);

  return (
    <>
      <div tabIndex={0} className="App">
        {gameState !== GameStates.Start && gameState !== GameStates.EnterWord && (
          <>
            <Scene word={word} incorrectGuesses={incorrectGuesses}/>
            <Word word={word} guesses={correctGuesses}/>
            <Wrong word={word} incorrectGuesses={incorrectGuesses}/>
          </>
        )}
        {(gameState === GameStates.Won || gameState === GameStates.Lost) && (
          <>
          <div id="reset-button">
            <button onClick={resetGame}>Reset</button>
          </div>
          <div id="pickReset-button">
            <button onClick={pickReset}>Reset Pickword</button>
          </div>
          <div id="startScreen-button">
            <button onClick={startScreen}>Start Screen</button>
          </div>
          </>
        )}
        {gameState === GameStates.Lost && (
        <div>
          You Lost! The answer was {word}
        </div>
        )}
        {gameState === GameStates.Won && (
          <div>
            You Won! The word was {word}
            <div class="confetti"><ConfettiExplosion particleCount={400} force={1} particleSize={40}/></div>
          </div>        
        )}
        {gameState === GameStates.Start && (
          <div class="start"> 
            <h1>Welcome to Hangman! Press the button to start the game.</h1><br></br>
            <div class="button-container">
            <button class="button" onClick={startGame}>Random Word</button> <br></br>
            <button class="button" onClick={enterWord}>Enter a word</button>
            </div>
          </div>
        )}
        {gameState === GameStates.EnterWord && (
          <div class="enterWord">
            <label for="newWord">Please enter a word to be guessed</label>
            <input type="password" value={word} onChange={(e) => setWord(e.target.value)}></input>
            <button onClick={startGame}>Start Game</button>
          </div>
        )}
      </div>
    </>
  );
}


// JOIN THIS ONE https://meet.google.com/otd-tpqf-zqo?authuser=0


export default App;
