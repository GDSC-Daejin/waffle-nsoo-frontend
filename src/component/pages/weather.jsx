import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import List from "../assets/data/List";
import styled from "styled-components";

const WeatherBox = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  background-image: ${(props) => `url(${props.backgroundImage})`};
  background-size: cover;
  color: white;
  font-weight: 800;
`;

const Title = styled.h1`
  font-weight: 700;
  border-bottom: 1px solid;
`;

const TodayWeather = styled.div`
  width: 90px;
`;

const Btn = styled.button`
  width: 130px;
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Weather() {
  const [city, setCity] = useState(List);
  const [currentCityIndex, setCurrentCityIndex] = useState(0);

  const { isLoading, error, data } = useQuery(["weather"], async () => {
    const responses = await Promise.all(
      city.map((citys) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${citys.name}&appid=9143ecd93a4dda0a18e7aaafd4c2676a`
        )
      )
    );
    return responses.map((response) => response.data);
  });

  if (isLoading) return "Loading...";
  if (error) return "Error: " + error.message;

  const handlePrevious = () => {
    setCurrentCityIndex((prevIndex) =>
      prevIndex === 0 ? city.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentCityIndex((prevIndex) =>
      prevIndex === city.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentWeather = data && data[currentCityIndex];
  const backgroundImage = List.map((item) => item.backgroundImage);

  return (
    <>
      {currentWeather && (
        <WeatherBox
          style={{
            backgroundImage: `url(${backgroundImage[currentCityIndex]})`,
          }}
        >
          <Title>{currentWeather.name}</Title>
          <TodayWeather>
            오늘의 날씨 :{" "}
            <img
              src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
              width={100}
              alt="Weather Icon"
            />
          </TodayWeather>
          <p>온도: {(currentWeather.main.temp - 273.15).toFixed(1)}°C</p>
          <p>습도: {currentWeather.main.humidity}%</p>
        </WeatherBox>
      )}
      <BtnContainer>
        <Btn onClick={handlePrevious}>{"<"}</Btn>
        <Btn onClick={handleNext}>{">"}</Btn>
      </BtnContainer>
    </>
  );
}
