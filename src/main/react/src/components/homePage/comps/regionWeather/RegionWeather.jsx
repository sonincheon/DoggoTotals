import React, { useState, useEffect } from "react";
import styled from "styled-components";
import mapOfKorea from "../../../../img/weather/mapOfKorea.png";
import {
  citiesData,
  CityComponent,
  getCurrentDate,
  getWeekDays,
  formatDateWithDay,
} from "./RegionWeatherFunction";
import { WeatherAxiosApi } from "../../../../api/RegionWeatherApi";

const ItemBox = styled.div.attrs({
  className: "item-container",
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  
   
`;

const Items = styled.div.attrs({
  className: "item-regionWeather",
})`
  display: flex;
  flex-direction: column;
  width: 97%;
  height: 90%;
  border-radius: 10px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
`;
const Banner = styled.div`
  display: flex;
  flex-direction: column;
  height: 25%;
  width: 100%;
  background-color: white;
  border-radius: 10px 10px 0 0;
  
`;

const BannerTitle = styled.div`
  display: flex;
  align-items: center;
  height: 35%;
  width: 100%;
  font-size: 2vw;
  color: #000;
  background-color: white;
  color: #9399a2ff;
  border-radius: 10px 10px 0 0;
  padding-left: 1vw;
  /* z-index: ; */
`;

const DayOfWeekBar = styled.div`
  display: flex;
  align-items: center;
  height: 65%;
  overflow: hidden;
  
`;

// 건들면 으르렁
const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(20, minmax(0, 1fr));
  grid-template-rows: repeat(30, minmax(0, 1fr));
  grid-gap: 5px; // 셀 간 간격
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0 0 10px 10px;
  background-color: #85c6f8;
  overflow: hidden;
  

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); // 중앙 정렬
    width: 70%;
    height: 100%;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 3%;
  left: 3%;
  z-index: 99; /* 예시로 낮은 값 */
  
`;

const Button = styled.button`
  top: 2%; // 상단으로부터 적절한 거리를 주어 위치시킵니다.
  background-color: ${(props) =>
    props.$isActive
      ? "#4a90e2"
      : "#ffffff"}; // 활성화 상태에 따라 배경색을 설정합니다.
  color: ${(props) =>
    props.$isActive
      ? "#ffffff"
      : "#000000"}; // 활성화 상태에 따라 텍스트 색상을 설정합니다.
  border: ${(props) =>
    props.$isActive
      ? "none"
      : "1px solid #979797"}; // 비활성화 상태일 때 테두리를 설정합니다.
  width: 15%; // 버튼의 너비를 설정합니다.
  height: 6%; // 버튼의 높이를 설정합니다.

  text-align: center;
  display: inline-block;
  font-size: 1vw;
  cursor: pointer;
    
  z-index: 10; // 다른 요소들 위에 오도록 z-index 설정
`;

const MorningButton = styled(Button)`
  border-radius: 5px 0 0 5px; // 오전 버튼은 오른쪽 모서리만 둥글게
  white-space: nowrap;
  cursor: pointer;
  z-index: 100; // 다른 요소들 위에 오도록 z-index 설정
  
`;

const AfternoonButton = styled(Button)`
  border-radius: 0 5px 5px 0; // 오후 버튼은 왼쪽 모서리만 둥글게
  white-space: nowrap;
  cursor: pointer;
  z-index: 100; // 다른 요소들 위에 오도록 z-index 설정
  
`;

const DayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  color: #202b3bff;  
  height: 100%;
  background-color: white;
  font-size: 1vw;
  border: none;
  color: #808080;
  white-space: nowrap;
  cursor: pointer;
 

  &.isActive {
    color: #29a0fe; // 활성화 상태에서의 글자색
  }

  .dayOfWeek {
    font-size: 1vw; // 요일 글자 크기
  }

  .date {
    font-size: 0.8vw; // 날짜 글자 크기
    color: #4a90e2; // 활성화 되었을 때의 날짜 글자색
  }
`;

const RegionWeather = () => {
  // 오늘 날짜를 구하는 함수

  const today = getCurrentDate();
  const weekDates = getWeekDays();
  const [selectedDate, setSelectedDate] = useState(today);
  // 날씨 정보 api 데이터를 받아오기 위한 useState
  const [weatherData, setWeatherData] = useState({});
  // 오전 오후 토글 기능을 위한 useState
  const [morningAfternoon, setMorningAfternoon] = useState(true);

  // 날씨데이터를 setWeatherData에 전달하기 위한 useEffect 후욱후욱
  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        const response = await WeatherAxiosApi.getWeathers();
        // API 응답 확인용 콘솔
        // console.log("API response:", response);
        setWeatherData(response);
      } catch (error) {
        console.error("API 응답 실패 :", error);
      }
    };

    loadWeatherData();
  }, []);

  // api로 데이터를 불러오지않았는데 , 렌더링되어서 에러가 뜨는 것을 방지하는 함수
  const isDataLoaded = Object.keys(weatherData).length > 0;

  // 오전 버튼
  const showMorningData = () => {
    setMorningAfternoon(true);
  };

  // 오후 버튼
  const showAfternoonData = () => {
    setMorningAfternoon(false);
  };
  // 요일 버튼
  const handleDayButtonClick = (date) => {
    // 요일 클릭시 date 값 전달 확인 콘솔
    // console.log(date);
    setSelectedDate(date);
  };

  return (
    <ItemBox>
      <Items>
        <Banner>
          <BannerTitle>전국산책지수</BannerTitle>

          <DayOfWeekBar>
            {weekDates.map((date) => (
              <DayButton
                key={date}
                onClick={() => handleDayButtonClick(date)}
                className={selectedDate === date ? "isActive" : ""}>
                {formatDateWithDay(date)}
              </DayButton>
            ))}
          </DayOfWeekBar>
        </Banner>
        <ImageContainer>
          <ButtonContainer>
            <MorningButton
              onClick={showMorningData}
              $isActive={morningAfternoon}>
              오전
            </MorningButton>
            <AfternoonButton
              onClick={showAfternoonData}
              $isActive={!morningAfternoon}>
              오후
            </AfternoonButton>
          </ButtonContainer>
          <img src={mapOfKorea} alt="Korea Map" />
          {isDataLoaded &&
            citiesData.map((city) => {
              const cityWeatherData = weatherData[city.name];
              // 현재 선택된 날짜에 해당하는 날씨 데이터를 찾습니다.
              const selectedWeather = cityWeatherData.find(
                (weather) => weather.weatherDate === parseInt(selectedDate)
              );

              return (
                <CityComponent
                  key={city.name}
                  city={city}
                  weather={selectedWeather} // 선택된 날짜의 날씨 데이터 전달
                  isMorning={morningAfternoon} // 오전/오후 상태 전달
                />
              );
            })}
        </ImageContainer>
      </Items>
    </ItemBox>
  );
};

export default RegionWeather;
