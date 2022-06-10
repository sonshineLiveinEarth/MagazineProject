import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { modifiMagazineFB } from "./redux/modules/magazine";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "./shared/firebase";
// import { useSelector } from "react-redux";

const ModifiA = (list) => {
  const navigate = useNavigate();
  const index = useParams();
  const posting = list.list[index.index];
  console.log(list.is_login);
  const dispatch = useDispatch();
  const text = React.useRef(null);
  const magazine_id = list.list[index.index].id;

  const modifiMagazine = (magazine_id) => {
    const modifi = {
      posting_id: list.list[index.index].posting_id,
      posting_comment: list.list[index.index].posting_comment,
      posting_image: list.list[index.index].posting_image,
      posting_layoutType: list.list[index.index].posting_layoutType,
      posting_like: list.list[index.index].posting_like,
      posting_text: text.current.value,
      posting_time: list.list[index.index].posting_time,
      user_id: list.list[index.index].user_id,
      user_nickname: list.list[index.index].user_nickname,
      user_profileImage: list.list[index.index].user_profileImage,
    };
    dispatch(modifiMagazineFB(modifi, magazine_id));
  };

  return (
    <>
      <Margin />
      <Wrap>
        <PostBox>
          <ProfileWrap>
            <Profile>
              <ProfileImg profileImage={posting.user_profileImage} />
              <Nickname>{posting.user_nickname}</Nickname>
            </Profile>
            {auth.currentUser !== null
              ? posting.user_id === auth.currentUser.email && (
                  <>
                    <ModifiBtn
                      onClick={() => {
                        modifiMagazine(magazine_id);
                        navigate("/");
                      }}
                    >
                      수정완료
                    </ModifiBtn>
                  </>
                )
              : null}
          </ProfileWrap>

          <PostImage postImage={posting.posting_image} />
          <PostContent>
            <Nickname>{posting.user_nickname}</Nickname>
            {posting.posting_text}
          </PostContent>
          <PostDate>{posting.posting_time}</PostDate>
          <Hr />
        </PostBox>
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

const ProfileWrap = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ModifiBtn = styled.button`
  width: 80px;
  height: 26px;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  background-color: black;
  border: 1px solid black;
  margin-right: 26px;
  &:hover {
    background-color: transparent;
    color: black;
    font-weight: bold;
  }
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
  background-color: #ddd;
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

export default ModifiA;
