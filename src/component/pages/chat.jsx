import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, onValue } from "firebase/database";
import Header from "../Navigation/Header";
import GlobalStyle from "../styles/Globalstyles";

const ChatContainer = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  background: linear-gradient(150deg, #A5D7E8, #576CBC);
`;

const ChatLog = styled.div`
  height: 1000px;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5vh;
  margin-bottom: 10vh;
  border: 2px solid black;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  background-color: #19376D;
`;

const Title = styled.div`
  display: flex;
  font-size: 2rem;
  justify-content: center;
  align-items: center;
  margin: 0 auto 0 auto;
  padding: 15px 0 15px 0;
  border-bottom: 2px solid black;
  font-size: 3rem;
  font-weight: 500;
  width: 100%;
  color: #eee;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 800px;
  margin-bottom: 20px;
  margin-top: 10px;
  padding: 20px;
  font-size: 24px;
  overflow-x: hidden;
  overflow-y: scroll;
  justify-content: center;
  align-items: center;
  color: #dbdbdb;
  border-bottom: 2px solid black;
  p {
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 10px;
  }
`;

const UserBox = styled.div`
  display: flex;
  margin: 10px 0 0 0;
`;

const ChatBtn = styled.button`
  width: 20px;
  height: 50px;
  flex: 2;
  margin: 0 20px 0 5px;
  border: 2px solid;
  border-color: #576CBC;
  border-radius: 10px;
  background-color: #19376D;
  color: #eee;
  font-size: 1.7rem;
  font-weight: 400;
  &:hover {
    background-color: #A5D7E8;
    color: #0B2247;
    transition: 0.7s;
    font-weight: bold;
  }
`;

const InputBox = styled.input`
  justify-content: center;
  flex: 10;
  width: 100%;
  margin: 0 5px 0 20px;
  border: 2px solid black;
  border-radius: 10px;
  font-size: 1.5rem;
  font-weight: 400;
  color: black;
`;

const Footer = styled.div`
  background-color: black;
  width: 100%;
  height: 100px;
`;

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [user, setUser] = useState(null); // 인증된 사용자 정보

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const messagesRef = ref(db, "messages");

    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.values(data);
        setMessages(messageList);
      }
    });
  }, []);

  const handleSubmit = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    const db = getDatabase();
    const messagesRef = ref(db, "messages");
    push(messagesRef, {
      text: messageText,
      user: user.email,
    });

    setMessageText("");
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      <ChatContainer>
        <ChatLog>
          <Title>야구 볼 사람 ⚾︎</Title>
          <ChatBox>
            {messages.map((message, index) => (
              <p key={index}>
                {message.user}:
                " {message.text} "
              </p>
            ))}
          </ChatBox>
          <UserBox>
            <InputBox
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}>
            </InputBox>
            <ChatBtn onClick={handleSubmit}>보내기</ChatBtn>
          </UserBox>
        </ChatLog>
      </ChatContainer>
      <Footer />
    </>
  );
}
