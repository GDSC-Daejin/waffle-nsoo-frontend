import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { useNavigate } from "react-router-dom";

const data = [
  {
    name: "ssg 랜더스필드",
    hashtag: "#인천",
    meet: "#야구장 ⚾︎",
    into: "#SSG",
    into1: "#직관",
    path: "incheon",
  },
  {
    name: "nc다이노스 파크",
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
    name: "kia 챔피언스 필드",
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
    name: "수원 kt_wiz파크",
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
`;

const Header = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  border-bottom: 2px solid;
  height: 10%;
  align-items: center;
  font-size: 2.4rem;
  font-weight: 700;
  margin: 0 auto;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
`;

const BodyContainer = styled.div`
  flex-direction: column;
  border: 1px solid;
  height: 60vh;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
`;

const Image = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  border-radius: 10px;
`;

const Stadium_name = styled.h3`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid;
  margin: 0;
  height: 30px;
  align-items: center;
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
`;

const HashTag1 = styled.div`
  border: 1px solid;
  width: 65px;
  display: flex;
  justify-content: center;
  font-size: 14px;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  background-color: #e6e6e6ff;
  color: #3b3b3bff;
  font-weight: 600;
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

  const handleHome = () => {
    setShowImages(true);
    navigate("/");
  };

  const handleClick = (path) => {
    setShowImages(false);
    navigate(`/${path}`);
  };

  return (
    <Main>
      <Header onClick={handleHome}>kbo 매칭⚾︎</Header>
      <Title>야구장을 선택해주세요</Title>
      <Title>보고 싶은 구장을 선택하세요</Title>
      <Body>
        {showImages &&
          imageList.map((url, index) => (
            <BodyContainer
              key={index}
              onClick={() => handleClick(data[index].path)}
            >
              <Image>
                <img src={url} alt="Image" width={300} height={360} />
              </Image>
              <Stadium_name>{data[index].name}</Stadium_name>
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
  );
}
