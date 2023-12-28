import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import AxiosApi from '../../api/Axios';
import { PayContext } from '../../context/Paystore';
import { useNavigate } from 'react-router-dom';

const Box =styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height:  50%;
  background-color: white;
  border-radius: 5px;
  

  .textbox{
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    textarea{
      width: 90%;
      height: 80%;
      border: 2px solid #776B5D;
      border-radius: 5px;
      resize: none;
      outline-color: #b19f8b;
      padding: 2%;
    }
  }
`;
const BtnSt =styled.button`
  border: none;
  width: 100px;
  height: 40px;
  margin-top: 5px;
  border-radius: 5px;
  background-color: #F95001;
  color: white;
  font-weight: bold;
  cursor: pointer;
  &:hover{
    background-color: #ff5100;
  }
`;

const Diary = (props) => {
  const {day}=props;
  const [text,setText]=useState('');
  const context = useContext(PayContext);
  const {isTrue,setIsTrue}=context;
  const navigate =useNavigate();
  const textChange =(e)=>{
    setText(e.target.value);
  }


  useEffect(() => {
    setText("")
    const diaryDetail = async () => {
      try {
        const res = await AxiosApi.DiaryDetail(day);
        if (res.status === 200){
          console.log(res.data);
          setText(res.data.diaryDetail);
          }
    } catch (e) {
        console.error(e);
      }
    }
    diaryDetail();
  }, [day,isTrue]);


  const diaryReg = async() => {
    console.log(day)
      try {
        const resp = await AxiosApi.DiaryReg(day,text);
        if (resp.data === true) {
          console.log(resp.data);
          alert("성공");
          setIsTrue((prev)=>!prev);
        }
      } catch (e) {
        console.log(e);
        alert("로그인을 해주세요");
        navigate("/login")
      }
  };


  return (
    <Box>
    <h1>멍냥일기</h1>
        <div className="textbox">
            <textarea placeholder="오늘 하루를 작성해주세요" value={text} onChange={textChange}/>
            <BtnSt onClick={diaryReg}>작성</BtnSt>
        </div>
    </Box>

);
}

export default Diary;