import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import pencil from "./pencil.png";

const Main = () => {
  const navigate = useNavigate();
  return (
    <>
      <Margin />
      <Wrap>
        <PostBoxA>
          <Profile>
            <ProfileImg />
            <Nickname>nickname</Nickname>
          </Profile>

          <PostImage />
          <PostContent>
            <Nickname>nickname</Nickname>여기에 내용이 들어갑니다. 여기에 내용이
            들어갑니다. 여기에 내용이 들어갑니다. 여기에 내용이 들어갑니다.
          </PostContent>
          <PostDate>2022.06.06 21:35</PostDate>
          <Hr />
        </PostBoxA>
        <PostBoxA>
          <Profile>
            <ProfileImg />
            <Nickname>nickname</Nickname>
          </Profile>

          <PostImage />
          <PostContent>
            <Nickname>nickname</Nickname>여기에 내용이 들어갑니다. 여기에 내용이
            들어갑니다. 여기에 내용이 들어갑니다. 여기에 내용이 들어갑니다.
          </PostContent>
          <PostDate>2022.06.06 21:35</PostDate>
          <Hr />
        </PostBoxA>
      </Wrap>

      <PostBtn
        onClick={() => {
          navigate("/write");
        }}
      >
        <Pencil src={pencil} />
      </PostBtn>
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
`;

const PostBoxA = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  margin-top: 30px;
`;

const Profile = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileImg = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-image: url("http://image.cine21.com/resize/cine21/person/2017/0421/17_13_30__58f9bf2aaf00b[W578-].jpg");
  background-position: center 30%;
  background-size: cover;
  margin-left: 26px;
  margin-right: 8px;
`;

const Nickname = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-right: 8px;
`;

const PostImage = styled.div`
  width: 100vw;
  padding-bottom: 100%;
  margin-top: 20px;
  background-image: url("https://i.pinimg.com/564x/2f/19/48/2f19480d929387ad08b3c98bf9231099.jpg");
  background-position: center 30%;
  background-size: cover;
`;

const PostContent = styled.div`
  font-size: 16px;
  margin: 10px 26px 10px 26px;
`;

const PostDate = styled.span`
  font-size: 14px;
  color: #a2a2a2;
  margin-left: 26px;
`;

const Hr = styled.hr`
  width: 100vw;
  margin-top: 30px;
  border: 0.5px solid #f2f2f2;
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
