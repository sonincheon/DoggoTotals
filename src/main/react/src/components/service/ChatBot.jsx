import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 전체 컨테이너에 대한 스타일드 컴포넌트
const Container = styled.div`
  width: 100%;
  border: 1px solid black;

  ::before {
    content: "";
    position: absolute;
    bottom: 6px; /* 말풍선 꼬리를 아래로 위치시킴 */
    left: -4%; /* 말풍선 꼬리 위치 조절 */
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 18px 15px 0; /* 말풍선 꼬리의 크기 조절 */
    border-color: transparent #f3eeea transparent transparent; /* 말풍선 꼬리의 색상 설정 */
  }
  .chat {
    background-color: #f0f0f0;
    overflow: hidden;
    border-radius: 8px;
  }
`;

// 채팅 메시지와 스크롤바가 있는 컨테이너에 대한 스타일드 컴포넌트
const ChatboxContainer = styled.div`
  width: 100%;
  height: 350px;
  overflow-y: auto;
  padding: 8px;
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: #f95001 #f1f1f1;

  /* 스크롤바에 대한 일반적인 스타일을 설정합니다. */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #f95001;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: lightgray;
  }
`;

// 입력 필드와 전송 버튼이 있는 컨테이너에 대한 스타일드 컴포넌트
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  box-sizing: border-box;
`;

// 입력 필드에 대한 스타일드 컴포넌트
const Input = styled.input`
  width: calc(100% - 60px);
  height: 40px;
  padding: 5px;
  border: none;
  border-radius: 7px 0px 0px 7px;
  box-sizing: border-box;
`;

// 전송 버튼에 대한 스타일드 컴포넌트
const SendButton = styled.button`
  width: 60px;
  height: 40px;
  border: none;
  background-color: #f95001;
  color: white;
  font-weight: bold;
  border-radius: 0px 7px 7px 0px;
  cursor: pointer;
`;

const BotMessage = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 8px;
  margin: 4px;
  text-align: left;
  justify-items: start;
`;
const Boxleft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
`;

const UserMessage = styled.div`
  background-color: #f95001;
  color: white;
  border-radius: 8px;
  padding: 8px;
  margin: 4px;
  text-align: right;
`;

const Boxright = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 5px; /* 이미지에 원하는 모양을 주기 위한 스타일 설정 */
`;

const WelcomeContainer = styled.div`
  background-color: #f95001;
  color: white;
  border-radius: 8px;
  padding: 8px;
  margin: 4px;
  text-align: center;

  .Welcome {
    font-size: 13px;
  }

  @media (max-width: 1280px) {
    .Welcome {
      font-size: 12px;
    }
  }
`;

const WelcomeButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
`;

const WelcomeButton = styled.button`
  margin: 0 8px;
  padding: 5px;
  width: 120px;
  background-color: #f0f0f0;
  color: #f95001;
  border: 1px solid #f95001;
  border-radius: 4px;
  font-size: 9px;
  cursor: pointer;

  @media (max-width: 1280px) {
    font-size: 9px;
  }
`;

const MoreButton = styled.button`
  display: flex;
  width: auto;
  padding: 5px 10px;
  background-color: #87c4ff; /* 녹색으로 변경 */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`;

