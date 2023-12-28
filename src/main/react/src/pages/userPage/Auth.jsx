import { useEffect } from "react";
import { Center } from "../../components/PublicStyle";
import AxiosApi from "../../api/Axios";
import { useNavigate, useSearchParams } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const AuthReg = async () => {
      console.log(searchParams.get("code"));
      try {
        const resp = await AxiosApi.KakaoLogin(searchParams.get("code"));
        if (resp.status === 200) {
          console.log(resp);
          navigate(`/`);
        } else {
          console.log("실패했습니다.");
          navigate("/main");
        }
      } catch (e) {
        console.log(e);
      }
    };
    AuthReg();
  }, []);

  return (
    <>
      <Center>
        <div>카카오톡 로그인 중 입니다...</div>
      </Center>
    </>
  );
};

export default Auth;
