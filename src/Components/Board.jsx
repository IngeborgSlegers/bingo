import React, { useState, useEffect } from "react";
import Square from "./Square";
import boardData from "./boardData";

const Board = ({board, coordinates, gotASquare}) => {
  // const [board, setBoard] = useState(themeBoard);
  // const [coordinates, setCoordinates] = useState({ row: null, column: null });
  const [bingo, setBingo] = useState(false);

  useEffect(() => {
    if (coordinates.row || coordinates.column) {

      if(checkRow(coordinates.row) || checkColumn(coordinates.column) || diagonalLtoR() ||diagonalRtoL())
      {
        setBingo(true)
      }
    }
  }, [coordinates]); //eslint-disable-line react-hooks/exhaustive-deps 


  const checkRow = (rowIndex) => {
    let tallie = 0;
    board[rowIndex].forEach((square) => {
      if (square.boolean) tallie += 1;
    });
    return tallie === 5;
  };

  const checkColumn = (columnIndex) => {    
    let columnArray = board.map((row, index) => {
      return row[columnIndex];
    });
    let tallie = 0;
    columnArray.forEach((square) => {
      if (square.boolean) tallie += 1;
    });
    return tallie === 5;
  };

  const diagonalLtoR = () => {
    // This row currently console.logs a diagonal pattern (1, 7, 13, 19, 25).
    let tallie = 0;
    board.forEach((row, index) => {
      if (row[index].boolean) tallie += 1
    });
    return tallie === 5;
  };

  const diagonalRtoL = () => {
    // To check the diagonal pattern of the other direction
    let tallie = 0;
    board.forEach((row, index) => {
      if (row[row.length - index - 1].boolean) tallie += 1
    });
    return tallie === 5;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{bingo ? "BINGO" : "No Bingo"}</h1>
      <div className="game-board">
        {board.map((row, rowIndex) => {
          return (
            <div className="board-row" key={rowIndex}>
              {row.map((square, squareIndex) => {
                return (
                  <Square
                    key={squareIndex}
                    rowIndex={rowIndex}
                    squareIndex={squareIndex}
                    square={square}
                    gotASquare={gotASquare}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
