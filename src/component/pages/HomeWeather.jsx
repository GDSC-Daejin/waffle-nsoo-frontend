import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import List from "../assets/data/List";
import { styled } from "styled-components";

const WeatherBox = styled.div`
  width: 100rem;
  height: 60rem;
  border: none;
  border-radius: 20px;
  background: #0B2447;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  color: #eee;
  font-weight: 800;
`;

const WeatherBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
`;

const WeatherIcon = styled.img`
  margin-bottom: 2rem;
  flex: 1;
  width: 250px;
  height: 300px;
`;

const CityName = styled.h1`
  font-weight: 700;
  font-size: 5rem;
  flex: 1;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
`;

const TodayWeather = styled.div`
  font-size: 5rem;
  display: flex;
  padding: 3rem 0 4rem 0;
`;

const TodayValue = styled.div`
  flex: 1;
  p {
    font-size: 4rem;
    margin-bottom: 3.5rem;
  }
`;

const BtnLeft = styled.button`
  width: 13rem;
  height: 3.5rem;
  font-size: 2rem;
  font-weight: bold;
  margin-right: 0.2rem;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #A5D7E8;
  color: #576CBC;
  &: hover {
    background-color: #576CBC;
    transition: 0.3s;
    color: white;
  }
`;

const BtnRight = styled.button`
  width: 13rem;
  height: 3.5rem;
  font-size: 2rem;
  font-weight: bold;
  margin-right: 0.2rem;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #A5D7E8;
  color: #576CBC;
  &: hover {
    background-color: #576CBC;
    transition: 0.3s;
    color: white;
  }
`;

const BtnContainer = styled.div`
  align-items: center;
  justify-content: center;
  margin: 2rem 0 5rem 0;
`;

export default function Weather() {
  const [city] = useState(List);
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

  return (
    <>
      {currentWeather && (
        <WeatherBox>
          <TodayWeather>오늘 날씨</TodayWeather>
          <WeatherBlock>
            <CityName>{currentWeather.name}</CityName>            
              <WeatherIcon
                src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
                width={100}
                alt="Weather Icon"
              />
            <TodayValue>
              <p>온도: {(currentWeather.main.temp - 273.15).toFixed(1)}°C</p>
              <p>습도: {currentWeather.main.humidity}%</p>
            </TodayValue>
          </WeatherBlock>
          <BtnContainer>
            <BtnLeft onClick={handlePrevious}>{"<"}</BtnLeft>
            <BtnRight onClick={handleNext}>{">"}</BtnRight>
          </BtnContainer>
        </WeatherBox>
      )}
    </>
  );
}
