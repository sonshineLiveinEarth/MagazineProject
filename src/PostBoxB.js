import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { auth } from "./shared/firebase";
import { deleteMagazineFB } from "./redux/modules/magazine";
import { useDispatch } from "react-redux";

const PostBoxB = (list) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <PostBox2>
        <ProfileWrap>
          <Profile>
            <ProfileImg profileImage={list.list.user_profileImage} />
            <Nickname>{list.list.user_nickname}</Nickname>
          </Profile>
          {auth.currentUser !== null
            ? list.list.user_id === auth.currentUser.email && (
                <DeleteBtn
                  onClick={() => {
                    dispatch(deleteMagazineFB(list.list.id));
                  }}
                >
                  삭제
                </DeleteBtn>
              )
            : null}
        </ProfileWrap>

        <ContentsWrapB>
          <PostContentB>
            {list.list.posting_text}
            <PostDateB>{list.list.posting_time}</PostDateB>
          </PostContentB>

          <PostImageB
            postImage={list.list.posting_image}
            onClick={() => {
              navigate(`/detail/b/${list.index}`);
            }}
          />
        </ContentsWrapB>

        <Hr />
      </PostBox2>
    </>
  );
};

const PostBox2 = styled.div`
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
  font-size: 16px;
  background-color: transparent;
  border: none;
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

export default PostBoxB;
