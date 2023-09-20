
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

function Wrong({word, guesses}) {
  const characters = [...word]

  const incorrectGuesses = guesses.filter((guess, index) => !characters.includes(guess))

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

function App() {
  const [guesses, setGuesses] = useState([]);
  const [word, setWord] = useState('cheese');

  const handleKeyDown = (event) => {
    const newGuesses = [...guesses, event.key]
    setGuesses(newGuesses)
  }

  return (
    <div tabIndex={0} className="App" onKeyDown={handleKeyDown}>
      <Word word={word} guesses={guesses}/>
      <Wrong word={word} guesses={guesses}/>
    </div>
  );
}

export default App;
