import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Common from "../utill/Common";

// 접근 제한 컴포넌트
const PrivateLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const LoginStatus = async () => {
      const accessToken = Common.getAccessToken();
      try {
        const res = await Common.IsLogin();
        console.log(res);
        if (res.data === true) {
          console.log("환영합니다^^ 로그인중입니다!");
        }
      } catch (e) {
        console.log(e);
        if (e.response.status === 401) {
          console.log(e.response.status);
          try {
            console.log("재발급시작!!!");
            const res = await Common.handleUnauthorized();
            if (res === false) {
              alert("로그인을해주세요");
              navigate("/login");
            }
            const newToken = Common.getAccessToken();
            console.log(newToken);
            if (newToken !== accessToken) {
              const token = await Common.IsLogin();
              if (token.data === true) {
                console.log("환영합니다^^ 로그인중입니다!");
              } else {
                alert("로그인 해주세요!");
                navigate("/login");
              }
            }
          } catch (e) {
            console.log(e);
            console.log("안됨;");
            navigate("/login");
          }
        } else {
          console.log("여기서안되?");
          navigate("/login");
        }
      }
    };
    LoginStatus();
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateLayout;
