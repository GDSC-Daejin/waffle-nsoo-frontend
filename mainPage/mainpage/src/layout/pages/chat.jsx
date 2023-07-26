import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { database } from "../pages/firebase";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, onValue } from "firebase/database";
import { db } from "../pages/firebase";

const ChatContainer = styled.div`
  height: 100vh;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  font-size: 2rem;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  border-bottom: 1px solid;
  font-weight: 700;
  width: 100%;
`;

const ChatBox = styled.div`
  display: flex;
  top: 10px;
  flex-direction: column;
  width: 100%;
  height: 90%;
  font-size: 24px;
  overflow: scroll;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const auth = getAuth();

export default function Chat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [user, setUser] = useState(null); // 인증된 사용자 정보

  const handleHome = () => {
    navigate("/");
  };

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

    // 데이터 변경 시마다 호출되는 콜백 함수 등록
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
    <ChatContainer>
      <Title onClick={handleHome}>야구 볼사람⚾︎</Title>
      <ChatBox>
        {messages.map((message, index) => (
          <p key={index}>
            <strong>{message.user}: </strong>
            {message.text}
          </p>
        ))}
      </ChatBox>
      <Box>
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button onClick={handleSubmit}>Send</button>
      </Box>
    </ChatContainer>
  );
}
