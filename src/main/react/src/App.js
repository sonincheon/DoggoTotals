import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Header from "./pages/Header";
import BookPage from "./pages/BookPage";
import Diymain from "./pages/diyPage/Diymain";
import Mapmain from "./pages/mapPage/Mapmain";
import Quickmain from "./pages/quickPage/Quickmain";
import ServiceMain from "./pages/servicePage/Servicemain";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import * as React from "react";
import { useState, useCallback } from "react";
import Signup from "./pages/userPage/SignUp";
import Quicksell from "./pages/quickPage/Quicksell";
import Quicksucess from "./pages/quickPage/Quicksucess";
import Quicksale from "./pages/quickPage/Quicksale";
import { TossPage } from "./utill/Toss";
import MyPage from "./pages/userPage/MyPage";
import HomePage from "./pages/HomePage";
import Admin from "./pages/Admin";
import Adminmainpage from "./pages/adminPage/Adminmainpage";
import Adminmemberpage from "./pages/adminPage/Adminmemberpage";
import Adminsalespage from "./pages/adminPage/Adminsalespage";
import Adminqnapage from "./pages/adminPage/Adminqnapage";
import Qnadetailpage from "./pages/adminPage/Qnadetailpage";
import Adminfeedpage from "./pages/adminPage/Adminfeedpage";
import Quicktoss from "./pages/quickPage/Quicktoss";
import PayStore from "./context/Paystore";
import ServiceView from "./pages/servicePage/ServiceView";
import FindIdPwd from "./pages/userPage/FindIdPwd";
import PrivateLayout from "./pages/PrivateLayout";
import Auth from "./pages/userPage/Auth";

const GlobalStyle = createGlobalStyle`
  ${reset}
    
  *{  
    box-sizing : border-box;
  }
  body{
    font-family: omyu_pretty;
  }
  /* other styles */
`;

function App() {
  return (
    <>
      {/* 결제용 context  */}
      <PayStore>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/FindIdPwd" element={<FindIdPwd />} />
            {/* 여긴 헤더 풋터 구간  */}
            <Route element={<Header />}>
              {/* 로그인 접속 제한 구간  */}
              <Route element={<PrivateLayout />}>
                <Route
                  path="/quick/sell/:feedId/:title"
                  element={<Quicksell />}
                />
                <Route
                  path="/quick/tosspay/:feedName/:salesAddr/:salesAutoDelivery/:salesDelivery/:salesPrice/:title"
                  element={<Quicktoss />}
                />
                <Route path="/quick/sales" element={<Quicksale />} />
                <Route path="/quick/sucess/:num" element={<Quicksucess />} />
                <Route path="/quick/toss" element={<TossPage />} />
                <Route path="/mypage/" element={<MyPage />} />
                <Route path="/serviceVeiw" element={<ServiceView />} />
              </Route>
              <Route path="/" element={<HomePage />} />
              <Route path="/book" element={<BookPage />} />
              <Route path="/diy" element={<Diymain />} />
              <Route path="/map" element={<Mapmain />} />
              <Route path="/quick" element={<Quickmain />} />
              <Route path="/service" element={<ServiceMain />} />
            </Route>

            {/* 여긴 어드민 구간  */}
            <Route element={<Admin />}>
              <Route path="/admin" element={<Adminmainpage />} />
              <Route path="/admin/member" element={<Adminmemberpage />} />
              <Route path="/admin/sales" element={<Adminsalespage />} />
              <Route path="/admin/qna" element={<Adminqnapage />} />
              <Route path="/admin/qna/:id" element={<Qnadetailpage />} />
              <Route path="/admin/feed" element={<Adminfeedpage />} />
            </Route>
          </Routes>
        </Router>
      </PayStore>
    </>
  );
}

export default App;
