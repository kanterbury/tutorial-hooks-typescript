import React, { useState } from "react";
import { css } from "emotion";
import { Cell } from "./Square";
import Board from "./Board";
import "./App.css";

function calculateWinner(squares: Cell[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

interface HistoryValueObject {
  squares: Cell[];
}

const Game: React.FC = () => {
  const [historyValue, setHistoryValue] = useState<HistoryValueObject[]>([
    {
      squares: Array(9).fill(null),
    },
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

    setHistoryValue([
      ...history,
      {
        squares,
      },
    ]);
    setStepNumberValue(history.length);
    setXIsNextValue(!xIsNextValue);
  };

  const jumpTo = (step: number) => {
    setStepNumberValue(step);
    setXIsNextValue(step % 2 === 0);
  };

  const history = historyValue;
  const current = history[stepNumberValue];
  const winner = calculateWinner(current.squares);

  const moves = history.map((_, move) => {
    const desc = move ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move}>
        <button type="button" onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  let status: string;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNextValue ? "X" : "O"}`;
  }

  return (
    <div
      className={css`
        display: flex;
        flex-direction: row;
      `}
    >
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div
        className={css`
          margin-left: 20px;
        `}
      >
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
