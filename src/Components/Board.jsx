import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [board, setBoard] = useState([
    [
      { value: "Heroku broke my app", boolean: false },
      { value: "Heroku broke my styling", boolean: false },
    ],
    [
      { value: "CORS issue", boolean: false },
      { value: "Poor time management", boolean: false },
    ],
  ]);

  console.log(board);

  const gotASquare = (rowIndex, squareIndex) => {
    setBoard((prevState) => {
      return prevState.map((row, stateRowIndex) => {
        if (rowIndex === stateRowIndex) {
          return row.map((square, stateSquareIndex) => {
            if (squareIndex === stateSquareIndex) {
              return { ...square, boolean: true };
            } else {
              return square;
            }
          });
        } else {
          return row;
        }
      });
    });
  };

  return (
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
  );
};

export default Board;
