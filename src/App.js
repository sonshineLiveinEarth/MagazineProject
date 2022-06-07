import "./App.css";
import styled from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";

import img from "./magazine_logo.png";
import Login from "./Login";
import Signup from "./Signup";
import Main from "./Main";
import Write from "./Write";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Header>
        <Logo
          onClick={() => {
            navigate("/");
          }}
          src={img}
        />
        <HLoginBtn
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인
        </HLoginBtn>
      </Header>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </div>
  );
}

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: #ffffff09;
  backdrop-filter: blur(20px);
  width: 100vw;
  height: 8vh;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 26px;
`;

const Logo = styled.img`
  width: 30px;
  height: 33px;
`;

const HLoginBtn = styled.button`
  width: 60px;
  height: 33px;
  margin-right: 36px;
  font-size: 16px;
  background-color: transparent;
  border: none;
  text-decoration: underline;
  color: #9f9f9f;
`;

export default App;
