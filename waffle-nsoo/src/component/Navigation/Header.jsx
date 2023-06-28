import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Navbar = styled.div`
  background: #0B2447;
  width: 100%;
  height: 65px;
  display: flex;
  white-space: nowrap;
`

const NavLink = styled(Link)`
  color: #A5D7E8;
  margin: 8px 40px 8px 40px;
  border: none;
  border-radius: 5px;
  text-align: center;
  flex: 1;
  &: hover {
    background-color: #A5D7E8;
    color: #0B2447;
    font-weight: bolder;
    transition: 0.3s;
  }
`
const LoginLink = styled(Link)`
  color: #A5D7E8;
  margin: 8px 40px 8px 40px;
  border: none;
  border-radius: 5px;
  text-align: center;
  flex: 1;
  &: hover {
    background-color: #576CBC;
    color: #eee;
    font-weight: bolder;
    transition: 0.3s;
  }
`

const NavBtn = styled.div`
  background-color: transparent;
  border: none;
  text-align: center;
  font-size: 20px;
  margin-top: 14px;
`

const Header = () => {
  return (
    <Navbar>
      <NavLink to="/Home">
        <NavBtn>로고</NavBtn>
      </NavLink>
      <NavLink to="/Nav">
        <NavBtn>경기일정</NavBtn>
      </NavLink>
      <NavLink to="/Weather">
        <NavBtn>날씨</NavBtn>
      </NavLink>
      <NavLink to="/">
        <NavBtn>랜덤매칭</NavBtn>
      </NavLink>
      <LoginLink to="/Login">
        <NavBtn>로그인</NavBtn>
      </LoginLink>
    </Navbar>
  );
};

export default Header;