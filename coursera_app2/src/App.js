import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

function App() {
  return (
    <div>
      <nav>
        <Link to="/" className="nav-item">
          Homepage
        </Link>
        <Link to="/about" className="nav-item">
          About Little Lemon
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/about" element={<AboutLittleLemon />}></Route>
      </Routes>
    </div>
  );
}

function Homepage() {
  var [cnt, setCnt] = useState(0);
  function handleClick() {
    cnt += 1;
    setCnt(cnt);
  }
  return (
    <div>
      <h1>Welcome to the Little Lemon site. Counter: {cnt}</h1>
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}

function AboutLittleLemon() {
  return <h1>About AboutLittleLemon</h1>;
}

export default App;
