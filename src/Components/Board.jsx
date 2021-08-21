import React, { useState, useEffect } from "react";
import Square from "./Square";
import boardData from "./boardData";

const Board = () => {
  const [board, setBoard] = useState(boardData);
  const [rowState, setRowState] = useState(null);
  const [columnState, setColumnState] = useState(null);
  const [squares, setSquares] = useState(0);
  const [bingo, setBingo] = useState(false);

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
    setRowState(rowIndex);
    setColumnState(squareIndex);
  };

  useEffect(() => {
    checkRow(rowState);
    // squares < board[0].length ? checkColumn(columnState) : setBingo(true);
  }, [board]);

  useEffect(() => {
    if (squares === 5) {
      setBingo(true);
      console.log("bingo!")
    }
    // squares < board[0].length ? checkColumn(columnState) : setBingo(true);
  }, [squares]);

  useEffect(() => {
    if (rowState) {
      if (squares < board[0].length) {
        console.log("hello")
        setSquares(0);
        checkColumn(columnState);
      }
      // if (squares < board[0].length) checkDiagonal();
    }
  }, [rowState]);

  const checkRow = (rowIndex) => {
    board
      .filter((_, index) => index === rowIndex)
      .forEach((row) => {
        for (let i = 0; i < row.length; i++) {
          if (row[i].boolean) {
            setSquares(squares + 1);
          }
        }
      });
  };

  const checkColumn = (columnIndex) => {
    let columnArray = board.map((row, index) => {
      return row[columnIndex];
    });
    for (let i = 0; i < columnArray.length; i++) {
      if (columnArray[i].boolean) {
        setSquares(squares + 1);
      }
    }
  };

  const diagonalLtoR = () => {
    // This row currently console.logs a diagonal pattern (1, 7, 13, 19, 25).
    board.forEach((row, index) => {
      if (row[index].boolean) {
        setSquares(squares + 1);
      }
    });
  };

  const diagonalRtoL = () => {
    // To check the diagonal pattern of the other direction
    board.forEach((row, index) => {
      if (row[row.length - index - 1].boolean) {
        setSquares(squares + 1);
      }
    });
  };

  return (
    <div style={{textAlign: 'center'}}>
      <h1>{bingo ? 'BINGO' : 'No Bingo'}</h1>
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
