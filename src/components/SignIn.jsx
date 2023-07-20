import React, { useState } from 'react';
import styled from 'styled-components';
import { login, logout } from '../api/firebase';
import { auth } from '../api/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


export default function Login() {

    const [ user, setUser ] = useState();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleLogin = () => {
        login().then(setUser);
    }
    const handleLogout = () => {
        logout()
    }

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };




    return (
        <Body>
            <Container>
                <Content>
                    
                    <Title>로그인</Title>
                    <UserDetail>
                        <Span>아이디</Span>
                        <Input onChange={(e) => setEmail(e.target.value)} />
                        <Span>비밀번호</Span>
                        <InputPwd type="password" onChange={(e) => setPassword(e.target.value)} />
                    </UserDetail>
                    <Link href="#">회원가입하기</Link>
                    <Link href="#">회원정보찾기</Link>
                    <LoginBtn onClick={ signIn }>로그인하기</LoginBtn>
                    <LoginBtnG onClick={ login }>구글로 로그인하기</LoginBtnG>
                    
                </Content>
            </Container>
        </Body>
    );
}



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
    padding: 25px; 30px;
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
    border 1px solid #ccc;
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
    border 1px solid #ccc;
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

const Link = styled.a`
    margin-top: 30px;
    margin-right: 30px;
    display: inline-block;
`;

const LoginBtnG = styled.button`
    width: 150px;
    height: 40px;
    border-radius: 15px;
    margin-top: 20px;
    margin-left: 75px;
    display: block;
`;