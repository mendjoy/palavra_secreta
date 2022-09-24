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

  console.log(words)
  return (
    <div className="App">
     {gameStage === 'start' && <StartScreen/>}
     {gameStage === 'game' && <Game/>}
     {gameStage === 'gameover' && <GameOver/>}
    </div>
  );
}

export default App;