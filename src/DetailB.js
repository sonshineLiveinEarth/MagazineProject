import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { deleteMagazineFB } from "./redux/modules/magazine";
import { useDispatch } from "react-redux";
import { auth } from "./shared/firebase";

const DetailB = (list) => {
  const index = useParams();
  const posting = list.list[index.index];
  const dispatch = useDispatch();

  return (
    <>
      <Margin />
      <Wrap>
        <PostBox2>
          <ProfileWrap>
            <Profile>
              <ProfileImg profileImage={posting.user_profileImage} />
              <Nickname>{posting.user_nickname}</Nickname>
            </Profile>
            {auth.currentUser !== null
              ? posting.user_id === auth.currentUser.email && (
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
              {posting.posting_text}
              <PostDateB>{posting.posting_time}</PostDateB>
            </PostContentB>

            <PostImageB postImage={posting.posting_image} />
          </ContentsWrapB>

          <Hr />
        </PostBox2>
      </Wrap>
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
  background-color: #ddd;
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

export default DetailB;
