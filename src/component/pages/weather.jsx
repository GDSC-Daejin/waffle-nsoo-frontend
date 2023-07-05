import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import weather from "../assets/images/weather.jpeg";
import samsung from "../assets/images/samsung.jpg";
import kt from "../assets/images/kt.jpg";
import hanhwa from "../assets/images/hanhwa.jpg";
import nc from "../assets/images/nc.jpg";
import kia from "../assets/images/kia.jpg";
import ssg from "../assets/images/ssg.jpg";
import lotte from "../assets/images/lotte.jpg";
import seoul from "../assets/images/seoul.jpg";

const cityList = [
  {
    name: "Seoul",
    backgroundColor: "#000000",
    backgroundImage: "seoul.jpg",
  },
  { name: "Daegu", backgroundColor: "#2C65B8", backgroundImage: "samsung.jpg" },
  { name: "Gwangju", backgroundColor: "#D52E35", backgroundImage: "kia.jpg" },
  {
    name: "Daejeon",
    backgroundColor: "#D7623D",
    backgroundImage: "hanhwa.jpg",
  },
  { name: "Changwon", backgroundColor: "#294575", backgroundImage: "nc.jpg" },
  { name: "Busan", backgroundColor: "#0C1D43", backgroundImage: "lotte.jpg" },
  { name: "Suwon", backgroundColor: "#020202", backgroundImage: "kt.jpg" },
  { name: "Incheon", backgroundColor: "#AD282F", backgroundImage: "ssg.jpg" },
];

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-image: url(${weather});
  background-repeat: no-repeat;
  background-size: cover;
`;

const WeatherBox = styled.div`
  width: 300px;
  height: 320px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 150px;
  margin-left: auto;
  margin-right: auto;
  background-image: ${({ backgroundImage }) =>
    backgroundImage
      ? `url(${require(`../assets/images/${backgroundImage}`)})`
      : "none"};
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 22px;
`;

const Title = styled.h1`
  border-bottom: 2px solid;
  display: flex;
  margin: 0;
  justify-content: space-between;
  padding-bottom: 10px;
  padding: 10px;
  background-color: #0b2447;
  color: white;
`;

const CurrentWeather = styled.h1`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

const CityListItem = styled.div`
  font-size: 25px;
  height: 40px;
  text-align: center;
  border-bottom: 2px solid black;
  width: 100%;
  background: ${({ name, backgroundColor }) =>
    name === "Seoul"
      ? "linear-gradient(To right,  #FF0000, #000080)"
      : backgroundColor};
  color: white;
  box-sizing: border-box;
  border-radius: 22px;
`;

const BtnsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 200px;
`;

const Btns = styled.button`
  width: 152px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const request = cityList.map(async (city) => {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=9143ecd93a4dda0a18e7aaafd4c2676a`
        );
        return response.data;
      });

      const newData = await Promise.all(request);
      setWeatherData(newData);
    } catch (error) {
      console.log(error);
    }
  }

  const buttonHandler = (increment) => {
    setCurrentIndex((prevIndex) => {
      let newIndex =
        (prevIndex + increment + weatherData.length) % weatherData.length;
      return newIndex;
    });
  };

  return (
    <>
      <WeatherContainer>
        <Title>현재 야구장날씨</Title>
        {weatherData.map((data, index) => {
          const Icon = data.weather[0].icon; // Icon 변수 초기화
          return (
            <WeatherBox
              key={index}
              style={{ display: currentIndex === index ? "flex" : "none" }}
              backgroundImage={cityList[index].backgroundImage}
            >
              <CityListItem
                name={cityList[index].name}
                backgroundColor={cityList[index].backgroundColor}
              >
                {cityList[index].name}
              </CityListItem>
              <CurrentWeather>
                오늘의 날씨 :
                <img
                  src={`http://openweathermap.org/img/wn/${Icon}@2x.png`}
                  width={100}
                />
                <p>온도: {(data.main.temp - 273.15).toFixed(1)}°C</p>
              </CurrentWeather>
            </WeatherBox>
          );
        })}
        <BtnsContainer>
          <Btns onClick={() => buttonHandler(-1)}> {"<"}</Btns>
          <Btns onClick={() => buttonHandler(1)}> {">"}</Btns>
        </BtnsContainer>
      </WeatherContainer>
    </>
  );
};

export default Weather;
