import React, { useState } from "react";
import Korea from "../assets/images/korea.png";
import { styled } from "styled-components";
import cityList from "../assets/data/List.js";
import Weather from "../pages/Weather";
import Weathers from "../assets/images/weather.jpeg";
import Header from "../Navigation/Header";
import GlobalStyle from "../styles/Globalstyles";

const All = styled.div`
  height: 100vh;
  background-image: url(${Weathers});
  background-repeat: no-repeat;
  background-size: cover;
`;

/* 한국 지도 부분 스타일 */
const Location = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  height: 700px;
  position: fixed;
  left: 25%;
  top: 20%;
`;

/* 지역 선택하는 클릭파트 */
const Seoul = styled.button`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  &: hover {
    background-color: #576CBC;
    transition: 0.3s;
  }
`;

/* 지역명 표시 툴팁 */
const LocationInfo = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  background-color: white;
  padding: 5px 10px 10px 10px;
  font-weight: bold;
  font-size: 10px;
  text-align: center;
  border-radius: 50%;
  height: 23px;
`;

export default function Geolocation() {
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleChange = (name, top, left) => {
    setSelectedLocation({ name, top, left });
  };

  return (
    <>
      <All>
        <GlobalStyle />
      <Header />
        <Location>
          <img src={Korea} width={400} alt="Korea" />
          {cityList.map((item) => (
            <Seoul
              key={item.id}
              top={item.top}
              left={item.left}
              onClick={() => handleChange(item.name, item.top, item.left)}
            ></Seoul>
          ))}
          {selectedLocation && (
            <LocationInfo top={selectedLocation.top} left={selectedLocation.left}>
              {selectedLocation.name}
              <Weather selectedLocation={selectedLocation.name} />
            </LocationInfo>
          )}
        </Location>
      </All>
    </>
  );
}
