import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'

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
    <div id='word'>
      <ol>
        {characters.map((character, index) => {
          const isGuessed = guesses.includes(character)
          return (
            <li>{isGuessed ? character : '_'}</li>
          )
          })}
      </ol>
    </div>
  )
}

function Wrong({word, incorrectGuesses}) {
  return (
    <div id = "wrong">
      <ul>
        {incorrectGuesses.map((guess, index) => {
          const isLastGuess = index == incorrectGuesses.length -1
          return (
            <li>
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
}


const pickWord = () => {
  const randomWord = Math.floor((Math.random() * words.length - 1));
  const pickedWord = words[randomWord]
  return pickedWord
}

function App() {
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [word, setWord] = useState(pickWord());
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [gameState, setGameState] = useState(GameStates.Playing);
  const checkIfWordIsGuessed = () => {
    for(let i = 0; i < word.length; i++) {
        if(!correctGuesses.includes(word[i])) {
            return false
        }
        
    }
    return true  
  }

  useEffect(() => {
    console.log(word)
  }, [word])

  useEffect(() => {
    if(checkIfWordIsGuessed() === true) {
      setGameState(GameStates.Won)
    }
  }, [correctGuesses])

  const handleKeyDown = (event) => {
    const characters = [...word]
    if (characters.includes(event.key)){
      const newGuesses = [...correctGuesses, event.key]
      setCorrectGuesses(newGuesses)
    } else if(!incorrectGuesses.includes(event.key)){
      const newIncorrectGuesses = [...incorrectGuesses, event.key]
      setIncorrectGuesses(newIncorrectGuesses)
      if(newIncorrectGuesses.length === 8) {
        setGameState(GameStates.Lost)
      }
    }
  }

  return (
    <>
      {gameState === GameStates.Playing && (
        <div tabIndex={0} className="App" onKeyDown={handleKeyDown}>
          <Word word={word} guesses={correctGuesses}/>
          <Wrong word={word} incorrectGuesses={incorrectGuesses}/>
          <Scene word={word} incorrectGuesses={incorrectGuesses}/>
        </div>
      )}
      {gameState === GameStates.Lost && (
        <div>
          You Lost! The word was {word}
        </div>
      )}
      {gameState === GameStates.Won && (
        <div>You Won! The word was {word}</div>
      )}
    </>
  );
}

export default App;
