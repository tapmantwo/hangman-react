import './App.css';
import React, { useState, useEffect } from 'react'
import ConfettiExplosion from 'react-confetti-explosion';


const LOWER_CASE_A = 97;
const LOWER_CASE_Z = 122;

var losses = 0
var wins = 0

const words = [
  { value: "Back To The Future", hint: 'Movie'},
  { value: "The Shawshank Redemption", hint: "Movie" },
  { value: "Pulp Fiction", hint: "Movie" },
  { value: "The Godfather", hint: "Movie" },
  { value: "Fight Club", hint: "Movie" },
  { value: "Inception", hint: "Movie" },
  { value: "The Dark Knight", hint: "Movie" },
  { value: "Forrest Gump", hint: "Movie" },
  { value: "The Matrix", hint: "Movie" },
  { value: "Goodfellas", hint: "Movie" },
  { value: "The Lion King", hint: "Movie" },
  { value: "Schindlers List", hint: "Movie" },
  { value: "The Avengers", hint: "Movie" },
  { value: "Back to the Future", hint: "Movie" },
  { value: "Jurassic Park", hint: "Movie" },
  { value: "Interstellar", hint: "Movie" },
  { value: "Gladiator", hint: "Movie" },
  { value: "Braveheart", hint: "Movie" },
  { value: "The Silence of the Lambs", hint: "Movie" },
  { value: "The Sixth Sense", hint: "Movie" },
  { value: "Titanic", hint: "Movie" },
  { value: "The Lord of the Rings The Fellowship of the Ring", hint: "Movie" },
  { value: "Star Wars Episode IV A New Hope", hint: "Movie" },
  { value: "The Breakfast Club", hint: "Movie" },
  { value: "Eternal Sunshine of the Spotless Mind", hint: "Movie" },
  { value: "Inglourious Basterds", hint: "Movie" },
  { value: "The Departed", hint: "Movie" },
  { value: "The Social Network", hint: "Movie" },
  { value: "Casablanca", hint: "Movie" },
  { value: "Gone with the Wind", hint: "Movie" },
  { value: "The Green Mile", hint: "Movie" },
  { value: "The Princess Bride", hint: "Movie" },
  { value: "Shutter Island", hint: "Movie" },
  { value: "The Great Gatsby", hint: "Movie" },
  { value: "The Wizard of Oz", hint: "Movie" },
  { value: "The Godfather Part II", hint: "Movie" },
  { value: "The Dark Knight Rises", hint: "Movie" },
  { value: "Mad Max Fury Road", hint: "Movie" },
  { value: "Blade Runner", hint: "Movie" },
  { value: "The Terminator", hint: "Movie" },
  { value: "Harry Potter and the Philosophers Stone", hint: "Movie" },
  { value: "The Sound of Music", hint: "Movie" },
  { value: "Toy Story", hint: "Movie" },
  { value: "Rocky", hint: "Movie" },
  { value: "The Exorcist", hint: "Movie" },
  { value: "Avatar", hint: "Movie" },
  { value: "Inception", hint: "Movie" },
  { value: "The Pursuit of Happyness", hint: "Movie" },
  { value: "Black Swan", hint: "Movie" },
  { value: "The Grand Budapest Hotel", hint: "Movie" },
  { value: "La La Land", hint: "Movie" },
  { value: "Highway To Hell", hint: 'Song'},
  { value: "Bohemian Rhapsody", hint: "Song"},
  { value: "Imagine", hint: "Song"},
  { value: "Hotel California", hint: "Song"},
  { value: "Shake It Off", hint: "Song"},
  { value: "Hey Jude", hint: "Song"},
  { value: "Thriller", hint: "Song"},
  { value: "Sweet Child o Mine", hint: "Song"},
  { value: "Wonderwall", hint: "Song"},
  { value: "Smells Like Teen Spirit", hint: "Song"},
  { value: "Like a Rolling Stone", hint: "Song"},
  { value: "Uptown Funk", hint: "Song"},
  { value: "Viva la Vida", hint: "Song"},
  { value: "Hallelujah", hint: "Song"},
  { value: "Billie Jean", hint: "Song"},
  { value: "Shape of You", hint: "Song"},
  { value: "Boogie Wonderland", hint: "Song"},
  { value: "Born to Run", hint: "Song"},
  { value: "Sweet Home Alabama", hint: "Song"},
  { value: "Girls Just Want to Have Fun", hint: "Song"},
  { value: "Livin on a Prayer", hint: "Song"},
  { value: "Yesterday", hint: "Song"},
  { value: "I Will Always Love You", hint: "Song"},
  { value: "Stairway to Heaven", hint: "Song"},
  { value: "Dont Stop Believin", hint: "Song"},
  { value: "Imagine Dragons", hint: "Song"},
  { value: "Sweet Caroline", hint: "Song"},
  { value: "Shape of My Heart", hint: "Song"},
  { value: "Wonderful Tonight", hint: "Song"},
  { value: "California Gurls", hint: "Song"},
  { value: "Hit the Road Jack", hint: "Song"},
  { value: "All You Need Is Love", hint: "Song"},
  { value: "Let It Be", hint: "Song"},
  { value: "Hotel Room Service", hint: "Song"},
  { value: "HeartShaped Box", hint: "Song"},
  { value: "Lose Yourself", hint: "Song"},
  { value: "Every Breath You Take", hint: "Song"},
  { value: "I Want to Hold Your Hand", hint: "Song"},
  { value: "Smooth Criminal", hint: "Song"},
  { value: "Piano Man", hint: "Song"},
  { value: "I Will Survive", hint: "Song"},
  { value: "Killing Me Softly with His Song", hint: "Song"},
  { value: "Dont Stop Me Now", hint: "Song"},
  { value: "With or Without You", hint: "Song"},
  { value: "The Sound of Silence", hint: "Song"},
  { value: "Rolling in the Deep", hint: "Song"},
  { value: "Another Brick in the Wall", hint: "Song"},
  { value: "Come Together", hint: "Song"},
  { value: "Sweet Dreams Are Made of This", hint: "Song"},
  { value: "Lets Dance", hint: "Song"},
  { value: "Bridge Over Troubled Water", hint: "Song"},
  { value: "Barbara Streisand", hint: 'Actress'},
  { value: "Meryl Streep", hint: "Actress" },
  { value: "Cate Blanchett", hint: "Actress" },
  { value: "Viola Davis", hint: "Actress" },
  { value: "Charlize Theron", hint: "Actress" },
  { value: "Natalie Portman", hint: "Actress" },
  { value: "Emma Stone", hint: "Actress" },
  { value: "Jennifer Lawrence", hint: "Actress" },
  { value: "Angelina Jolie", hint: "Actress" },
  { value: "Scarlett Johansson", hint: "Actress" },
  { value: "Julia Roberts", hint: "Actress" },
  { value: "Nicole Kidman", hint: "Actress" },
  { value: "Halle Berry", hint: "Actress" },
  { value: "Anne Hathaway", hint: "Actress" },
  { value: "Sandra Bullock", hint: "Actress" },
  { value: "Mila Kunis", hint: "Actress" },
  { value: "Reese Witherspoon", hint: "Actress" },
  { value: "Jennifer Aniston", hint: "Actress" },
  { value: "Kate Winslet", hint: "Actress" },
  { value: "Amy Adams", hint: "Actress" },
  { value: "Maggie Smith", hint: "Actress" },
  { value: "Jessica Chastain", hint: "Actress" },
  { value: "Emily Blunt", hint: "Actress" },
  { value: "Rachel McAdams", hint: "Actress" },
  { value: "Zoe Saldana", hint: "Actress" },
  { value: "Gwyneth Paltrow", hint: "Actress" },
  { value: "Michelle Pfeiffer", hint: "Actress" },
  { value: "Jodie Foster", hint: "Actress" },
  { value: "Emma Watson", hint: "Actress" },
  { value: "Diane Keaton", hint: "Actress" },
  { value: "Amanda Seyfried", hint: "Actress" },
  { value: "Helen Mirren", hint: "Actress" },
  { value: "Julianne Moore", hint: "Actress" },
  { value: "Katherine Hepburn", hint: "Actress" },
  { value: "Mila Jovovich", hint: "Actress" },
  { value: "Drew Barrymore", hint: "Actress" },
  { value: "Sharon Stone", hint: "Actress" },
  { value: "Keira Knightley", hint: "Actress" },
  { value: "Robin Wright", hint: "Actress" },
  { value: "Charlize Theron", hint: "Actress" },
  { value: "Sigourney Weaver", hint: "Actress" },
  { value: "Maggie Gyllenhaal", hint: "Actress" },
  { value: "Greta Gerwig", hint: "Actress" },
  { value: "Zendaya", hint: "Actress" },
  { value: "Judy Garland", hint: "Actress" },
  { value: "Lucille Ball", hint: "Actress" },
  { value: "Sophia Loren", hint: "Actress" },
  { value: "Grace Kelly", hint: "Actress" },
  { value: "Doris Day", hint: "Actress" },
  { value: "Elizabeth Taylor", hint: "Actress" },
  { value: "Audrey Hepburn", hint: "Actress" },
  { value: "Tom Hanks", hint: "Actor" },
  { value: "Leonardo DiCaprio", hint: "Actor" },
  { value: "Denzel Washington", hint: "Actor" },
  { value: "Robert De Niro", hint: "Actor" },
  { value: "Brad Pitt", hint: "Actor" },
  { value: "Johnny Depp", hint: "Actor" },
  { value: "Morgan Freeman", hint: "Actor" },
  { value: "Will Smith", hint: "Actor" },
  { value: "Matt Damon", hint: "Actor" },
  { value: "George Clooney", hint: "Actor" },
  { value: "Tom Cruise", hint: "Actor" },
  { value: "Christian Bale", hint: "Actor" },
  { value: "Samuel L. Jackson", hint: "Actor" },
  { value: "Harrison Ford", hint: "Actor" },
  { value: "Al Pacino", hint: "Actor" },
  { value: "Anthony Hopkins", hint: "Actor" },
  { value: "Sean Connery", hint: "Actor" },
  { value: "Gary Oldman", hint: "Actor" },
  { value: "Daniel Day-Lewis", hint: "Actor" },
  { value: "Russell Crowe", hint: "Actor" },
  { value: "Kevin Spacey", hint: "Actor" },
  { value: "Joaquin Phoenix", hint: "Actor" },
  { value: "Edward Norton", hint: "Actor" },
  { value: "Liam Neeson", hint: "Actor" },
  { value: "Chris Hemsworth", hint: "Actor" },
  { value: "Mark Wahlberg", hint: "Actor" },
  { value: "Idris Elba", hint: "Actor" },
  { value: "Ben Affleck", hint: "Actor" },
  { value: "Michael Fassbender", hint: "Actor" },
  { value: "Hugh Jackman", hint: "Actor" },
  { value: "Robert Downey Jr", hint: "Actor" },
  { value: "Keanu Reeves", hint: "Actor" },
  { value: "Ryan Gosling", hint: "Actor" },
  { value: "Tom Hardy", hint: "Actor" },
  { value: "Chris Evans", hint: "Actor" },
  { value: "Benedict Cumberbatch", hint: "Actor" },
  { value: "Jamie Foxx", hint: "Actor" },
  { value: "Jake Gyllenhaal", hint: "Actor" },
  { value: "Will Ferrell", hint: "Actor" },
  { value: "Owen Wilson", hint: "Actor" },
  { value: "Viggo Mortensen", hint: "Actor" },
  { value: "Dwayne Johnson", hint: "Actor" },
  { value: "Sam Rockwell", hint: "Actor" },
  { value: "Matthew McConaughey", hint: "Actor" },
  { value: "Chadwick Boseman", hint: "Actor" },
  { value: "Steve Carell", hint: "Actor" },
  { value: "Chris Pratt", hint: "Actor" },
  { value: "Daniel Craig", hint: "Actor" },
  { value: "Donald Glover", hint: "Actor" },
  { value: "Timothee Chalamet", hint: "Actor" },
  { value: "Candy Floss", hint: 'Food'},
  { value: "Pizza", hint: "Food"},
  { value: "Sushi", hint: "Food"},
  { value: "Burger", hint: "Food"},
  { value: "Tacos", hint: "Food"},
  { value: "Pasta", hint: "Food"},
  { value: "Salad", hint: "Food"},
  { value: "Steak", hint: "Food"},
  { value: "Curry", hint: "Food"},
  { value: "Chicken Wings", hint: "Food"},
  { value: "Noodles", hint: "Food"},
  { value: "Burrito", hint: "Food"},
  { value: "Cupcake", hint: "Food"},
  { value: "Ice Cream", hint: "Food"},
  { value: "Sushi Roll", hint: "Food"},
  { value: "Popcorn", hint: "Food"},
  { value: "Dumplings", hint: "Food"},
  { value: "Pancakes", hint: "Food"},
  { value: "Cheeseburger", hint: "Food"},
  { value: "Fish and Chips", hint: "Food"},
  { value: "Chocolate Cake", hint: "Food"},
  { value: "Gelato", hint: "Food"},
  { value: "Hot Dog", hint: "Food"},
  { value: "Crispy Fried Chicken", hint: "Food"},
  { value: "Nachos", hint: "Food"},
  { value: "Sushi Sashimi", hint: "Food"},
  { value: "Lasagna", hint: "Food"},
  { value: "Pho", hint: "Food"},
  { value: "Cucumber Salad", hint: "Food"},
  { value: "Beef StirFry", hint: "Food"},
  { value: "Lobster", hint: "Food"},
  { value: "French Fries", hint: "Food"},
  { value: "Fried Rice", hint: "Food"},
  { value: "Caesar Salad", hint: "Food"},
  { value: "Grilled Cheese Sandwich", hint: "Food"},
  { value: "Hamburger", hint: "Food"},
  { value: "Buffalo Wings", hint: "Food"},
  { value: "Tiramisu", hint: "Food"},
  { value: "Cinnamon Roll", hint: "Food"},
  { value: "Peking Duck", hint: "Food"},
  { value: "Ramen", hint: "Food"},
  { value: "Croissant", hint: "Food"},
  { value: "Mushroom Risotto", hint: "Food"},
  { value: "Chicken Parmesan", hint: "Food"},
  { value: "Pad Thai", hint: "Food"},
  { value: "Clam Chowder", hint: "Food"},
  { value: "Tandoori Chicken", hint: "Food"},
  { value: "Mango Sticky Rice", hint: "Food"},
  { value: "Churros", hint: "Food"},
  { value: "Gyoza", hint: "Food"},
  { value: "Baklava", hint: "Food"},
]

function Word({word, guesses}) {
  const characters = [...word]
  return (
    <div className="word">
      {characters.map((character, index) => {
          const isGuessed = guesses.includes(character.toLowerCase())
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
      if (character === ' ') {
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

  // useEffect(() => {
  // }, [word])

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
