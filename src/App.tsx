import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

type SquareProps = {
  onClick: () => void,
  value: string
}
const Square = (props: SquareProps) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

type BoardProps = {
  squares: string[],
  onClick: (i: number) => void
}
const Board = (props: BoardProps) => {
  const renderSquare = (i: number) => {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }

    return (
      <div>
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

const Game: React.FC = (props) =>  {

  interface historyObject {
    squares: string[];
  }

  const [historyValue, setHistoryValue] = useState([
    {
      squares: Array(9).fill(null)
    }
  ]);
  const [stepNumberValue, setStepNumberValue] = useState(0);
  const [xIsNextValue, setXIsNextValue] = useState(true);

  const handleClick = (i: number) => {
    const history = historyValue.slice(0, stepNumberValue + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNextValue ? "X" : "O";
    
    setHistoryValue(history.concat([
      {
        squares: squares
      }
    ]));
    setStepNumberValue(history.length);
    setXIsNextValue(!xIsNextValue);

  }

  const jumpTo = (step: number) => {
    setStepNumberValue(step);
    setXIsNextValue((step % 2) === 0)
  }

    const history = historyValue;
    const current = history[stepNumberValue];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (xIsNextValue ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
