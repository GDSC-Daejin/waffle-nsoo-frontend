import React, { useEffect, useState } from "react";
import styled from "styled-components";

const GameData = styled.div`
  display: flex;
  position: relative;
  bottom: 560px;
  width: 80%;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;

const Box = styled.div`
  display: flex;
  width: 80%;
  height: 100vh;
  position: relative;
  top: 40px;
  right: 120px;
  flex-direction: column;
`;

const Card = styled.div`
  border: 1px solid;
  display: flex;
  justify-content: space-around;
  width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

export default function Select() {
  const [game, setGame] = useState([]);

  useEffect(() => {
    fetchGameData();
  }, []);

  const fetchGameData = () => {
    fetch("gameData.json")
      .then((res) => res.json())
      .then((data) => setGame(data.games))
      .catch((error) => console.error("Error fetching game data:", error));
  };

  return (
    <GameData>
      {game.map((item) => (
        <Box key={item.date}>
          <p>{item.date}</p>
          {item.matches
            .filter((match) => match.location === "수원 KT 위즈 파크")
            .map((match) => (
              <Card key={match.time}>
                <p>{match.date}</p>
                <p>{match.time}</p>
                <p>{match.match}</p>
                <p>{match.location}</p>
              </Card>
            ))}
        </Box>
      ))}
    </GameData>
  );
}
