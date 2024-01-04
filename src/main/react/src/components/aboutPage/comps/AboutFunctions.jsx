import React from "react";
import styled from "styled-components";
import feed from "../../../img/homePageImages/aboutFunction/feed.png";
import mapService from "../../../img/homePageImages/aboutFunction/mapService.png";
import schedule from "../../../img/homePageImages/aboutFunction/schedule.png";
import searchAnimal from "../../../img/homePageImages/aboutFunction/searchAnimal.png";
import stray from "../../../img/homePageImages/aboutFunction/stray.png";
import weatherService from "../../../img/homePageImages/aboutFunction/weatherService.png";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ItemBox = styled.div.attrs({
  className: "item-container",
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
`;

const Items = styled.div.attrs({
  className: "item-about-us",
})`
  display: flex;
  justify-content: ${(props) => props.$justify || "none"};
  flex-direction: ${(props) => props.$direction || "column"};

  width: 100%;
  align-items: ${(props) => props.$align || "center"};
  width: ${(props) => props.$width || "100%"};
  height: ${(props) => props.$height || "50%"};
  padding-left: ${(props) => props.$padding || "none"};
  padding-top: ${(props) => props.$padding_top || "none"};
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 90%;
  background-color: white;
`;

const TextContainer = styled.div.attrs({
  className: "text-container",
})`
  display: flex;
  flex-direction: ${(props) => props.$direction || "row"};
  justify-content: ${(props) => props.$justify || "center"};
  height: ${(props) => props.$height || "50%"};
  width: 100%;
  text-overflow: ellipsis;

  h2 {
    font-size: 1.8vw;
    color: #65c178;
  }
  h1 {
    font-size: 3.2vw;
  }
  .text-primary {
    color: #ed6436;
  }
  .text-secondary {
    color: #65c178;
  }

  h3 {
    font-size: 1.3vw;
    color: #6c757d;
  }
  p {
    font-size: 1vw;
    color: #777;
  }
`;

const TextLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  p {
    font-size: 1.3vw;
    font-weight: bold;
    margin-left: 1vw;
    color: #181818;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }
`;

const StyledImage = styled.img`
  width: 25%; // 또는 필요에 따라 조정
  height: auto; // 이미지의 비율을 유지
  object-fit: contain; // 이미지가 컨테이너에 맞도록 조정
`;

const AboutFunctions = () => {
  return (
    <>
      <ItemBox>
        <Items $height="15%">
          <TextContainer>
            <TextLine>
              <h2>제공하는 기능들</h2>
            </TextLine>
          </TextContainer>
          <TextContainer>
            <TextLine>
              <h1>
                <span className="text-primary">애완동물을</span>{" "}
                <span>위한 최고의 기능들</span>
              </h1>
            </TextLine>
          </TextContainer>
        </Items>
        <Items $height="40%" $direction="row" $justify="space-between">
          <ItemContainer>
            <StyledImage src={schedule} alt="Schedule" />
          </ItemContainer>
          <ItemContainer>
            <StyledImage src={mapService} alt="Map Service" />
          </ItemContainer>
          <ItemContainer>
            <StyledImage src={weatherService} alt="Weather Service" />
          </ItemContainer>
        </Items>
        <Items $height="40%" $direction="row" $justify="space-between">
          <ItemContainer>
            <StyledImage src={feed} alt="Feed" />
          </ItemContainer>
          <ItemContainer>
            <StyledImage src={searchAnimal} alt="Search Animal" />
          </ItemContainer>
          <ItemContainer>
            <StyledImage src={stray} alt="Stray" />
          </ItemContainer>
        </Items>
      </ItemBox>
    </>
  );
};

export default AboutFunctions;
