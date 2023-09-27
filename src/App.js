
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'

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

function App() {
  const [guesses, setGuesses] = useState([]);
  const [word, setWord] = useState('cheese');
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  
  const handleKeyDown = (event) => {
    const characters = [...word]
    if (characters.includes(event.key)){
      const newGuesses = [...guesses, event.key]
      setGuesses(newGuesses)
    } else if(!incorrectGuesses.includes(event.key)){
      const newIncorrectGuesses = [...incorrectGuesses, event.key]
      setIncorrectGuesses(newIncorrectGuesses)
    }
  }

  return (
    <div tabIndex={0} className="App" onKeyDown={handleKeyDown}>
      <Word word={word} guesses={guesses}/>
      <Wrong word={word} incorrectGuesses={incorrectGuesses}/>
      <Scene word={word} incorrectGuesses={incorrectGuesses}/>
    </div>
  );
}



export default App;
