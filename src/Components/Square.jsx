import React from "react";

const Square = ({ rowIndex, squareIndex, square, gotASquare }) => {
  return (
    <button
      className="square"
      style={{ backgroundColor: square.boolean ? "red" : null }}
      onClick={() => gotASquare(rowIndex, squareIndex)}
    >
      {square.squareValue}
    </button>
  );
};

export default Square;
