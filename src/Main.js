import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import pencil from "./pencil.png";
import PostingCard from "./PostingCard";
import { auth } from "./shared/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Main = (props) => {
  const navigate = useNavigate();
  const [is_login, setIsLogin] = React.useState(false);

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

  return (
    <>
      <Margin />
      <Wrap>
        <PostingCard />
      </Wrap>
      {is_login ? (
        <PostBtn
          onClick={() => {
            navigate("/write");
          }}
        >
          <Pencil src={pencil} />
        </PostBtn>
      ) : null}
    </>
  );
};

const Margin = styled.div`
  width: 100vw;
  height: 8vh;
`;

const Wrap = styled.div`
  max-width: 600px;
  width: 100vw;
  height: auto;
  margin: auto;
`;

const PostBtn = styled.button`
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background-color: black;
  position: fixed;
  bottom: 40px;
  right: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    box-shadow: 3px 3px 20px #bbb;
  }
`;

const Pencil = styled.img`
  width: 20px;
  height: 20px;
`;

export default Main;
