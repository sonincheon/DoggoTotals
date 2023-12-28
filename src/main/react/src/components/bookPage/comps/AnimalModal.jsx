import React from "react";
import styled from "styled-components";
import { useEffect } from "react";

const ModalOverlay = styled.div`
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  width: 70vw;
  height: 35vw;
  z-index: 99999;
`;

const ImageSection = styled.div`
  width: 50%;
  height: 99%;
  background: url(${(props) => props.src}) no-repeat center center;
  background-size: cover;
  border-radius: 8px;
`;

const ContentSection = styled.div`
  display: flex;

  flex-direction: column;

  width: 50%;
  height: 100%;
  padding-left: 2%;

  h1 {
    font-size: 2vw;
  }
  h2 {
    font-size: 1.5vw;
    color: #a3a1a1;
  }
`;

export const BreedNameSection = styled.div`
  display: flex;

  flex-direction: column;

  width: 100%;
  height: 20%;

  h1 {
    font-size: 2vw;
  }
  h2 {
    margin-top: 5%;
    font-size: 1.5vw;
    color: #a3a1a1;
  }
`;

export const BreedInfoSection = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 80%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const ProgressBarContainer = styled.div`
  background-color: #e0e0e0;
  border-radius: 8px;
  height: 1vw;
`;

const ProgressBar = styled.div`
  background-color: #4caf50;
  height: 100%;
  border-radius: 8px;
  width: ${(props) =>
    (props.value / 5) * 100}%; // 1~5 범위의 값을 100% 기준으로 변환
`;

const ProgressLabel = styled.span`
  font-size: 1.5vw;
`;

export const AnimalAttributeBar = ({ label, value }) => {
  return (
    <>
      <ProgressLabel>{label}</ProgressLabel>
      <ProgressBarContainer>
        <ProgressBar value={value} />
      </ProgressBarContainer>
    </>
  );
};

const AnimalModal = ({ $isOpen, $onClose, imageSrc, children }) => {
  
  // esc 누르면 모달창 종료
    useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        $onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [$onClose]);

  return (
    <>
      <ModalOverlay $isOpen={$isOpen} onClick={$onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={$onClose}>&times;</CloseButton>
          <ImageSection src={imageSrc} />
          <ContentSection>{children}</ContentSection>
        </ModalContent>
      </ModalOverlay>
    </>
  );
};

export default AnimalModal;
