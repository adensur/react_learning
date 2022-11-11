import logo from "./logo.svg";
import "./App.css";
import React from 'react';

function App() {
  console.log("AppRender called!");
  let [counters, setCounters] = React.useState(Array(2).fill(0));
  function handleClick() {
    counters[0] += 1
    console.log("Counters: ", counters);
    setCounters(counters)
  }
  function handleClick2() {
    counters[1] += 1
    console.log("Counter: ", counters);
    setCounters(counters)
  }
  return (
    <div className="App">
      <Square counter={counters[0]}/>
      <button onClick={handleClick}>Click Me</button>
      <Square counter={counters[1]}/>
      <button onClick={handleClick2}>Click Me</button>
    </div>
  );
}

function Square(props) {
  return <p>Hello world! Counter is {props.counter}</p>
}

export default App;
