import { useReducer, useState } from 'react';
import {init, initialState, reducer} from "./reducers/counterRuducer"

import './App.css';



function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  function up() {
    dispatch({ type: "INCREMENT"});
  }

  function down() {
    dispatch({ type: "DECREMENT"});
  }
  
  function multiply() {
    dispatch({ type: "MULTIPLY"});
  }
  
  function reset() {
    dispatch({ type: "RESET"});
  }
  return (
    <div className="App">
      <h1>{state}</h1>
      <button onClick={up}>Up</button>
      <button onClick={down}>Down</button>
      <button onClick={multiply}>Multiply</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default App;
