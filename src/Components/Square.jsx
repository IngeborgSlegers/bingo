import React from 'react'

const Square = ({rowIndex, squareIndex, square, gotASquare}) => {
  return (
    <div>
      <p onClick={() => gotASquare(rowIndex, squareIndex)}>{square.value}</p>
    </div>
  )
}

export default Square
