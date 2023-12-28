import React, { useState } from "react";
import styled from "styled-components";

const ModalStyle = styled.div`
  .modal {
    display: none; // 숨겨진 상태로 시작
    position: fixed; // 스크롤해도 동일한 위치
    top: 0; // 화면 전체를 덮도록 위치
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99; // 다른 모달 보다 위에 위치하도록 함
    background-color: rgba(0, 0, 0, 0.6); // 배경색을 검정으로 하고 투명도 조절
  }
  .openModal {
    display: flex; // 모달이 보이도록 함
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.8s;
  }
  button {
    outline: none;
    cursor: pointer;
    margin-right: 10px;
    border: 0;
  }
  section {
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: #fff;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
  }
  section > header {
    position: relative;
    padding: 16px 64px 16px 16px;
    background-color: #333333;
    color: white;
    font-weight: 700;
  }

  section > header button {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: white;
    background-color: transparent;
  }
  section > main {
    padding: 16px;
    border-bottom: 1px solid #dee2e6;
    border-top: 1px solid #dee2e6;
  }
  section > footer {
    padding: 12px 16px;
    text-align: right;
  }
  section > footer button {
    padding: 6px 12px;
    color: #fff;
    background-color: #333333;
    border-radius: 5px;
    font-size: 13px;
  }
  section > footer button:active {
    background-color: #686868;
    // 다른 스타일도 필요하다면 추가
  }
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Change1 = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Change3 = styled.input`
  width: 300px;
  height: 25px;
  text-justify: center;
  border-radius: 10px;
  margin-bottom: 5px;
`;

const Change2 = styled.div`
  .hint {
    height: 15px;
    font-size: 10px;
    display: flex;
    justify-content: end;
  }
`;

const Pwdmodal = (props) => {
  const { open, confirm, close, type, detail } = props;

  const [inputPw, setInputPw] = useState("");
  const [inputConPw, setInputConPw] = useState("");
  const [pwMessage, setPwMessage] = useState("");
  const [conPwMessage, setConPwMessage] = useState("");
  const [isPw, setIsPw] = useState(false);
  const [isConPw, setIsConPw] = useState(false);

  const onChangePw = (e) => {
    //const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setInputPw(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPwMessage("숫자+영문자 조합으로 8자리 이상 입력해주세요!");
      setIsPw(false);
    } else {
      setPwMessage("안전한 비밀번호에요 : )");
      setIsPw(true);
    }
  };
  const onChangeConPw = (e) => {
    const passwordCurrent = e.target.value;
    setInputConPw(passwordCurrent);
    if (passwordCurrent !== detail) {
      setConPwMessage("비밀 번호가 일치하지 않습니다.");
      setIsConPw(false);
    } else {
      setConPwMessage("비밀 번호가 일치 합니다. )");
      setIsConPw(true);
    }
  };

  const Close = () => {
    setInputConPw("");
    setInputPw("");
    close();
  };

  // &times; 는 X표 문자를 의미
  return (
    <ModalStyle>
      <div className={open ? "openModal modal" : "modal"}>
        {open && (
          <section>
            <header>비밀번호 변경</header>
            <main
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Change1>
                <div>기존 비밀번호 : </div>
                <Change2>
                  <Change3
                    value={inputConPw}
                    onChange={onChangeConPw}
                  ></Change3>
                  <div className="hint">
                    {inputConPw.length > 0 && (
                      <span
                        className={`message ${isConPw ? "success" : "error"}`}
                      >
                        {conPwMessage}
                      </span>
                    )}
                  </div>
                </Change2>
              </Change1>
              <Change1>
                <div>수정 비밀번호 : </div>
                <Change2>
                  <Change3 value={inputPw} onChange={onChangePw}></Change3>
                  <div className="hint">
                    {inputPw.length > 0 && (
                      <span className={`message ${isPw ? "success" : "error"}`}>
                        {pwMessage}
                      </span>
                    )}
                  </div>
                </Change2>
              </Change1>
            </main>
            <footer>
              {type && (
                <button
                  onClick={confirm}
                  disabled={inputConPw !== detail}
                  style={{ opacity: inputConPw !== detail ? 0 : 1 }}
                >
                  수정
                </button>
              )}
              <button onClick={Close}>취소</button>
            </footer>
          </section>
        )}
      </div>
    </ModalStyle>
  );
};

export default Pwdmodal;
