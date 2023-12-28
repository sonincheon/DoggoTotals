import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
// import { useNavigate } from "react-router-dom";
import { StrayAxiosApi } from "../../../api/StraysApi";
import CurrentAddressContext from "../CurrentAddressContext";

const STRAY_DETAIL_URL =
  "https://www.animal.go.kr/front/awtis/public/publicDtl.do?desertionNo=";


const slide = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-50%);
  }
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 99%;
  padding-bottom: 1%;
  border-radius: 10px;
`;

const SliderTrack = styled.div`
  display: flex;
  height: 40%;
  width: calc(40vw * ${(props) => props.$extendedStraysLength});
  animation: ${slide} 5760s linear infinite;
`;

const Banner = styled.div`
  height: 10%;
  width: 100%;
  border: 1px solid black;
  border-radius: 10px 10px 0 0;
  background-color: #b0a695;
`;

const Slide = styled.div`
  width: 10vw;
  height: 100%;
  margin-right: 0.5vw;
  padding: 0;
  cursor: pointer;

  img {
    width: 100%;
    height: 80%;
    object-fit: cover;
  }
`;

const InfoArea = styled.div`
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1vw;
  border: 1px solid black;
  border-radius: 0 0 10px 10px;
  background-color: #b0a695;
`;

const Strays = () => {
  const [strays, setStrays] = useState([]);
  const { currentAddress } = useContext(CurrentAddressContext);
  const extendedStrays = [...strays, ...strays];

  useEffect(() => {
    const loadStrays = async () => {
      try {
        // currentAddress를 공백으로 나누어 배열 생성
        const addressParts = currentAddress.split(" ");
        // 배열의 첫 번째 요소 사용
        const region = addressParts[0];

        const data = await StrayAxiosApi.getStrays(region);
        // console.log(data);
        setStrays(data);
      } catch (error) {
        console.error("Error fetching strays:", error);
      }
    };

    if (currentAddress) {
      loadStrays();
    }
  }, [currentAddress]);

  const handleSlideClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <SliderContainer>
        <Banner />
        <SliderTrack $extendedStraysLength={extendedStrays.length}>
          {extendedStrays.map((stray, index) => (
            <Slide
              key={index}
              onClick={() =>
                handleSlideClick(STRAY_DETAIL_URL + stray.animalNumber)
              }>
              <img src={stray.imageLink} alt={`Stray ${stray.breed}`} />
              <InfoArea>
                <p>보호소 위치: {stray.city}</p>
                <p>품종: {stray.breed}</p>
              </InfoArea>
            </Slide>
          ))}
        </SliderTrack>
      </SliderContainer>
    </>
  );
};

export default Strays;
