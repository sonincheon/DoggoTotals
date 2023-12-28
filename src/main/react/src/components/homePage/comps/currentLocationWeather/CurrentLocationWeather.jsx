import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  dfs_xy_conv,
  onSuccess,
  onError,
} from "./CurrentLocationWeatherFunction";
import { getGeocodeKakao } from "../../../../api/CurrentLocationWeatherApi";
import {
  weather_background,
  good_weather,
  bad_weather,
} from "../../../../img/weather";

import CurrentAddressContext from "../../CurrentAddressContext";

const ItemBox = styled.div.attrs({
  className: "item-container",
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const Items = styled.div.attrs({
  className: "item-currentWeather",
})`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 97%;
  height: 90%;

  border-radius: 10px;
  /* box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2); */
`;

const TopBox = styled.div`
  display: flex;

  justify-content: center;
  height: 40%;
  width: 100%;

  border-radius: 10px 10px 0 0;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 60%;
`;

const TextContainer = styled.div.attrs({
  className: "text-container",
})`
  display: flex;
  flex-direction: ${(props) => props.$direction || "row"};
  justify-content: ${(props) => props.$justify || "none"};
  align-items:  ${(props) => props.$justify || "center"};
  padding-left: 1vw;
  height: ${(props) => props.$height || "30%"};
  width: ${(props) => props.$width || "100%"};
  text-overflow: ellipsis;

  h2 {
    font-size: 2.7vw;
  }
  h1 {
    font-size: 5vw;
  }
  .text-primary {
    color: #ed6436;
  }
  .text-secondary {
    color: #65c178;
  }

  h3 {
    font-size: 1.3vw;
    color: #9399a2ff;
  }
  p {
    font-size: 1vw;
    color: #9399a2ff;
  }
`;

const WeatherIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 40%;
  /* border: 1px solid black; */
`;

const HourlyWeatherInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 27%;
  background-color: rgb(234, 236, 239);
  border-radius: 24px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px;
  overflow-x: auto;
`;

const HourlyWeatherCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  min-width: 5vw;
  border: 0.3px solid #ddd;
  /* border-radius: 10px; */


  h3 {
    font-size: 2vw;
    font-weight: bold;
  }
  p {
    font-size: 1vw;
    color: #9399a2ff;
  }


`;

const WeatherDetail = styled.div`
  display: flex;
  flex-direction: column;
  height: 30%;
  width: 100%;
  background-color: rgb(234, 236, 239);
  border-radius: 24px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 0px 0px;
`;

const WeatherDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) => props.$align || "center"};

  height: ${(props) => props.$height || "50%"};
  width: 100%;
`;

const WeatherDetailBox = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  
  align-items: center;
`;

const CurrentLocationWeather = () => {
  // 리액트 라이브러리로 위도경도를 구하는 훅
  const [location, setLocation] = useState({ lat: 0, long: 0 });
  // api 요청을 통해 정보획들 실패 에러 스테이트훅
  const [error, setError] = useState(null);
  // 카카오 api에서 위도경도로 주소값 얻어오는 스테이트훅
  const [address, setAddress] = useState("");
  // 기상청에 전달할 지리정보를 구하는 스테이트 훅
  const [coords, setCoords] = useState("");
  // 파이썬에서 넘어온 실시간 기상정보 스테이트훅
  const [currentWeather, setCurrentWeather] = useState("");
  // 파이썬에서 넘어온 현재시간 이후 24시간 날씨정보 스테이트훅
  const [hourlyWeather, setHourlyWeather] = useState([]);
  // 좋음/나쁨 표현을 위한 스테이트훅
  // const [weatherCondition, setWeatherCondition] = useState(null);
  // 현재 위치값을 메인페이지에 한해서 공유하는 컨테스트훅
  const { setCurrentAddress } = useContext(CurrentAddressContext);

  // 리액트 라이브러리를 통해 위도/경도를 얻어오는 이펙트훅
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => onSuccess(position, setLocation),
      (error) => onError(error, setError)
    );
    // console.log(location);
  }, []);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);
  // 카카오 api에 위도/경도를 통해 주소값을 얻어오는 이펙트훅
  useEffect(() => {
    const updateAddress = async () => {
      try {
        const addr = await getGeocodeKakao(location.lat, location.long);
        setAddress(addr);
        setCurrentAddress(addr); // 메인페이지 한해서 전역적으로 쓰기 위해 할당
      } catch (error) {
        console.error("Kakao Geocoding error:", error);
      }
    };
    // 실시간 위도/경도 정보가 바뀔시, 재차 카카오 api 요청 및 x 값 y 값 요청
    if (location.lat && location.long) {
      updateAddress();
      setCoords(dfs_xy_conv("toXY", location.lat, location.long));
    }
  }, [location.lat, location.long]);

  // 플라스크서버로 xy값과 함께 api 요청을 하는 이펙트훅
  useEffect(() => {
    const updateWeather = async () => {
      if (coords.x && coords.y) {
        try {
          // 두 API 요청을 동시에 호출
          const currentWeatherResponse = axios.get(
            `http://127.0.0.1:5000/api/weather?x=${coords.x}&y=${coords.y}`
          );
          const hourlyWeatherResponse = axios.get(
            `http://127.0.0.1:5000/api/hourly_weather?x=${coords.x}&y=${coords.y}`
          );

          // 모든 요청이 완료될 때까지 기다림
          const [currentWeather, hourlyWeatherData] = await Promise.all([
            currentWeatherResponse,
            hourlyWeatherResponse,
          ]);

          // 상태 업데이트
          setCurrentWeather(currentWeather.data);
          setHourlyWeather(hourlyWeatherData.data);
          console.log(hourlyWeatherData.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    updateWeather();
    
  }, [coords]);

  // 날씨 상태값 0 ~ 7 을 바탕으로 맑은경우 산책 지수 좋음 , 아닌경우 나쁨
  // useEffect(() => {
  //   if (parseInt(weather.condition) === 0) {
  //     setWeatherCondition(true);
  //   } else {
  //     setWeatherCondition(false);
  //   }
  // }, [weather]);

  // api로 넘어온 객체배열중 첫번째는 무조건 현재시간 날씨이기 때문에 0번 인덱스 따로 분류
  const firstKey =
    Object.keys(hourlyWeather).length > 0
      ? Object.keys(hourlyWeather)[0]
      : null;

  // 날짜 정보를 12시간 단위의 오전오후로 만들기
  const formatTime = (key) => {
    let timeString = key.slice(8, 10) + ":" + key.slice(10, 12); 
    const hour = parseInt(timeString.slice(0, 2), 10); 
    const amPm = hour >= 12 ? "오후" : "오전";
    const formattedHour = hour % 12 || 12; 
    return formattedHour + timeString.slice(2) + " " + amPm; 
  
  
  };

  return (
    <>
      <ItemBox>
        <Items>
          <TopBox>
            <TextArea>
              <TextContainer>
                <h2>{address}</h2>
              </TextContainer>
              <TextContainer $height="10%">
                {firstKey && (
                  <p>강수확률: {hourlyWeather[firstKey].rain_chance}</p>
                )}
              </TextContainer>
              <TextContainer $height="60%">
                <h1>{currentWeather.temperature}</h1>
              </TextContainer>
            </TextArea>
            <WeatherIconContainer></WeatherIconContainer>
          </TopBox>

          <HourlyWeatherInfo>
            {Object.keys(hourlyWeather).map((key, index) => {
              const data = hourlyWeather[key];
              const displayTime = index === 0 ? "현재" : formatTime(key); 

              return (
                <HourlyWeatherCard key={key}>
                  <p>{displayTime}</p> 
                  
                  <div>{data.condition}</div>
                  <div>{data.sky}</div>
                  <h3>{data.tmperature}</h3>
                </HourlyWeatherCard>
              );
            })}
          </HourlyWeatherInfo>

          <WeatherDetail>
            <WeatherDetailContainer $height="20%">
              <TextContainer>
                <p>세부정보</p>
              </TextContainer>
            </WeatherDetailContainer>

            <WeatherDetailContainer $height="40%" $align="none">
              <WeatherDetailBox>
                <TextContainer>
                  <h3>습도</h3>
                </TextContainer>
                <TextContainer>
                  <h3>풍속</h3>
                </TextContainer>
              </WeatherDetailBox>
              <WeatherDetailBox>
                <TextContainer >
                  <h2>{currentWeather.humidity}</h2>
                </TextContainer>
                <TextContainer>
                  <h2>{currentWeather.wind}</h2>
                </TextContainer>
              </WeatherDetailBox>
            </WeatherDetailContainer>

            <WeatherDetailContainer $height="40%" $align="none">
              <WeatherDetailBox>
                <TextContainer>
                  <h3>강수형태</h3>
                </TextContainer>
                <TextContainer>
                  <h3>시간당 강수량</h3>
                </TextContainer>
              </WeatherDetailBox>
              <WeatherDetailBox>
                <TextContainer>
                  <h2>{currentWeather.condition}</h2>
                </TextContainer>
                <TextContainer>
                  <h2>{currentWeather.rain}</h2>
                </TextContainer>
              </WeatherDetailBox>
            </WeatherDetailContainer>
          </WeatherDetail>
        </Items>
      </ItemBox>
    </>
  );
};

export default CurrentLocationWeather;

const GoodOrBad = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60%;
  width: 100%;

  background-image: url(${weather_background});
  background-size: cover;
  background-position: center;
`;

const WeatherStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 60%;
  width: 30%;
`;

const DoggyIcon = styled.img`
  height: 70%;
  width: 70%;
  object-fit: contain;
`;
