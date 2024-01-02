import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Common from "../utill/Common";

// 접근 제한 컴포넌트
const PrivateLayoutAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const IsAdmin = async () => {
      const accessToken = Common.getAccessToken();
      try {
        const isLogin = await Common.IsLogin();
        const res = await Common.TakenToken();
        const email = res.data; 
        if (email === "admin") { // email이 admin인 경우만 접근허용
            navigate("/admin");
        } else {
            alert("관리자만 접근 가능합니다.");
            navigate("/");
        }
      } catch (e) {
        console.log(e);
        if (e.response.status === 401) {
          console.log(e.response.status);
          try {
            console.log("재발급시작!!!");
            const res = await Common.handleUnauthorized();
            if (res === false) { // 재발급이 실패하면 or 로그인 안하고 접근시 여기로 감.
              alert("관리자 로그인이 필요합니다.");
              navigate("/login");
            }
            const newToken = Common.getAccessToken();
            console.log(newToken);
            if (newToken !== accessToken) {
              const token = await Common.IsLogin();
              if (token.data === true) {
                console.log("환영합니다^^ 로그인중입니다!");
              } else {
                alert("로그인 해주세요!2");
                navigate("/login");
              }
            }
          } catch (e) {
            console.log(e);
            console.log("토큰 재발급 실패, 다시 로그인 해주세요.");
            navigate("/");
          }
        } else {
          console.log("토근 외의 문제입니다.");
          navigate("/");
        }
      }
    };
    IsAdmin();
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateLayoutAdmin;
