import Router from "./shared/Router";
import todoSvg from "./assets/img/todoSvg.svg";
import styled, { keyframes } from "styled-components";

function App() {
  return (
    <StContainer>
      <Router />

      {/* <StTitleBox>
      <StImgBox1>
        <img src={todoSvg} alt='todoSvg' />
      </StImgBox1>
    </StTitleBox> */}
    </StContainer>
  );
}

const StContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #ccc;
`;

export default App;
