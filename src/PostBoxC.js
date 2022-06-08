import React from "react";
import styled from "styled-components";

const PostBoxC = (list) => {
  return (
    <PostBox3>
      <Profile>
        <ProfileImg profileImage={list.list.user_profileImage} />
        <Nickname>{list.list.user_nickname}</Nickname>
      </Profile>
      <ContentsWrapB>
        <PostImageB postImage={list.list.posting_image} />
        <PostContentB>
          {list.list.posting_text}
          <PostDateB>{list.list.posting_time}</PostDateB>
        </PostContentB>
      </ContentsWrapB>

      <Hr />
    </PostBox3>
  );
};

const PostBox3 = styled.div`
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

const ContentsWrapB = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const PostImageB = styled.div`
  max-width: 300px;
  width: 50%;
  padding-bottom: 50%;
  margin-top: 20px;
  align-self: flex-end;
  background-image: url(${(props) => props.postImage});
  background-position: center 30%;
  background-size: cover;
`;

const PostContentB = styled.div`
  max-width: 300px;
  width: 50%;
  font-size: 16px;
  margin: 18px 26px 10px 26px;
  display: flex;
  flex-direction: column;
`;

const PostDateB = styled.span`
  font-size: 14px;
  color: #a2a2a2;
  margin-top: 10px;
`;

const Hr = styled.hr`
  max-width: 600px;
  width: 100%;
  margin-top: 30px;
  border: 0.5px solid #f2f2f2;
`;

export default PostBoxC;
