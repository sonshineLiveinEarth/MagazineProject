import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { auth, db } from "./shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDocs, where, query, collection } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();

  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);

  const loginFB = async () => {
    console.log(id_ref.current.value, pw_ref.current.value);
    const user = await signInWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );
    console.log(user);

    const user_docs = await getDocs(
      query(collection(db, "users"), where("user_id", "==", user.user.email))
    );
    user_docs.forEach((u) => {
      console.log(u.data());
    });
  };

  return (
    <>
      <Wrap>
        <Form>
          <Input ref={id_ref} placeholder="아이디" />
          <Input ref={pw_ref} placeholder="비밀번호" />
          <LoginBtn
            onClick={() => {
              loginFB();
            }}
          >
            로그인하기
          </LoginBtn>
          <SigninBtn
            onClick={() => {
              navigate("/signup");
            }}
          >
            회원가입하기
          </SigninBtn>
        </Form>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  margin-top: 300px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  max-width: 580px;
  width: 88%;
  height: 46px;
  margin-top: 20px;
  background-color: #f7f7f7;
  padding: 0px 10px;
  border: 1px solid #c7c7c7;
  border-radius: 8px;
  &::placeholder {
    color: #aaa;
    font-weight: bold;
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border: 1px solid black;
  }
`;

const LoginBtn = styled.button`
  max-width: 600px;
  width: 90%;
  height: 56px;
  margin-top: 60px;
  background-color: #000000;
  border: 1px solid black;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  &:hover {
    opacity: 0.8;
  }
`;

const SigninBtn = styled.button`
  max-width: 600px;
  width: 90%;
  height: 56px;
  margin-top: 20px;
  background-color: #fff;
  border: 1.5px solid black;
  border-radius: 8px;
  color: black;
  font-weight: bold;
  font-size: 16px;
  &:hover {
    background-color: #f7f7f7;
  }
`;

export default Login;
