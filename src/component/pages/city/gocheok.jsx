import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import Chat from "../chat";
import Header from "../../Navigation/Header";
import GlobalStyle from "../../styles/Globalstyles";

const CityContainer = styled.div`
  width: 100%;
  height: 100vh;
  padding: 100px 0 100px 0;
  flex-direction: column;
`;

const Box = styled.div`
  width: 1200px;
  height: 980px;
  display: flex;
  flex-direction: column;
  padding: 40px 0 40px 0;
  border: 2px solid;
  border-radius: 20px;
  margin: 0 auto 0 auto;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    background: none;
  }
`;


const Card = styled.h3`
  border: 1px solid;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  align-items: center;
  text-align: center;
  width: 1000px;
  margin: 0 auto 20px auto;
  padding: 15px;
  background-color: #eee;
`;

const CardBtn = styled.input`
  flex: 1;
  text-align: center;
  border: 1px solid #576CBC;
  border-radius: 3px;
  background-color: #576CBC;
  color: #eee;
  &:hover{
    background-color: #A5D7E8;
    color: black;
    transition: 0.3s;
  }
`;

const CardText = styled.div`
  font-size: 20px;
  flex: 4;
`;

const Block = styled.div`
  flex: 1;
`;

const Footer = styled.div`
  background-color: black;
  width: 100%;
  height: 100px;
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
      <GlobalStyle />
      <Header />
      <CityContainer>
        {game.map((item) => (
          <Box key={uuidv4()}>
            {item.matches
              .filter((match) => match.location === "서울 고척 스카이돔")
              .map((match) => (
                <Card key={uuidv4()}>
                  <CardBtn
                    type="button"
                    name={item.date}
                    value="입장하기"
                    onChange={handleRadioChange}
                    checked={selectedDate === match.date}
                    onClick={handler}
                  />
                  <Block />
                  <CardText>{match.date}</CardText>
                  <CardText>{match.match}</CardText>
                  <CardText>{match.location}</CardText>
                </Card>
              ))}
          </Box>
        ))}
        {showChat && <Chat />}
      </CityContainer>
      <Footer />
    </>
  );
}