const Chatbot = () => {
  // 채팅창 메시지와 사용자 입력 상태를 관리하는 상태변수
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [clickedButtonNumber, setClickedButtonNumber] = useState(null);

  const navigate = useNavigate();

  const animal = [
    {
      name: "치와와",
      size: "15cm~20cm",
      explain: "졸귀탱 강아지",
      img: "https://firebasestorage.googleapis.com/v0/b/dogcat-42fca.appspot.com/o/%EA%B0%95%EC%95%84%EC%A7%80%20%EC%82%AC%EC%A7%84%2F%EC%B9%98%EC%99%80%EC%99%80.jpg?alt=media&token=83eee3ab-9fa3-443b-9769-2d4e9961ac7f",
      url: "https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EC%B9%98%EC%99%80%EC%99%80&oquery=%EC%8B%9C%EB%B0%94%EA%B2%AC&tqi=iT7LOwqVOsVsshWcUb8ssssstEs-078421",
    },
    {
      name: "시바",
      size: "15cm~20cm",
      explain: "귀여운 강아지",
      img: "https://firebasestorage.googleapis.com/v0/b/dogcat-42fca.appspot.com/o/%EA%B0%95%EC%95%84%EC%A7%80%20%EC%82%AC%EC%A7%84%2F%EC%8B%9C%EB%B0%94%EA%B2%AC.jpg?alt=media&token=b914c777-c6bb-4ee0-9d40-7f0e810f9317",
      url: "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%8B%9C%EB%B0%94%EA%B2%AC",
    },
  ];

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  // 환영 메시지 버튼 클릭을 처리하는 함수
  const handleWelcomeButtonClick = (buttonNumber) => {
    console.log(buttonNumber);
    // 버튼에 따라 다른 동작 수행
    if (buttonNumber === 1) {
      // 1번 버튼 클릭 시 동작
      addMessage("검색할 종의 이름을 입력하세요.", "bot");
    } else if (buttonNumber === 2) {
      // 2번 버튼 클릭 시 동작
      addMessage("조회하고 싶은 날짜를 선택하세요.", "bot");
    } else if (buttonNumber === 3) {
      // 3번 버튼 클릭 시 동작.
      addMessage("멍냥일기 페이지로 이동합니다.", "bot");

      setTimeout(() => {
        navigate("/diy");
      }, 1000);
    } else if (buttonNumber === 4) {
      // 4번 버튼 클릭 시 동작
      addMessage("고객센터 페이지로 이동합니다.", "bot");

      setTimeout(() => {
        navigate("/service");
      }, 1000);
    }

    // 버튼이 클릭되면 환영 메시지와 버튼을 숨김
    setButtonClicked(true);
    setClickedButtonNumber(buttonNumber);
    setShowWelcome(false);
  };

  // 채팅창을 스크롤하기 위한 ref
  const chatContainerRef = useRef(null);

  // 사용자 입력 메시지를 메시지 목록에 추가하는 함수
  const addMessage = (text, sender = "user") => {
    setMessages((prevMessages) => [...prevMessages, { text, sender }]);
  };

  // 사용자 입력이 변경될 때 호출되는 함수
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // 사용자가 메시지를 보낼 때 호출되는 함수
  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    // 사용자가 입력한 메시지를 채팅창에 추가
    addMessage(inputText, "user");

    // 사용자 입력을 처리하고 챗봇 응답 생성
    const botResponse = generateBotResponse(inputText);

    // 챗봇 응답을 채팅창에 추가
    addMessage(botResponse, "bot");

    // 입력창 초기화
    setInputText("");
  };

  // 사용자가 버튼을 클릭했을 때 호출되는 함수
  const handleButtonClick = (url) => {
    // 새로운 창으로 링크 열기 (여기서는 네이버로 이동하는 예시)
    window.location.href = url;
  };

  // 챗봇 응답 생성 함수
  const generateBotResponse = (userInput) => {
    // 버튼이 클릭되지 않았을 때는 빈 응답 반환
    if (!buttonClicked) {
      return "도움이 필요한 항목을 선택하여 다시 질문해주세요";
    }

    // 간단한 패턴 매칭을 통해 사용자 입력에 따른 응답 생성
    const lowercaseInput = userInput.toLowerCase();

    if (clickedButtonNumber === 1) {
      const foundAnimal = animal.find((a) =>
        lowercaseInput.includes(a.name.toLowerCase())
      );

      if (foundAnimal) {
        // '치와와'에 대한 정보와 버튼을 포함한 응답 생성
        return (
          <chat1>
            {foundAnimal.name}에 관한 정보입니다.
            <ul style={{ listStyleType: "none" }}>
              <li>
                <Image src={foundAnimal.img} alt={foundAnimal.name} />
              </li>
              <li>크기: {foundAnimal.size}</li>
              <li>설명: {foundAnimal.explain}</li>
            </ul>{" "}
            <ButtonBox>
              <MoreButton onClick={() => handleButtonClick(foundAnimal.url)}>
                {foundAnimal.name} 정보 보기
              </MoreButton>
            </ButtonBox>
          </chat1>
        );
      } else {
        return "죄송해요, 이해하지 못했어요. 다시 한번 설명해주시겠어요?";
      }
    } else if (clickedButtonNumber === 2) {
      // 2번 버튼에 대한 응답 처리
    } else if (clickedButtonNumber === 3) {
      // 3번 버튼에 대한 응답 처리
    } else if (clickedButtonNumber === 4) {
      // 4번 버튼에 대한 응답 처리
    }

    // 추가적인 처리가 필요한 경우에 따라 확장할 수 있습니다.
  };

  // 렌더링
  return (
    <Container>
      <div className="chat">
        {showWelcome && (
          <WelcomeContainer>
            <p className="Welcome">
              PETMEMOIR의 챗봇입니다. 어떤 도움이 필요하신가요?
            </p>
            <WelcomeButtons>
              <WelcomeButton onClick={() => handleWelcomeButtonClick(1)}>
                동물도감
              </WelcomeButton>
              <WelcomeButton onClick={() => handleWelcomeButtonClick(2)}>
                산책지수
              </WelcomeButton>
              <WelcomeButton onClick={() => handleWelcomeButtonClick(3)}>
                멍냥일기
              </WelcomeButton>
              <WelcomeButton onClick={() => handleWelcomeButtonClick(4)}>
                고객센터
              </WelcomeButton>
            </WelcomeButtons>
          </WelcomeContainer>
        )}

        <ChatboxContainer ref={chatContainerRef}>
          {messages.map((message, index) => (
            <div key={index} style={{ paddingBottom: "8px" }}>
              {message.sender === "bot" ? (
                <Boxleft>
                  <BotMessage>
                    <strong>동물박사:</strong> {message.text}
                  </BotMessage>
                </Boxleft>
              ) : (
                <Boxright>
                  <UserMessage>
                    <strong>사용자:</strong>
                    {message.text}
                  </UserMessage>
                </Boxright>
              )}
            </div>
          ))}
        </ChatboxContainer>
        <InputContainer>
          <Input
            className="chatbox"
            placeholder="궁금한 정보를 자유롭게 물어보세요"
            type="text"
            value={inputText}
            onChange={handleInputChange}
          />
          <SendButton className="sendbtn" onClick={handleSendMessage}>
            전송
          </SendButton>
        </InputContainer>
      </div>
    </Container>
  );
};

export default Chatbot;
