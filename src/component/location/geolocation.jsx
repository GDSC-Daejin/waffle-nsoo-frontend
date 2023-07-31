import React, { useState } from "react";
import Korea from "../assets/images/korea.png";
import { styled } from "styled-components";
import cityList from "../assets/data/List.js";
import Weather from "../pages/weather";
import Weathers from "../assets/images/weather.jpeg";

const All = styled.div`
  height: 100vh;
  background-image: url(${Weathers});
  background-repeat: no-repeat;
  background-size: cover;
`;

const Title = styled.h1`
  display: flex;
  width: 100%;
  margin: 0;
  font-size: 2.6rem;
  border-bottom: 2px solid;
  background-color: #0b2447;
  color: white;
  justify-content: center;
`;

const Location = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  height: 700px;
  position: fixed;
  left: 25%;
  top: 10%;
`;

const Seoul = styled.button`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
`;

const LocationInfo = styled.div`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  background-color: white;
  padding: 10px;
  font-weight: bold;
  font-size: 10px;
  border-radius: 50%;
`;

export default function Geolocation() {
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleChange = (name, top, left) => {
    setSelectedLocation({ name, top, left });
  };

  return (
    <All>
      <Title>야구장 날씨</Title>
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
  );
}
