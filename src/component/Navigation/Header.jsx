import React, { useState } from "react";
import { auth } from "../api/firebase";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Navbar = styled.div`
  background: #0B2447;
  width: 100%;
  height: 65px;
  display: flex;
  white-space: nowrap;
`;

const NavBlank = styled.div`
  flex: 1;
`;

const NavLink = styled(Link)`
  color: #A5D7E8;
  margin: 8px 40px 8px 40px;
  border: none;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  flex: 2;
  &: hover {
    background-color: #A5D7E8;
    color: #0B2447;
    font-weight: bolder;
    transition: 0.3s;
  }
`;

const LoginLink = styled(Link)`
  color: #A5D7E8;
  margin: 8px 40px 8px 40px;
  border: none;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  flex: 2;
  &: hover {
    background-color: #576CBC;
    color: #eee;
    font-weight: bolder;
    transition: 0.3s;
  }
`;

const NavBtn = styled.div`
  background-color: transparent;
  border: none;
  text-align: center;
  font-size: 20px;
  margin-top: 14px;
`;

const NavLogo = styled.img`
  margin-top: 5px;
  height: 40px;
`;


const Header = () => {
  const [ users, setUsers] = useState(null);
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUsers(null);
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  return (
    <Navbar>
      <NavLink to="/">
        <NavLogo alt="logo" src="img/baseball.png" />
      </NavLink>
      <NavBlank />
      <NavLink to="/Weather">
        <NavBtn>경기장 날씨</NavBtn>
      </NavLink>
      <NavBlank />
      <NavLink to="/Matching">
        <NavBtn>랜덤 직관 매칭</NavBtn>
      </NavLink>
      <NavBlank />
      <NavLink to="/Info">
        <NavBtn>회원정보</NavBtn>
      </NavLink>
      <NavBlank />
      <LoginLink>
        <NavBtn onClick={handleLogout}>
          로그아웃
        </NavBtn>
      </LoginLink>
    </Navbar>
  );
};

export default Header;