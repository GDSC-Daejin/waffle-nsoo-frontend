import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Chat from "./chat";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    font-size: 14px;
    width: 210px;
  }
  @media (max-width: 1000px) {
    display: flex;
    width: 90%;
    height: 20px;
    p {
      display: flex;
      margin: 0;
      padding: 0;
      font-size: 10px;
    }
  }
`;

const Modal = styled.div`
  width: 200px;
  height: 200px;
`;

export default function Select() {
  const [game, setGame] = useState([]);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const handler = () => {
    const confirmation = prompt("네 라고 답하시면 매칭을 도와드리겠습니다");
    if (confirmation === "네") {
      setChecked((prev) => !prev);
      setShowChat(true);
      alert("확인했습니다");
      navigate("/chat");
    } else {
      alert("다시 선택해주세요");
    }
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
    setSelectedDate(selectedDate);
    console.log("Selected Date:", selectedDate);
  };

  return (
    <>
      <Header onClick={handleHome}>kbo 매칭⚾︎</Header>
      {game.map((item) => (
        <Box key={uuidv4()}>
          <p>{item.date}</p>
          {item.matches
            .filter((match) => match.location === "인천 SSG 랜더스필드")
            .map((match) => (
              <Card key={uuidv4()}>
                <input
                  type="radio"
                  name={item.date}
                  value={match.date}
                  onChange={handleRadioChange}
                  checked={selectedDate === match.date}
                  onClick={handler}
                />
                <p>{match.date}</p>
                <p>{match.match}</p>
                <p>{match.location}</p>
              </Card>
            ))}
        </Box>
      ))}
      {showChat && <Chat />}
    </>
  );
}
