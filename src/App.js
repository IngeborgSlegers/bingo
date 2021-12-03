import { useState, useEffect } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import "./App.css";
import Board from "./Components/Board";
import boardDataTemplate from './Components/boardDataTemplate'

function App() {
  const [themes, setThemes] = useState([]);
  const [theme, setTheme] = useState("1");
  const [board, setBoard] = useState(boardDataTemplate);
  const [coordinates, setCoordinates] = useState({ row: null, column: null });

  const fetchThemes = async () => {
    const response = await fetch("http://localhost:4000/theme");
    const data = await response.json();
    setThemes(data.themes);
  };

  const fetchBoard = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:4000/square/${theme}`);
    const data = await response.json();
    setBoard(data.rowArray);
  };
  
  const gotASquare = (rowIndex, squareIndex) => {
    setBoard((prevState) => {
      let stateCopy = [...prevState];
      stateCopy[rowIndex][squareIndex].boolean = true;
      return [...stateCopy];
    });
    setCoordinates({ row: rowIndex, column: squareIndex });
  };

  useEffect(() => {
    fetchThemes();
  }, []);


  return (
    <div className="game">
      <Board board={board} coordinates={coordinates} gotASquare={gotASquare}/>
      <div>
        <Form 
          className="form" 
          onSubmit={(e) => fetchBoard(e)}
        >
          <FormGroup>
            <Input
              type="select"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              {themes
                ? themes.map((element) => (
                    <option key={element.id} value={element.id}>
                      {element.themeName}
                    </option>
                  ))
                : null}
            </Input>
          </FormGroup>
          <Button>Select Board</Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
