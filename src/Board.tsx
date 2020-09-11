import React from "react";
import styled from "@emotion/styled";
import { Square, Cell } from "./Square";

const BoardRow = styled.div`
  &:after {
    clear: both;
    content: "";
    display: table;
  }
`;

interface BoardProps {
  squares: Cell[];
  onClick: (i: number) => void;
}

const Board: React.FC<BoardProps> = (props) => {
  const renderSquare = (i: number) => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };

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
};

export default Board;
