import React, { useState } from 'react';
import ReactDOM from 'react-dom';
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'
import './App.css';

type cell = "X" | "O" | null;
interface SquareProps {
  onClick: () => void,
  value: cell
}

const Square: React.FC<SquareProps> = (props) => {
  const SquareButton = styled.button`
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
  &:focus {
    outline: none;
  };
  `

  return (
    <SquareButton onClick={props.onClick}>
      {props.value}
    </SquareButton>
  );
}

interface BoardProps {
  squares: cell[],
  onClick: (i: number) => void
}
const Board: React.FC<BoardProps> = (props) => {
  const renderSquare = (i: number) => {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }

  const boardRowStyle = css`
    &:after {
      clear: both;
      content: "";
      display: table;
    }
  `

  const BoardRow = styled.div`
    &:after {
      clear: both;
      content: "";
      display: table;
    }
  `

    return (
      <div>
        <BoardRow>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </BoardRow>
        <BoardRow>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </BoardRow>
        <BoardRow>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </BoardRow>
      </div>
    );
}

const Game: React.FC = (props) =>  {

  interface historyValueObject {
    squares: cell[];
  }

  const [historyValue, setHistoryValue] = useState<historyValueObject[]>([
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
      <div css={css`
      display: flex;
      flex-direction: row;
    `}>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => handleClick(i)}
          />
        </div>
        <div css={css`
          margin-left: 20px;
        `}>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares: cell[]) {
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
