import styled, { css, keyframes } from "styled-components";
import frame from "../../icon/Frame.png";

export const MapStyles = styled.div`
  width: 100%;
  height: 100%;
`;

export const MapContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
export const Overlay = styled.div`
  border-radius: 5px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f95001;
  color: white;
`;

export const Arrow = styled.div`
  width: 20px;
  height: 10px;
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
`;

export const PlaceName = styled.p`
  font-size: 16px;
  padding: 10px 5px 10px 10px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
export const DetailLink = styled.a`
  text-align: center;

  // 오버레이 링크 이미지
  img {
    width: 20px;
    height: 20px;
    color: white;
  }
`;
export const SearchBtns = styled.div`
  position: absolute;
  top: 30px;
  right: 40px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const KeywordBtn = styled.button`
  width: 120px;
  color: #f95001;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 5px;
  font-size: 0.875rem;
  padding: 10px;
  &:hover {
    background-color: white;
  }
  @media (max-width: 768px) {
    width: 100px;
    padding: 8px;
    font-size: 0.75rem;
  }
`;

export const ListContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  width: 300px;
  overflow-y: auto;
  transition: 0.2s;
  ${({ isClosed }) =>
    isClosed &&
    css`
      left: -300px;
    `};
`;

export const SideBarOpenBtn = styled.button`
  position: fixed;
  z-index: 1;
  top: 170px;
  left: 30px;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: #333333;
  transition: 0.3s;
`;

export const ModalContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.7);

  @media (max-width: 768px) {
    height: ${({ isClosed }) => (isClosed ? "0px" : "300px")};
    overflow-y: auto;
    transition: 0.2s;
  }
`;

export const List = styled.ul``;

export const Item = styled.li`
  position: relative;
  padding: 20px;
  border-bottom: 1px solid #f95001;
`;

export const Name = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
  max-width: 310px;
  color: #f95001;

  @media (max-width: 768px) {
    max-width: 280px;
  }
`;

export const Category = styled.p`
  color: #898989;
  margin-bottom: 13px;
`;

export const Address = styled.p`
  font-size: 14px;
  margin-bottom: 5px;
  color: #898989;
`;

export const Distance = styled.p`
  margin-right: 10px;
  color: #898989;
`;

export const RoadAddress = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #898989;

  img {
    width: 35px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

export const Division = styled.p`
  margin-right: 10px;
  color: #f95001;
`;

export const PhoneNumber = styled.p`
  color: #898989;
`;

export const NoList = styled.p`
  /* background-color: rgba(255, 255, 255, 0.7); */
  font-size: 18px;
  padding: 20px;
`;

export const Pages = styled.div`
  text-align: center;
  padding: 15px 0;
  font-size: 18px;
`;

export const PageBtn = styled.button`
  margin: 0 10px;
  background-color: rgba(255, 255, 255, 0.7);
  border: none;
`;

const slide = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const MapModal = styled.div`
  position: absolute;
  z-index: 20;
  left: 0;
  right: 0;
  bottom: 0;
  border-bottom: 0;
  border-radius: 5px 5px 0 0;
  animation: ${slide} 0.2s ease-in-out;
`;

export const ModalBtn = styled.button`
  display: block;
  margin: 15px auto 10px;
  width: 50px;
  height: 10px;
  border-radius: 5px;
  background-color: #f95001;

  ${({ isClosed }) =>
    isClosed &&
    css`
      left: 0px;
    `}
`;

// 현재 내 위치로 돌아가는 버튼
export const GoBackButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  width: 55px;
  height: 55px;
  background: no-repeat #333333 url(${frame}) center/contain;
  background-size: 70%;
  border-radius: 10px;
  /* border: none; */

  &:hover {
    background: no-repeat #f95001 url(${frame}) center/contain;
  }
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    right: 10px;
    bottom: 40px;
  }

  // Modal이 열릴 때만 아래 추가 스타일을 적용
  ${({ isModalOpen }) =>
    isModalOpen &&
    css`
      @media (max-width: 768px) {
        bottom: 340px;
        transition: 0.2s;
      }
    `}
`;
// 접속위치 텍스트
export const GoBackTxt = styled.span`
  position: absolute;
  bottom: 30px;
  right: 80px;
  z-index: 10;
  width: 90px;
  height: 30px;
  line-height: 30px;
  border-radius: 20px;
  text-align: center;
  color: #333333;
  margin-top: 10px;

  @media (max-width: 768px) {
    font-size: 12px;
    width: 70px;
    height: 25px;
    line-height: 25px;
    right: 60px;
    bottom: 50px;
  }

  // Modal이 열릴 때만 아래 추가 스타일을 적용
  ${({ isModalOpen }) =>
    isModalOpen &&
    css`
      @media (max-width: 768px) {
        bottom: 350px;
      }
    `}
`;
// 현 지도에서 검색 버튼
export const ReSearch = styled.button`
  position: absolute;
  color: #333333;
  font-size: 14px;
  bottom: 80px;
  transform: translateX(-50%);
  left: 50%;
  z-index: 10;
  width: 160px;
  height: 40px;
  line-height: 40px;
  border-radius: 30px;
  border: none;
  background-color: rgba(255, 255, 255, 1);

  &:active {
    color: white;
    background-color: #333333;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    bottom: 105px;
    width: 130px;
    height: 30px;
    line-height: 30px;
  }

  // Modal이 열릴 때만 아래 추가 스타일을 적용
  ${({ isModalOpen }) =>
    isModalOpen &&
    css`
      @media (max-width: 768px) {
        bottom: 405px;
        transition: 0.2s;
      }
    `}
`;
