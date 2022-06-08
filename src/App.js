import "./App.css";
import React, { useState } from "react";
import styled from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./shared/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import img from "./magazine_logo.png";
import Login from "./Login";
import Signup from "./Signup";
import Main from "./Main";
import Write from "./Write";

function App() {
  const navigate = useNavigate();
  const [is_login, setIsLogin] = React.useState(false);
  // 현재 로그인한 유저의 데이터
  const [userData, setUserData] = useState(null);

  // 현재 로그인되어 있는 유저id == 'users' DB 에 동일한 id를 가지고 있는 객체 불어오기!
  // const user_data = collection(db, "users");
  // const q = query(user_data, where("user_id", "==", auth.currentUser.email));

  // const querySnapshot = async () => {
  //   const snapshot = await getDocs(q);
  //   snapshot.forEach((doc) => {
  //     console.log(doc.data());
  //     setUserData(doc.data());
  //   });
  // };

  // React.useEffect(() => {
  //   querySnapshot();
  // }, []);

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
            <>
              <ProfileWrap>
                <HLoginBtn
                  onClick={() => {
                    onLogOutClick();
                    navigate("/login");
                  }}
                >
                  로그아웃
                </HLoginBtn>
                <ProfileImage />
              </ProfileWrap>
            </>
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
        <Route path="/" element={<Main is_login={is_login} />} />
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
const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
`;

const HLoginBtn = styled.button`
  width: auto;
  height: 33px;
  margin-right: 20px;
  font-size: 14px;
  background-color: transparent;
  border: none;
  text-decoration: underline;
  color: #9f9f9f;
`;

const ProfileImage = styled.div`
  z-index: 10;
  width: 40px;
  height: 40px;
  background-color: #ddd;
  border-radius: 50%;
  margin-right: 52px;
  /* background-image: url(${(props) => props}); */
`;

export default App;
