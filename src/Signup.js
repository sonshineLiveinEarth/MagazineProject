import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db, storage } from "./shared/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Signup = () => {
  const navigate = useNavigate();
  const name_ref = React.useRef(null);
  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  const file_link_ref = React.useRef(null);

  const [is_login, setIsLogin] = React.useState(false);

  const signupFB = async () => {
    // 벨리데이션
    // if(id_ref.current.value === "") {
    //   return false;
    // }
    const user = await createUserWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );
    console.log(user);

    const user_data = await addDoc(collection(db, "users"), {
      user_id: user.user.email,
      name: name_ref.current?.value,
      image_url: file_link_ref.current?.url,
    });
    console.log(user_data.id);
  };

  const uploadFB = async (e) => {
    console.log(e.target.files);
    const uploaded_file = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );
    console.log(uploaded_file);

    const file_url = await getDownloadURL(uploaded_file.ref);
    file_link_ref.current = { url: file_url };
  };

  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  // React.useEffect(() => {
  //   onAuthStateChanged(auth, loginCheck);
  // }, []);

  return (
    <>
      <Wrap>
        <Div>
          <Title>닉네임</Title>
          <Input ref={name_ref} placeholder="닉네임" />
        </Div>

        <Div>
          <Title>아이디</Title>
          <Input ref={id_ref} placeholder="아이디" />
        </Div>

        <Div>
          <Title>비밀번호</Title>
          <Input ref={pw_ref} placeholder="비밀번호" />
          <Input placeholder="비밀번호 확인" />
        </Div>

        <Div2>
          <Title>프로필 사진</Title>
          <Div3>
            <ImageFeild>미리보기</ImageFeild>
            <FileBtn>
              사진 선택
              <input onChange={uploadFB} type="file" id="file" />
            </FileBtn>
          </Div3>
        </Div2>

        <LoginBtn
          type="submit"
          onClick={() => {
            signupFB();
            // {
            //   is_login
            //     ? window.alert("환영합니다!")
            //     : window.alert("회원가입 실패ㅠㅠ");
            // }
          }}
        >
          회원가입 완료하기
        </LoginBtn>
      </Wrap>
    </>
  );
};

const Wrap = styled.form`
  position: fixed;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Div = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Div2 = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const Div3 = styled.div`
  max-width: 580px;
  width: 88%;
  margin: 20px auto 0px auto;
  display: flex;
  flex-direction: row;
`;

const ImageFeild = styled.div`
  width: 142px;
  height: 142px;
  background-color: #f7f7f7;
  border: 1px solid #c7c7c7;
  border-radius: 8px;
  color: #c7c7c7;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.span`
  align-self: flex-start;
  max-width: 580px;
  width: 88%;
  text-align: left;
  margin: auto;
  font-weight: bold;
  font-size: 16px;
  margin-top: 26px;
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
    color: #c7c7c7;
    font-weight: bold;
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border: 1px solid black;
  }
`;

// /* 파일첨부 기본 디자인을 없애는 css */
// const InputFile = styled.input`
//   position: absolute;
//   width: 1px;
//   height: 1px;
//   padding: 0;
//   margin: -1px;
//   overflow: hidden;
//   clip: rect(0, 0, 0, 0);
//   text-align: center;
// `;

const FileBtn = styled.button`
  width: 98px;
  height: 46px;
  background-color: white;
  border: 1.5px solid black;
  font-size: 16px;
  border-radius: 8px;
  margin-left: 16px;
  align-self: flex-start;
  &:hover {
    background-color: black;
    color: white;
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

export default Signup;
