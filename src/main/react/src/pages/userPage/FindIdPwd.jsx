import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AxiosApi from "../../api/Axios";
import { ReactComponent as Logo } from "../../icon/petmemori.svg";

const Container = styled.div`
  width: 30vw;
  min-width: 410px;
  height: auto;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #ebebeb;
  border-radius: 10px;
  margin-bottom: 3vh;
  padding: 8px;

  & .login {
    margin: 0 auto;
    letter-spacing: 0px;
    color: black;
    opacity: 1;
  }
  .success {
    color: green;
  }
  .error {
    color: red;
  }

  .Title {
    font-size: 20px;
    font-weight: bold;
    padding: 1rem;
  }

  .Logo {
    cursor: pointer;
  }
`;

const Box = styled.div`
  width: 40vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .Logo {
    width: 200px;
  }
`;

const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Item1 = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  font-size: 13px;
`;

const Item2 = styled.input`
  border-radius: 10px;
  width: 15vw;
  height: 4vh;
  min-width: 240px;
`;

const Item3 = styled.input`
  border-radius: 10px;
  width: 15vw;
  height: 4vh;
  min-width: 200px;
`;

const Button1 = styled.button`
  width: 100%;
  height: 30px;
  border-radius: 10px;
  background-color: #333333;
  color: white;
  cursor: pointer;

  &:active {
    //확인 클릭하면 설정
    border: #999;
    font-weight: 700;
    background-color: #5c5b5b;
  }
`;

const Button2 = styled.button`
  width: 5vw;
  height: 4vh;
  border-radius: 10px;
  background-color: #333333;
  color: white;
  cursor: pointer;
  min-width: 70px;

  &:active {
    //확인 클릭하면 설정
    border: #999;
    font-weight: 700;
    background-color: #5c5b5b;
  }
`;

const FindIdPwd = () => {
  const [inputName, setInputName] = useState("");
  const [inputTel, setInputTel] = useState("");
  const [foundId, setFoundId] = useState("");
  const [showFoundId, setShowFoundId] = useState(false);

  const navigate = useNavigate();

  const onChangeName = (e) => {
    setInputName(e.target.value);
  };

  const onChangeTel = (e) => {
    setInputTel(e.target.value);
  };

  const findMemberId = async () => {
    try {
      const resp = await AxiosApi.findMemberId(inputName, inputTel);
      if (resp.status === 200) {
        setFoundId(resp.data);
        setShowFoundId(true); // 입력완료 시 아이디 보이게 처리
      } else {
        alert("가입된 정보가 없습니다.");
      }
    } catch (error) {
      console.log(error);
      alert("오류가 발생했습니다.");
    }
  };

  const hideEmail = (email) => {
    const [username, domain] = email.split("@");
    const hiddenPart = "*".repeat(Math.max(0, username.length - 3));

    return username.slice(0, 4) + hiddenPart + "@" + domain;
  };

  return (
    <CenteredContainer>
      <Box>
        <Container>
          <Logo className="Logo" onClick={() => navigate("/")} />
          <div className="Title">아이디 찾기</div>
          <Item1>
            이름 :{" "}
            <Item2
              placeholder="가입된 실명 입력"
              onChange={onChangeName}
            ></Item2>
          </Item1>
          <Item1>
            전화번호 :{" "}
            <Item2
              placeholder="가입된 전화번호 입력"
              onChange={onChangeTel}
            ></Item2>
          </Item1>
          <Item1 style={{ justifyContent: "center" }}>
            <Button1 onClick={findMemberId}>입력완료</Button1>
          </Item1>
          <div
            style={{
              height: "15px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {showFoundId && ( // 아이디 보이게 처리
              <Item1>
                {inputName}님의 아이디(이메일)는{" "}
                <div style={{ color: "red", fontWeight: "bold" }}>
                  {hideEmail(foundId)}
                </div>{" "}
                입니다.
              </Item1>
            )}
          </div>
          <div>
            <div className="Title">비밀번호 찾기</div>
          </div>
          <Item1>
            <div style={{ whiteSpace: "nowrap" }}>아이디:</div>
            <div style={{ display: "flex" }}>
              <Item3></Item3>
              <Button2>전송</Button2>
            </div>
          </Item1>
          <Item1>
            <div style={{ whiteSpace: "nowrap" }}>인증번호 입력 : </div>
            <div style={{ display: "flex" }}>
              <Item3></Item3>
              <Button2>인증</Button2>
            </div>
          </Item1>

          <div
            style={{
              height: "15px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <Item1>
              회원님의 비밀번호는 <div></div> 입니다.
            </Item1>
          </div>
        </Container>
      </Box>
    </CenteredContainer>
  );
};
export default FindIdPwd;
