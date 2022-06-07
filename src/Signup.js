import React, { useState } from "react";
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
  const [profileImage, setProfileImage] = useState();
  const navigate = useNavigate();
  const name_ref = React.useRef(null);
  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);
  const pw_ref2 = React.useRef(null);
  const file_link_ref = React.useRef(null);

  const signupFB = async () => {
    const user = await createUserWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert("제대로 입력했는지 확인해주세요.");
      });

    const user_data = await addDoc(collection(db, "users"), {
      user_id: id_ref.current?.value,
      name: name_ref.current?.value,
      image_url: profileImage.url,
    });
    console.log(user_data);
  };

  const uploadFB = async () => {
    console.log(profileImage.name.name);
    const uploaded_file = await uploadBytes(
      ref(storage, `images/${profileImage.name.name}`),
      profileImage.name
    );
    console.log(uploaded_file);

    const file_url = await getDownloadURL(uploaded_file.ref);
    file_link_ref.current = { url: file_url };
  };

  const reader = new FileReader();

  const preview = (e) => {
    reader.readAsDataURL(e.target.files[0]);
    return new Promise((resolve) => {
      reader.onload = () => {
        setProfileImage({ name: e.target.files[0], url: reader.result });
        resolve();
      };
    });
  };

  // if (!name_ref || !id_ref || !pw_ref || !pw_ref2 || !file_link_ref)
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
          <Input ref={pw_ref2} placeholder="비밀번호 확인" />
        </Div>

        <Div2>
          <Title>프로필 사진</Title>
          <Div3>
            <ImageFeild>
              {profileImage && (
                <img
                  src={profileImage.url}
                  alt="프로필 사진 미리보기"
                  style={{
                    width: "142px",
                    height: "142px",
                    objectFit: "cover",
                    zIndex: "2",
                    borderRadius: "50%",
                  }}
                />
              )}
              {!profileImage && <span> 미리보기</span>}
            </ImageFeild>

            <FileBtn htmlfor="file"> 사진 선택</FileBtn>
            <InputFile
              onChange={preview}
              type="file"
              id="file"
              ref={file_link_ref}
            />
          </Div3>
        </Div2>

        {!name_ref || !id_ref || !pw_ref || !pw_ref2 ? (
          <SignupBtn disabled />
        ) : (
          <SignupBtn
            onClick={() => {
              signupFB();
              uploadFB();
            }}
          >
            회원가입 완료
          </SignupBtn>
        )}
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
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
  border-radius: 50%;
  color: #c7c7c7;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

/* 파일첨부 기본 디자인을 없애는 css */
const InputFile = styled.input`
  /* position: absolute; */
  /* width: 1px;
  height: 1px; */
  /* padding: 0;
  margin: -1px;
  overflow: hidden; */
  /* clip: rect(0, 0, 0, 0); */
  /* text-align: center; */
  position: absolute;
  width: 98px;
  height: 46px;
  background-color: white;
  border: 1.5px solid black;
  z-index: 2;
  font-size: 20px;
  margin-left: 160px;
  opacity: 0;
`;

const FileBtn = styled.button`
  position: relative;
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

const SignupBtn = styled.button`
  max-width: 600px;
  width: 90%;
  height: 56px;
  margin-top: 60px;
  background-color: #00000090;
  border: 1px solid black;
  border-radius: 8px;
  color: #ddd;
  font-weight: bold;
  font-size: 16px;
  &:enabled {
    background-color: #000000;
    border: 1px solid black;
    color: white;
  }
  &:hover:enabled {
    opacity: 0.8;
  }
`;

export default Signup;
