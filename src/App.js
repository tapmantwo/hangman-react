import './App.css';
import React, { useState, useEffect } from 'react'
import ConfettiExplosion from 'react-confetti-explosion';
import {words} from './words.js'

const LOWER_CASE_A = 97;
const LOWER_CASE_Z = 122;

var losses = 0
var wins = 0

function Word({word, guesses}) {
  const characters = [...word]
  return (
    <div className="word">
      {characters.map((character, index) => {
          const isGuessed = guesses.includes(character.toLowerCase())
          const charCode = character.toLowerCase().charCodeAt(0);
          if(character === ' ') {
            return (
              <div class="scene scene--space">
                 &nbsp;
              </div>
            )
          } else if(charCode > LOWER_CASE_Z || charCode < LOWER_CASE_A){
            return(
              <div class="scene scene--card">
                <div key={`word-${index}`} class={`card`}>
                  <div class="card__face card__face--punctuation">
                    {character}
                  </div>
                </div>
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

function Hint({hint}) {
  return(
    <div id = "hint">
      (Hint: {hint})
    </div>
  )
}

function Score({wins,losses}) {
  return(
    <div>
      <br></br>
      Wins: {wins}<br></br>
      Losses: {losses}
    </div>
  )
}

function Wrong({word, incorrectGuesses}) {
  return (
    <div id = "wrong">
      <ul>
        {incorrectGuesses.map((guess, index) => {
          const isLastGuess = index === incorrectGuesses.length -1
          
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

const pickWord = (usedWord, setUsedWord) => { 
  if ( usedWord.length === words.length) {
    usedWord = []
    setUsedWord([])
  }

  const availableWords = words.filter(word => !usedWord.includes(word.value))
  const randomWord = Math.floor((Math.random() * availableWords.length));
  const pickedWord = availableWords[randomWord]
  setUsedWord([...usedWord, pickedWord.value])
  return pickedWord;
}

function App() {
  const [usedWord, setUsedWord] = useState([]);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [word, setWord] = useState("");
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [gameState, setGameState] = useState(GameStates.Start);


  const checkIfWordIsGuessed = () => {
    if (!word) return false;

    for(let i = 0; i < word.value.length; i++) {
      const character = word.value[i].toLowerCase();
      const charCode = character.charCodeAt(0)
      if (character === ' ') {
        continue;
      }

      if (charCode > LOWER_CASE_Z || charCode < LOWER_CASE_A) {
        continue;
      }
      
      if(!correctGuesses.includes(character)) {
        return false
      }
    }
    return true  
  }

  const startGame = () => {
    setCorrectGuesses([])
    setIncorrectGuesses([])
    setGameState(GameStates.Playing)
  }

  const startRandomWordGame = () => {
    const newWord = pickWord(usedWord, setUsedWord);
    setWord(newWord)
    startGame()
  }

  const enterWord = () => {
    setGameState(GameStates.EnterWord)
    setWord("")
  }

  useEffect(() => {
    if(checkIfWordIsGuessed() === true) {
      setGameState(GameStates.Won)
      wins = wins + 1
    }
  }, [correctGuesses])

  useEffect(() => {
    const handleKeyDown = (event) => {      

      if(gameState === GameStates.Playing) {
        const letter = event.key.toLowerCase();
        const charCode = letter.charCodeAt(0);
        if(charCode < LOWER_CASE_A || charCode > LOWER_CASE_Z || letter.length > 1) {
            return
        }
        
        const characters = [...word.value.toLowerCase()]
        if (characters.includes(letter)){
          const newGuesses = [...correctGuesses, letter]
          setCorrectGuesses(newGuesses)
        } else if(!incorrectGuesses.includes(letter)){
          const newIncorrectGuesses = [...incorrectGuesses, letter]
          setIncorrectGuesses(newIncorrectGuesses)
          if(newIncorrectGuesses.length === 7) {
            setGameState(GameStates.Lost)
            losses = losses + 1
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
          <div class="game">
            <Scene word={word.value} incorrectGuesses={incorrectGuesses}/>
            <Word word={word.value} guesses={correctGuesses}/>
            <Hint hint={word.hint}/>
            <Wrong word={word.value} incorrectGuesses={incorrectGuesses}/>
            <Score wins={wins} losses={losses}/>
          </div>
        )}
        {(gameState === GameStates.Won || gameState === GameStates.Lost) && (
          <>
          <div class="button-container">
            <button class="button" onClick={startRandomWordGame}>Random Word</button> <br></br>
            <button class="button" onClick={enterWord}>Enter a word</button>
          </div>
          </>
        )}
        {gameState === GameStates.Lost && (
        <div>
          You Lost! The answer was {word.value} 
        </div>
        )}
        {gameState === GameStates.Won && (
          <div>
            You Won! The word was {word.value}
            <div class="confetti"><ConfettiExplosion particleCount={400} force={1} particleSize={40}/></div>
          </div>       
        )}
        {gameState === GameStates.Start && (
          <div class="start"> 
            <h1>Welcome to Hangman! Press the button to start the game.</h1><br></br>
            <div class="button-container">
            <button class="button" onClick={startRandomWordGame}>Random Word</button> <br></br>
            <button class="button" onClick={enterWord}>Enter a word</button>
            </div>
          </div>
        )}
        {gameState === GameStates.EnterWord && (
          <div class="enterWord">
            <h3>Please enter a word to be guessed</h3>
            <input type="password" value={word.value} onChange={(e) => setWord({value:e.target.value, hint: 'manually inputed'})}></input>
            <div class="button-container">
            <button class="button" onClick={startGame}>Start Game</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;