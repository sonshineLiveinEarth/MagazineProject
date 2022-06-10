import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { auth } from "./shared/firebase";
// import { useSelector } from "react-redux";

const PostBoxA = (list) => {
  const navigate = useNavigate();

  return (
    <PostBox>
      <ProfileWrap>
        <Profile>
          <ProfileImg profileImage={list.list.user_profileImage} />
          <Nickname>{list.list.user_nickname}</Nickname>
        </Profile>
        {auth.currentUser !== null
          ? list.list.user_id === auth.currentUser.email && (
              <DeleteBtn
                onClick={() => {
                  navigate(`/detail/a/${list.index}`);
                }}
              >
                삭제
              </DeleteBtn>
            )
          : null}
      </ProfileWrap>

      <PostImage
        postImage={list.list.posting_image}
        onClick={() => {
          navigate(`/detail/a/${list.index}`);
        }}
      />
      <PostContent>
        <Nickname>{list.list.user_nickname}</Nickname>
        {list.list.posting_text}
      </PostContent>
      <PostDate>{list.list.posting_time}</PostDate>
      <Hr />
    </PostBox>
  );
};

const PostBox = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  margin-top: 30px;
`;

const ProfileWrap = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DeleteBtn = styled.button`
  width: 60px;
  height: auto;
  text-decoration: underline;
  color: #aaa;
  font-size: 14px;
  background-color: transparent;
  border: none;
  margin-right: 26px;
`;

const Profile = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfileImg = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #ddd;
  background-image: url(${(props) => props.profileImage});
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
  max-width: 600px;
  width: 100%;
  padding-bottom: 100%;
  margin-top: 20px;
  background-image: url(${(props) => props.postImage});
  background-position: center 30%;
  background-size: cover;
`;

const PostContent = styled.div`
  max-width: 548px;
  width: 100%;
  font-size: 16px;
  margin: 10px 26px 10px 26px;
  word-break: break-all;
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
`;

const PostDate = styled.span`
  font-size: 14px;
  color: #a2a2a2;
  margin-left: 26px;
`;

const Hr = styled.hr`
  max-width: 600px;
  width: 100%;
  margin-top: 30px;
  border: 0.5px solid #f2f2f2;
`;

export default PostBoxA;
