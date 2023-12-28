import styled from "styled-components";
 
import { Center } from "../components/PublicStyle";
import HomeMain from "../components/homePage/HomeMain";




// const SubscribeButton = styled.button`
//   display: block;
//   position: fixed;
//   bottom: 16px; 
//   left: 50%;
//   transform: translateX(-50%);

//   z-index: 9999;
  
//   width: 350px; 

//   border-radius: 30px; 
//   padding: 16px 0; 
//   font-size: 16px; 
//   line-height: 1.5; 
//   cursor: pointer;
//   border: none;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.16); 
//   transition: 0.3s linear;
//   &:hover {
    
//     transform: translateX(-50%) scale(1.05);
//   }
// `;

const StyledHomeMain = styled(HomeMain)`
  position: relative;
  top: 20;
  left: 0;
  z-index: 1000; // 필요한 경우 z-index 조정
  // 필요한 추가 스타일링...
`;




const HomePage = () =>{


    return(
        <Center>
        
        <StyledHomeMain />
        
        </Center>
    )
}

export default HomePage;