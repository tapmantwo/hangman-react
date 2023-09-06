
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

function App() {
  const [guesses, setGuesses] = useState([]);

  const handleKeyDown = (event) => {
    const newGuesses = [...guesses, event.key]
    setGuesses(newGuesses)
  }

  return (
    <div tabIndex={0} className="App" onKeyDown={handleKeyDown}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React Suckers!
        </a>
      </header>
      <Word word='cheese' guesses={guesses}/>
    </div>
  );
}

export default App;
