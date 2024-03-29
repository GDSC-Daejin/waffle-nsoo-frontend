import React, { useEffect, useState } from "react";
import cityList from "../assets/data/List";
import { styled } from "styled-components";

const WeatherContainer = styled.div`
  display: flex;
  position: fixed;
  top: 25%;
  left: 60%;
  width: 400px;
  height: 500px;
  border: 1px solid;
  flex-direction: column;
  background-color: ${(props) => props.backgroundColor};
  color: white;
  border-radius: 10%;
  @media (max-width: 868px) {
    width: 40%;
    height: 40%;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    position: fixed;
    left: 60%;
  }
`;

const Title = styled.h1`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 10px 17px 10px;
  font-size: 50px;
  width: 100%;
  justify-content: center;
  border-bottom: 1px solid;
  @media (max-width: 868px) {
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    font-size: 30px;
  }
`;

const WeatherBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;
  @media (max-width: 868px) {
    font-size: 20px;
    display: flex;
  }
`;

const NowWeather = styled.h1`
  width: 250px;
  margin-top: 4rem;
  font-size: 5rem;
  text-align: center;
`;

const NowHumi = styled.h2`
  font-size: 2.5rem;
  margin-top: 2rem;
`;

const NowTemper = styled.h1`
  font-size: 3rem;
  margin-top: 2.5rem;
`;

export default function Weather({ selectedLocation }) {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    Promise.all(
      cityList
        .filter((city) => city.name === selectedLocation)
        .map((city) =>
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=eb6ead89e7b4d13d472f4340f40d5529`
          ).then((res) => res.json())
        )
    )
      .then((data) => setWeatherData(data))
      .catch((error) => console.log(error));
  }, [selectedLocation]);

  if (weatherData.length === 0) {
    return <div>Loading...</div>;
  }

  const selectedCity = cityList.find((city) => city.name === selectedLocation);
  const backgroundColor = selectedCity ? selectedCity.backgroundColor : "";

  return (
    <>
      {weatherData.map((data) => {
        const Temp = data.main.temp;
        const Today = Temp - 273.15;
        const Main = data.weather[0].main;
        const WeatherIcon = data.weather[0].icon;
        const Key = data.weather[0].id;
        const Humidity = data.main.humidity;

        return (
          <WeatherContainer backgroundColor={backgroundColor} key={Key}>
            <Title>{selectedLocation}</Title>
            <WeatherBox>
              <NowWeather>" {Main} "</NowWeather>
              <img
                src={`http://openweathermap.org/img/wn/${WeatherIcon}@2x.png`}
                width={150}
              />
              <NowTemper>현재 기온 : {Today.toFixed(1)}°C</NowTemper>
              <NowHumi>습도: {Humidity}%</NowHumi>
            </WeatherBox>
          </WeatherContainer>
        );
      })}
    </>
  );
}
