import "./App.css";
import React from "react";
import styled from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./shared/firebase";
import { collection, addDoc } from "firebase/firestore";

import img from "./magazine_logo.png";
import Login from "./Login";
import Signup from "./Signup";
import Main from "./Main";
import Write from "./Write";

function App() {
  const navigate = useNavigate();
  const [is_login, setIsLogin] = React.useState(false);
  // console.log(auth.currentUser);

  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  }, []);

  const onLogOutClick = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <div className="App">
      <Header>
        <Div>
          <Logo
            onClick={() => {
              is_login ? navigate("/") : navigate("/login");
            }}
            src={img}
          />
          {is_login ? (
            <HLoginBtn
              onClick={() => {
                onLogOutClick();
                navigate("/login");
              }}
            >
              로그아웃
            </HLoginBtn>
          ) : (
            <HLoginBtn
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </HLoginBtn>
          )}
        </Div>
      </Header>
      <Routes>
        {is_login ? (
          <Route path="/" element={<Main />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        {/* <Route path="/" element={is_login ? <Main /> : <Login />} /> */}
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
  justify-content: center;
  align-items: center;
  padding: 0px 26px;
`;

const Div = styled.div`
  z-index: 10;
  max-width: 600px;
  width: 100vw;
  height: 8vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 30px;
  height: 33px;
`;

const HLoginBtn = styled.button`
  width: auto;
  height: 33px;
  margin-right: 36px;
  font-size: 16px;
  background-color: transparent;
  border: none;
  text-decoration: underline;
  color: #9f9f9f;
  padding-right: 26px;
`;

export default App;
