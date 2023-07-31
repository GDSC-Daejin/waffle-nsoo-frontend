import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Header from "../Navigation/Header";
import GlobalStyle from "../styles/Globalstyles";

const data = [
  {
    name: "SSG 랜더스필드",
    hashtag: "#인천",
    meet: "#야구장 ⚾︎",
    into: "#SSG",
    into1: "#직관",
    path: "incheon",
  },
  {
    name: "NC 다이노스 파크",
    hashtag: "#창원",
    meet: "#야구장 ⚾︎",
    into: "#NC",
    into1: "#직관",
    path: "changwon",
  },
  {
    name: "이글스 파크",
    hashtag: "#대전",
    meet: "#야구장 ⚾︎",
    into: "#한화",
    into1: "#직관",
    path: "daejeon",
  },
  {
    name: "고척 스카이돔",
    hashtag: "#고척",
    meet: "#야구장 ⚾︎",
    into: "#키움",
    into1: "#직관",
    path: "gocheock",
  },
  {
    name: "KIA 챔피언스 필드",
    hashtag: "#광주",
    meet: "#야구장 ⚾︎",
    into: "#기아",
    into1: "#직관",
    path: "gwangju",
  },
  {
    name: "잠실 야구장",
    hashtag: "#잠실",
    meet: "#야구장 ⚾︎",
    into: "#엘지 #두산",
    into1: "#직관",
    path: "jamsil",
  },
  {
    name: "사직 야구장",
    hashtag: "#사직",
    meet: "#야구장 ⚾︎",
    into: "#롯데",
    into1: "#직관",
    path: "sajik",
  },
  {
    name: "수원 KT wiz파크",
    hashtag: "#수원",
    meet: "#야구장 ⚾︎",
    into: "#KT",
    into1: "#직관",
    path: "suwon",
  },
];

const Main = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(150deg, #A5D7E8, #576CBC);
`;

const Title = styled.h1`
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 5rem;
  font-weight: bold;
  padding-top: 3rem;
  margin-left: 20rem;
`;

const SubTitle = styled.h2`
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 3rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-left: 21rem;
`

const Body = styled.div`
  gap: 130px;
  width: 80%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  top: 3%;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  height: 1px;
`;

const BodyContainer = styled.div`
  flex-direction: column;
  border: 1px solid;
  height: 460px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  border: none;
  background-color: #A5D7E8; 
`;

const Image = styled.img`
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  padding: 5px;
  border-radius: 10px;
`;

const StadiumName = styled.h3`
  display: flex;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  margin-top: 10px;
  height: 30px;
  align-items: center;
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
`;

const HashTag1 = styled.div`
  border: 1px solid;
  width: 70px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  border: none;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  padding: 3px 0 3px 0;
  background-color: #576CBC;
  color: #eee;
  font-weight: 400;
`;

const storageRef = getStorage();
const listRef = ref(storageRef, "images/");

export default function Home() {
  const [imageList, setImageList] = useState([]);
  
  const navigate = useNavigate();
  const [showImages, setShowImages] = useState(true);

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
  }, []);


  const handleClick = (path) => {
    setShowImages(false);
    navigate(`/${path}`);
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      <Main>
        <Title>야구장을 선택해주세요</Title>
        <SubTitle>보고 싶은 구장을 선택하세요</SubTitle>
        <Body>
          {showImages &&
            imageList.map((url, index) => (
              <BodyContainer
                key={index}
                onClick={() => handleClick(data[index].path)}
              >
                <Image src={url} alt="Ground" width={300} height={360} />
                <StadiumName>{data[index].name}</StadiumName>
                <Tag>
                  <HashTag1>{data[index].hashtag}</HashTag1>
                  <HashTag1>{data[index].meet}</HashTag1>
                  <HashTag1>{data[index].into}</HashTag1>
                  <HashTag1>{data[index].into1}</HashTag1>
                </Tag>
              </BodyContainer>
            ))}
        </Body>
      </Main>
    </>
  );
}
