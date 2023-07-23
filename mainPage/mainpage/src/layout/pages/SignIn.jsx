import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { login, logout } from "../pages/firebase";
import { auth } from "../pages/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

const Body = styled.div`
  height: 100vh;
  padding: 10px;
  display: flex;
  justify-content: center;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
`;

const Container = styled.div`
  max-width: 700px;
  width: 100%;
  background-color: #fff;
  padding: 25px, 30px;
  border-radius: 30px;
  box-shadow: 0px 5px 10px rgb(0, 0, 0, 0.15);
  align-items: center;
  justify-content: center;
  height: 70%;
  margin-top: 100px;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 500;
  margin-top: 20px;
  text-align: center;
  margin-right: 180px;
`;

const Content = styled.div`
  margin-top: 100px;
  margin-left: 180px;
`;

const UserDetail = styled.div`
  display: block;
`;

const Span = styled.span`
  display: flex;
  margin-right: 15px;
  margin-top: 15px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  height: 35px;
  width: 100%;
  max-width: 300px;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;
`;

const InputPwd = styled.input`
  height: 35px;
  width: 100%;
  max-width: 300px;
  outline: none;
  font-size: 16px;
  border-radius: 5px;
  padding-left: 15px;
  border: 1px solid #ccc;
  border-bottom-width: 2px;
  transition: all 0.3s ease;
`;

const LoginBtn = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 15px;
  margin-top: 30px;
  margin-left: 100px;
  display: block;
`;

const Lin = styled.a`
  margin-top: 30px;
  margin-right: 30px;
  display: flex;
`;

const LoginBtnG = styled.button`
  width: 150px;
  height: 40px;
  border-radius: 15px;
  margin-top: 20px;
  margin-left: 75px;
  display: block;
`;

export default function Login({ setUsers }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInLocal, setIsLoggedInLocal] = useState(false); // 이름은 setIsLoggedInLocal로 변경
  const [user, setUser] = useState({ setUsers });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [change, setChange] = useState(false);
  const navigate = useNavigate();

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    // Firebase 인증을 사용하여 구글로 로그인
    loginWithGoogle()
      .then((user) => {
        setChange(true);
        setIsLoggedInLocal(true);
        // 로그인에 성공하면 setUser 함수를 호출하여 사용자 정보를 Home 컴포넌트로 전달
        setUser(user);
      })
      .catch((error) => {
        console.error("Error logging in with Google:", error);
      });
  };

  const handleLogout = () => {
    logout(auth)
      .then(() => {
        setChange(false);
        setIsLoggedInLocal(false);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <Body>
      <Container>
        <Content>
          <Title>
            로그인
            <AiFillHome
              onClick={() => {
                navigate("/");
              }}
            />
          </Title>
          {!user && (
            <UserDetail>
              <Span>아이디</Span>
              <Input onChange={(e) => setEmail(e.target.value)} />
              <Span>비밀번호</Span>
              <InputPwd
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lin>
                <Link to="/signUp">회원정보추가하기</Link>
              </Lin>
              <LoginBtn>로그인하기</LoginBtn>
              <LoginBtnG onClick={handleLogin}>구글로 로그인하기</LoginBtnG>
            </UserDetail>
          )}
          {user && (
            <>
              <p>로그인 되었습니다. 환영합니다 {user.displayName}님!</p>
              <LoginBtnG onClick={handleLogout}>로그아웃</LoginBtnG>
            </>
          )}
        </Content>
      </Container>
    </Body>
  );
}
