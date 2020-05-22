import React, { useState, useEffect } from "react";
import "./styles.css";

const occupies = {
  player1: "X",
  player2: "O",
  none: ""
};

const whosTurn = {
  player1: 0,
  palyer2: 1
};

const Space = ({ occupy, x, y, handleClick }) => {
  const ocClick = () => {
    if (occupy !== occupies.none) {
      return;
    }
    handleClick(x, y);
  };
  return (
    <div className="space" onClick={ocClick}>
      {occupy}
    </div>
  );
};

const Board = () => {
  let initSpaces = new Array(3);
  for (let i = 0; i < 3; i++) {
    initSpaces[i] = [occupies.none, occupies.none, occupies.none];
  }
  const [spaces, setSpaces] = useState(initSpaces);
  const [turn, setTurn] = useState(whosTurn.player1);
  const [winner, setWinner] = useState(occupies.none);
  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      if (spaces[i][0] === spaces[i][1] && spaces[i][0] === spaces[i][2]) {
        setWinner(spaces[i][0]);
        return;
      }
      if (spaces[0][i] === spaces[1][i] && spaces[1][i] === spaces[2][i]) {
        setWinner(spaces[0][i]);
        return;
      }
      if (spaces[0][0] === spaces[1][1] && spaces[2][2] === spaces[1][1]) {
        setWinner(spaces[1][1]);
      }
      if (spaces[0][2] === spaces[1][1] && spaces[2][0] === spaces[1][1]) {
        setWinner(spaces[1][1]);
      }
    }
  }, [spaces]);

  const handleClick = (x, y) => {
    let newSpaces = JSON.parse(JSON.stringify(spaces));
    let newOccupy =
      turn === whosTurn.player1 ? occupies.player1 : occupies.player2;
    newSpaces[x][y] = newOccupy;
    let newTurn =
      turn === whosTurn.player1 ? whosTurn.palyer2 : whosTurn.player1;

    setSpaces(newSpaces);
    setTurn(newTurn);
  };

  return (
    <div>
      {winner ? (
        <div>
          Winner is {winner === occupies.player1 ? "player1" : "player2"}
        </div>
      ) : (
        <div className="board">
          {spaces.map((rows, i) =>
            rows.map((space, j) => (
              <Space
                key={i.toString() + j.toString()}
                occupy={space}
                x={i}
                y={j}
                handleClick={handleClick}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}
