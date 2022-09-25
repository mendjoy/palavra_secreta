//CSS
import './App.css';

//REACT 
import {useCallBack, useEffect, useState} from "react"; 

//data
import { wordList } from './data/word';

//components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id:1, name: 'start'},
  {id:2, name:'game'},
  {id:3, name:'gameover'}
]


function App() {
  const[gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordList);
  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuesseLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]); 
  const [guesses, setGuesses] = useState(5); 
  const [score, setScore] = useState(0);

  //escolher categoria aleatoria 
  const pickWordAndCategory = () => {
    const categories = Object.keys(words)
    const category  = categories[Math.floor(Math.random() * Object.keys(categories).length)];

     //escolher uma palavra aleatoria 
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return{word, category};
   
  };

 
  
   
   
//Inicia o jogo
  const startGame = () =>{
    // escolher palavra e categoria
    const {word, category} = pickWordAndCategory();

    //array de letras
    let wordLetters = word.split('');
    wordLetters = wordLetters.map((l) => l.toLowerCase()); 
    
    //preencher states 
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);


    setGameStage(stages[1].name);
  };

//letra input
  const verifyLetter = (letter) =>{
    const normalizedLetter = letter.toLowerCase();

    //checa se a letra ja foi enviada
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter))
    {
      return; 
    };

    //colocar as letras chutadas em um array ou subtrair a chance
    if(letters.includes(normalizedLetter)){
        setGuesseLetters((actualGuessedLetters)=> [
          ...actualGuessedLetters, 
          normalizedLetter,
        ])
    } else {
      setWrongLetters((actualWrongLetters)=> [
        ...actualWrongLetters, 
        normalizedLetter,
      ]);
    }

   
  };
    console.log(guessedLetters)
    console.log(wrongLetters)
//reiniciar jogo 
  const retry = () => {
    setGameStage(stages[0].name)
  }

  


  return (
    <div className="App">
     {gameStage === 'start' && <StartScreen startGame={startGame}/>}

     {gameStage === 'game' && 
     <Game verifyLetter={verifyLetter} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory} 
        letters={letters} 
        guessedLetters={guessedLetters} 
        wrongLetters={wrongLetters} 
        guesses={guesses} 
        score={score}/>}
     {gameStage === 'gameover' && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
