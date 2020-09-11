// eslint-disable-next-line
import React from 'react';
import styled from "@emotion/styled";

export type Cell = "X" | "O" | null;

interface SquareProps {
  onClick: () => void;
  value: Cell;
}

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
  }
`;

export const Square: React.FC<SquareProps> = ({
  onClick,
  value,
}: SquareProps) => {
  return <SquareButton onClick={onClick}>{value}</SquareButton>;
};
