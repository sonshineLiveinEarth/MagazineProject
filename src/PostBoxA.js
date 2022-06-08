import React from "react";
import styled from "styled-components";
// import { useSelector } from "react-redux";

const PostBoxA = (list) => {
  // const posting_lists = useSelector((state) => state.magazine.list);
  // console.log(posting_lists);

  console.log(list.list.user_nickname);

  return (
    <PostBox>
      <Profile>
        <ProfileImg profileImage={list.list.user_profileImage} />
        <Nickname>{list.list.user_nickname}</Nickname>
      </Profile>

      <PostImage postImage={list.list.posting_image} />
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
