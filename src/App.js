import "./App.css";
import React, { useState } from "react";
import styled from "styled-components";
import { Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./shared/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import { loadUserFB } from "./redux/modules/users";
import { useDispatch } from "react-redux";
import { loadMagazineFB } from "./redux/modules/magazine";

import img from "./magazine_logo.png";
import Login from "./Login";
import Signup from "./Signup";
import Main from "./Main";
import Write from "./Write";
import DetailA from "./DetailA";
import DetailB from "./DetailB";
import DetailC from "./DetailC";
import ModifiA from "./ModifiA";
import ModifiB from "./ModifiB";
import ModifiC from "./ModifiC";

function App() {
  const navigate = useNavigate();
  const user_lists = useSelector((state) => state.users.list);
  const [is_login, setIsLogin] = React.useState(false);
  const [userData, setUserData] = useState(false);

  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  // 현재 로그인되어 있는 유저id == 'users' DB 에 동일한 id를 가지고 있는 객체 불러오기!
  const user_data = collection(db, "users");
  const q = async () => {
    await query(user_data, where("user_id", "==", auth.currentUser.email));
  };

  const querySnapshot = async () => {
    const snapshot = await getDocs(q);
    console.log(snapshot);
    snapshot.forEach((doc) => {
      setUserData(doc.data());
      console.log(doc.data());
    });
  };

  //  React.useEffect(() => {
  //    querySnapshot();
  //  }, []);
  // 여기까지

  // 로그인된 상태에서만 실행할 함수 기본구조!
  //   console.log("state = unknown (until the callback is invoked)")
  //   firebase.auth().onAuthStateChanged(user => {
  //   if (user) {
  //     console.log("state = definitely signed in")
  //   }
  //   else {
  //     console.log("state = definitely signed out")
  //   }
  // })

  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  }, []);

  console.log("is_login :", is_login);

  React.useEffect(() => {
    loadUserFB();
  }, []);

  const onLogOutClick = () => {
    auth.signOut();
    navigate("/login");
  };

  // 전역으로 쓸 수 있게 포스팅 리스트를 전부 불러와서 인자로 보내주자
  const posting_lists = useSelector((state) => state.magazine.list);
  const dispatch = useDispatch();
  console.log(posting_lists);

  React.useEffect(() => {
    dispatch(loadMagazineFB());
  }, []);

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
                {/* <ProfileImage profileImage={user_lists.image_url} /> */}
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
        <Route
          path="/"
          element={<Main is_login={is_login} user_data={user_lists} />}
        />
        <Route
          path="/detail/a/:index"
          element={<DetailA list={posting_lists} is_login={is_login} />}
        />
        <Route
          path="/detail/b/:index"
          element={<DetailB list={posting_lists} is_login={is_login} />}
        />
        <Route
          path="/detail/c/:index"
          element={<DetailC list={posting_lists} is_login={is_login} />}
        />
        <Route
          path="/detail/a/modifi/:index"
          element={<ModifiA list={posting_lists} is_login={is_login} />}
        />
        <Route
          path="/detail/b/modifi/:index"
          element={<ModifiB list={posting_lists} is_login={is_login} />}
        />
        <Route
          path="/detail/c/modifi/:index"
          element={<ModifiC list={posting_lists} is_login={is_login} />}
        />
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
  margin-right: 46px;
  font-size: 14px;
  background-color: transparent;
  border: none;
  text-decoration: underline;
  color: #9f9f9f;
`;

const ProfileImage = styled.div`
  z-index: 10;
  width: 44px;
  height: 44px;
  background-color: #ddd;
  border-radius: 50%;
  margin-right: 52px;
  /* background-image: url(${(props) => props.profileImage}); */
  background-image: url(http://image.cine21.com/resize/cine21/person/2017/0421/17_13_30__58f9bf2aaf00b[W578-].jpg);
  background-position: center 30%;
  background-size: cover;
`;

export default App;
