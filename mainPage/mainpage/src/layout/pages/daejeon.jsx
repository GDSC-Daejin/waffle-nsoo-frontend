import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

const Header = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  border-bottom: 2px solid;
  height: 10%;
  margin-left: auto;
  margin-right: auto;
  font-size: 2.4rem;
  font-weight: 700;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const Card = styled.h3`
  border: 1px solid;
  display: flex;
  align-items: center;
  gap: 120px;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
  p {
    margin: 0;
    font-size: 15px;
    width: 200px;
  }
`;

export default function Select() {
  const [game, setGame] = useState([]);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const handler = () => {
    setChecked((prev) => !prev);
  };

  const handleHome = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  const fetchGameData = () => {
    fetch("gameData.json")
      .then((res) => res.json())
      .then((data) => setGame(data.games))
      .catch((error) => console.error("Error fetching game data:", error));
  };

  const handleRadioChange = (event) => {
    const selectedDate = event.target.value;
    console.log("Selected Date:", selectedDate);
  };

  return (
    <>
      <Header onClick={handleHome}>
        kbo 매칭⚾︎<AiOutlineHome></AiOutlineHome>
      </Header>
      {game.map((item) => (
        <Box key={uuidv4()}>
          <p>{item.date}</p>
          {item.matches
            .filter((match) => match.location === "대전 이글스 파크")
            .map((match) => (
              <Card key={uuidv4()}>
                <input
                  type="radio"
                  name={item.date}
                  value={match.date}
                  onChange={handleRadioChange}
                  checked={checked}
                  onClick={handler}
                />
                <p>{match.date}</p>
                <p>{match.match}</p>
                <p>{match.location}</p>
              </Card>
            ))}
        </Box>
      ))}
    </>
  );
}
