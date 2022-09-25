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
  const  [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

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
    setLetters(letters);


    setGameStage(stages[1].name);
  };

//letra input
  const verifyLetter = () =>{
    setGameStage(stages[2].name)
  }

//reiniciar jogo 
  const retry = () => {
    setGameStage(stages[0].name)
  }

  


  return (
    <div className="App">
     {gameStage === 'start' && <StartScreen startGame={startGame}/>}
     {gameStage === 'game' && <Game verifyLetter={verifyLetter}/>}
     {gameStage === 'gameover' && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
