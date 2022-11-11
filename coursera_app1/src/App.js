import logo from "./logo.svg";
import "./App.css";
import React from 'react';

function App() {
  console.log("AppRender called!");
  let [counters, setCounters] = React.useState(Array(1).fill(0));
  let [counter2, setCounter2] = React.useState(0);
  function handleClick() {
    counters[0] += 1
    console.log("Counters: ", counters);
    let counters2 = counters.slice()
    setCounters(counters2)
  }
  function handleClick2() {
    counter2 += 1
    console.log("Counter2: ", counter2);
    setCounter2(counter2)
  }
  return (
    <div className="App">
      <Square counter={counters[0]}/>
      <button onClick={handleClick}>Click Me</button>
      <Square counter={counter2}/>
      <button onClick={handleClick2}>Click Me</button>
    </div>
  );
}

function Square(props) {
  return <p>Hello world! Counter is {props.counter}</p>
}

export default App;
