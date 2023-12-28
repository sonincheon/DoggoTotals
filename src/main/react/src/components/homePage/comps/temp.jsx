// import React, { useState, useEffect, useRef } from 'react';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
// import styled, { createGlobalStyle } from 'styled-components';

// // 전역 스타일을 정의합니다. 슬라이더 애니메이션을 위한 클래스가 여기 포함됩니다.
// const GlobalStyle = createGlobalStyle`
//   .flip-enter {
//     transform: rotateY(-90deg); // 초기 상태: 90도 회전
//     transform-origin: right; // 회전 기준점을 오른쪽으로 설정
//     z-index: 2;
//     position: absolute;
//     right: 0;
//   }
//   .flip-enter-active {
//     transform: rotateY(0deg); // 활성화 상태: 0도 (원래 상태)
//     transition: transform 4000ms; // 애니메이션 지속 시간 0.5초
//     z-index: 2;
//     position: absolute;
//     right: 0;
//   }
//   .flip-exit {
//     position: absolute;
//     transform: rotateY(0); // 초기 상태: 회전 없음
//     z-index: 1;
//     right: 0;
//   }
//   .flip-exit-active {
//     transform: rotateY(90deg); // 활성화 상태: 90도 회전
//     transition: transform 4000ms; // 애니메이션 지속 시간 0.5초
//     z-index: 1;
//     transform-origin: left; // 회전 기준점을 왼쪽으로 설정
//     position: absolute;
//     left: 0;
//   }
// `;

// // 슬라이더 컨테이너 스타일을 정의합니다.
// const ImageSliderContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 10px;
//   width: 70vh; // 뷰포트 높이의 70%
//   height: 50vh; // 뷰포트 높이의 50%
//   overflow: hidden;
//   position: relative;

//   @media (max-width: 1024px) {
//     width: 60vw; // 뷰포트 폭의 60%
//     height: 40vw; // 뷰포트 폭의 40%
//   }

//   @media (max-width: 768px) {
//     width: 80vw; // 뷰포트 폭의 80%
//     height: 60vw; // 뷰포트 폭의 60%
//   }

//   @media (max-width: 480px) {
//     width: 90vw; // 뷰포트 폭의 90%
//     height: 70vw; // 뷰포트 폭의 70%
//   }
// `;

// // 각 이미지 스타일을 정의합니다.
// const SliderImage = styled.img`
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   position: absolute;
//   top: 0;
//   left: 0;
// `;


// // 슬라이더 버튼의 기본 스타일을 정의합니다.
// const SliderButton = styled.button`
//   position: absolute;
//   top: 50%;
//   transform: translateY(-50%);
//   background-color: transparent;
//   border: none;
//   font-size: 2rem;
//   color: gray;
//   cursor: pointer;
//   z-index: 100;
//   &:hover {
//     color: whitesmoke;
//   }
// `;

// // 왼쪽 버튼 스타일을 확장합니다.
// const LeftButton = styled(SliderButton)`
//   left: 0;
// `;

// // 오른쪽 버튼 스타일을 확장합니다.
// const RightButton = styled(SliderButton)`
//   right: 0;
// `;

// // 커스텀 훅: 특정 간격으로 콜백 함수를 반복 실행합니다.
// function useInterval(callback, delay) {
//   const savedCallback = useRef();

//   // 콜백을 저장합니다.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // 인터벌을 설정합니다.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }

// const ImageSlider = ({ images = [] }) => {
//   // 현재 이미지 인덱스와 전환 상태를 관리하는 state
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [transitioning, setTransitioning] = useState(false);
//   const sliderRef = useRef();

//   // 다음 이미지로 전환하는 함수
//   const nextImage = () => {
//     if (transitioning) return; // 이미 전환 중이면 아무것도 하지 않음
//     setTransitioning(true); // 전환 상태를 true로 설정
//     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // 다음 인덱스로 업데이트
//   };

//   // 이전 이미지로 전환하는 함수
//   const prevImage = () => {
//     if (transitioning) return; // 이미 전환 중이면 아무것도 하지 않음
//     setTransitioning(true); // 전환 상태를 true로 설정
//     setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // 이전 인덱스로 업데이트
//   };

//   // 자동 슬라이드를 위한 커스텀 훅 사용
//   useInterval(nextImage, transitioning ? null : 4000); // 4초마다 nextImage 함수를 호출

//   // 이미지가 전환될 때 실행할 콜백 함수
//   const onTransitionEnd = () => {
//     setTransitioning(false);
//   };

//   // 이미지가 없으면 렌더링하지 않음
//   if (!images.length) return null;

//   return (
//     <>
//       <GlobalStyle />
//       <ImageSliderContainer ref={sliderRef}>
//         <TransitionGroup>
//           <CSSTransition
//             key={currentImageIndex}
//             classNames="flip"
//             timeout={3000}
//             onEntered={onTransitionEnd}
//             onExited={onTransitionEnd}>
//             <SliderImage
//               src={images[currentImageIndex]}
//               alt={`Slide ${currentImageIndex}`}
//             />
//           </CSSTransition>
//         </TransitionGroup>
//         <LeftButton onClick={prevImage}>
//           {"<"}
//         </LeftButton>
//         <RightButton onClick={nextImage}>
//           {">"}
//         </RightButton>
//       </ImageSliderContainer>
//     </>
//   );
// };

// export default ImageSlider;