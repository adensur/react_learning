import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function Square(props) {
  console.log("Symbol", props.symbol);
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.symbol}
    </button>
  );
}

function Board(props) {
  console.log("Board render is called!");
  let [squares, setSquares] = React.useState(Array(9).fill(null));
  function handleClick(i) {
    squares[i] = "X";
    console.log(squares);
    let squares2 = squares.slice();
    setSquares(squares2);
  }
  function renderSquare(i) {
    return <Square symbol={squares[i]} onClick={() => handleClick(i)} />;
  }
  const status = "Next player: X";
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
