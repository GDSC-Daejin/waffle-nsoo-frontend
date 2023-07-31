import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const Indexbar = styled.div`
    background: #0B2447;
    width: 100%;
    height: 65px;
    display: flex;
    white-space: nowrap;
`
const IndexLink = styled.div`
    color: #A5D7E8;
    margin: 8px 40px 8px 40px;
    border: none;
    border-radius: 5px;
    text-align: center;
    flex: 1;
`
const IndexLogin = styled(Link)`
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
`;
const IndexBtn = styled.div`
    background-color: transparent;
    border: none;
    text-align: center;
    font-size: 20px;
    margin-top: 14px;
`

const NavBlank = styled.div`
    flex: 5;
`
const IndexLogo = styled.img`
    margin-top: 5px;
    height: 40px;
`

const IndexHeader = () => {
    return (
        <>
            <Indexbar>
                <IndexLink>
                    <IndexLogo alt="logo" src="img/baseball.png" />
                </IndexLink>
                <NavBlank />
                <IndexLogin to="/SignIn">
                    <IndexBtn>로그인</IndexBtn>
                </IndexLogin>
            </Indexbar>
            <Outlet />
        </>
    );
};

export default IndexHeader;