import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { auth } from "../api/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

import Weather from "./HomeWeather";
import Header from "../Navigation/Header";
import IndexHeader from "../Navigation/IndexHeader";
import GlobalStyle from "../styles/Globalstyles";

const ALL = styled.div`
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  padding-bottom: 10rem;
  width: 100%;
  background: linear-gradient(150deg, #A5D7E8, #576CBC);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomeGameschedule = styled.div`
  border: 2px solid black;
  border-radius: 20px;
  backgroundImage: ;
  height: 600px;
  width: 450px;
  margin-left: 20px;
`;

const IndexContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  align-item: center;
`;

const IndexImage  = styled.img`
  width: 100%;
  height: 100%;
`;

const Footer = styled.div`
  background-color: black;
  color: #eee;
  width: 100%;
  height: 100px;
  font-size: 1.5rem;
  text-align: center;
  padding-top: 40px;
`;

const queryClient = new QueryClient();
const storageRef = getStorage();
const listRef = ref(storageRef, "images/");



export default function Home () {
  const [imageList, setImageList] = useState([]);
  const [users, setUsers] = useState(null);
  const navigate = useNavigate();
  const [showImages, setShowImages] = useState(true);
  
  console.log(localStorage.getItem('users'));
  useEffect(() => {
    const fetchImageList = async () => {
      try {
        const response = await listAll(listRef);
        const downloadUrls = await Promise.all(
          response.items.map((item) => getDownloadURL(item))
        );
        setImageList(downloadUrls);
      } catch (error) {
        console.log("Error getting image list:", error);
      }
    };

    fetchImageList();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsers(user);
      } else {
        setUsers(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleHome = () => {
    setShowImages(true);
    navigate("/");
  };

  const handleClick = (path) => {
    setShowImages(false);
    navigate(`/${path}`);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUsers(null);
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  return (
    <ALL>
      <GlobalStyle />
      {users ? (
        <>
          <Header />
          <HomeContainer>
            <QueryClientProvider client={queryClient}>
              <Weather />
            </QueryClientProvider>
          </HomeContainer>
          <Footer>Copyright &copy;nsoo</Footer>
        </>
      ) : (
        <>
          <IndexHeader />
          <IndexContainer>
            <IndexImage alt="testImg" src="img/test2.jpg" />
          </IndexContainer>
          <Footer>Copyright &copy;nsoo</Footer>
        </>
      )}
    </ALL>
  );
};
