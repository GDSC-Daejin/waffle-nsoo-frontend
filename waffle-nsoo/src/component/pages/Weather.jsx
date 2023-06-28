import React, { startTransition, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import sunnyIcon from "../assets/icons/01d.png";
import moonIcon from "../assets/icons/02n.png";
import shallowCloudIcon from "../assets/icons/02d.png";
import thickCloudIcon from "../assets/icons/03d.png";
import nightCloudIcon from "../assets/icons/03n.png";
import cloudIcon from "../assets/icons/04d.png";
import rainyIcon from "../assets/icons/09d.png";
import rainIcon from "../assets/icons/10d.png";
import thunderstormIcon from "../assets/icons/11d.png";
import snowIcon from "../assets/icons/13d.png";
import windyIcon from "../assets/icons/50d.png";
import nightCloudIcon2 from "../assets/icons/04n.png";
import nightShallowCloudIcon from "../assets/icons/04n.png";
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
  background-position: center;
  border-radius: 22px;
  p {
    font-size: 25px;
  }
`;

const CurrentWeather = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  margin-bottom: 50px;
  height: 300px;
  font-size: 30px;
`;

const CityListItem = styled.div`
  font-size: 25px;
  height: 50px;
  padding-top: 9px;
  text-align: center;
  border-bottom: 2px solid black;
  width: 100%;
  background: ${({ name, backgroundColor }) =>
    name === "Seoul"
      ? "linear-gradient(To right,  #FF0000, #000080)"
      : backgroundColor};
  color: white;
  box-sizing: border-box;
  border-radius: 20px;
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

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case "01d":
        return (
          <img
            src={sunnyIcon}
            alt="맑은 하늘"
            width="80"
            height="80"
            style={{ filter: "invert(1)" }}
          />
        );
      case "01n":
        return (
          <img
            src={moonIcon}
            alt="밤 사진"
            width="80"
            style={{ filter: "invert(1)" }}
          />
        );
      case "02d":
        return (
          <img
            src={shallowCloudIcon}
            alt="옅은 구름 사진"
            width="80"
            style={{ filter: "invert(1)" }}
          />
        );
      case "02n":
        return (
          <img
            src={nightShallowCloudIcon}
            alt="옅은 구름 사진"
            width="80"
            style={{ filter: "invert(1)" }}
          />
        );
      case "03d":
        return (
          <img
            src={thickCloudIcon}
            alt="짙은 구름 사진"
            width="80"
            style={{ filter: "invert(1)" }}
          />
        );
      case "03n":
        return (
          <img
            src={nightCloudIcon}
            alt="밤 구름 사진"
            width="80"
            style={{ filter: "invert(1)" }}
          />
        );
      case "04d":
        return (
          <img
            src={cloudIcon}
            alt="구름 사진"
            width="80"
            style={{ filter: "invert(1)" }}
          />
        );
      case "04n":
        return (
          <img
            src={nightCloudIcon2}
            alt="구름 사진"
            width="80"
            style={{ filter: "invert(1)" }}
          />
        );
      case "09d":
        return (
          <img
            src={rainyIcon}
            alt="비 사진"
            width="80"
            style={{ filter: "invert(1)" }}
          />
        );
      case "09n":
        return (
          <img
            src={rainyIcon}
            alt="밤 비 사진"
            width="80"
            style={{ filter: "invert(1)" }}
          />
        );
      case "10d":
        return (
          <img
            src={rainIcon}
            alt="비가 많이 오는 사진"
            width="80"
            style={{ filter: "invert(1)" }}
          />
        );
      case "11d":
        return (
          <img
            src={thunderstormIcon}
            alt="번개치는 사진"
            width="80"
            style={{ filter: "invert(1)" }}
          />
        );
      case "11n":
        return (
          <img
            src={thunderstormIcon}
            alt="밤에 번개치는 사진"
            width="80"
            style={{ filter: "invert(1)" }}
          />
        );
      case "13d":
        return (
          <img
            src={snowIcon}
            alt="눈오는 사진"
            width="80"
            style={{ filter: "invert(1)" }}
          />
        );
      case "13n":
        return (
          <img
            src={snowIcon}
            alt="눈오는 사진"
            width="80"
            style={{ filter: "invert(1)" }}
          />
        );
      case "50d":
        return (
          <img
            src={windyIcon}
            alt="바람이 부는 사진"
            width="80"
            style={{ filter: "invert(1)" }}
          />
        );
      case "50n":
        return (
          <img
            src={windyIcon}
            alt="저녁에 바람이 부는 사진"
            width="80"
            style={{ filter: "invert(1)" }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <WeatherContainer>
      {weatherData.map((data, index) => (
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
            오늘의 날씨 : {getWeatherIcon(data.weather[0].icon.slice(0, 3))}
            <p>온도: {(data.main.temp - 273.15).toFixed(2)}°C</p>
          </CurrentWeather>
        </WeatherBox>
      ))}
      <BtnsContainer>
        <Btns onClick={() => buttonHandler(-1)}> {"<"}</Btns>
        <Btns onClick={() => buttonHandler(1)}> {">"}</Btns>
      </BtnsContainer>
    </WeatherContainer>
  );
};

export default Weather;
