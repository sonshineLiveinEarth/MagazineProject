import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { auth } from "./shared/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./shared/firebase.js";
import { createMagazineFB } from "./redux/modules/magazine";

const Write = (proprs) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [PostingImage, setPostingImage] = useState(null);
  const [layout, setLayout] = useState(null);
  // 현재 로그인한 유저의 데이터
  const [userData, setUserData] = useState(null);
  // 포스팅내용 미입력시 버튼 비활성화
  const [text, enableButton] = useState("");

  const handleTextChange = (event) => {
    if (PostingImage !== null && layout !== null) {
      enableButton(event.target.value);
    }
  };

  const textContent = React.useRef(null);

  // 현재 로그인되어 있는 유저id == 'users' DB 에 동일한 id를 가지고 있는 객체 불어오기!
  const user_data = collection(db, "users");
  const q = query(user_data, where("user_id", "==", auth.currentUser.email));

  const querySnapshot = async () => {
    const snapshot = await getDocs(q);
    snapshot.forEach((doc) => {
      console.log(doc.data());
      setUserData(doc.data());
    });
  };

  React.useEffect(() => {
    querySnapshot();
  }, []);

  // 업로드한 사진 미리보기
  const reader = new FileReader();

  const preview = (e) => {
    reader.readAsDataURL(e.target.files[0]);
    return new Promise((resolve) => {
      reader.onload = () => {
        setPostingImage({ name: e.target.files[0], url: reader.result });
        resolve();
      };
    });
  };

  // 레이아웃 라디오버튼 값 변경하기
  const handleChange = (e) => {
    setLayout(e.target.value);
  };

  const addPost = () => {
    //포스팅 작성한 시간 커스텀하기
    const now = new Date();
    const year = now.getFullYear();
    const month = Number(now.getMonth() + 1);
    const date = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const time = year + "." + month + "." + date + " " + hours + ":" + minutes;
    // 파이어베이스에 데이터 추가하기!
    dispatch(
      createMagazineFB({
        posting_comment: [],
        posting_image: PostingImage.url,
        posting_layoutType: layout,
        posting_like: 0,
        posting_text: textContent.current.value,
        posting_time: time,
        user_id: userData.user_id,
        user_nickname: userData.name,
        user_profileImage: userData.image_url,
      })
    );
  };

  return (
    <>
      <Margin />

      <Wrap>
        <Title>레이아웃 선택</Title>
        <LayoutBoxs>
          <LayoutBox1>
            <RadioBtn
              type="radio"
              name="layout"
              value="layoutA"
              onChange={handleChange}
            />
            <ImageBox></ImageBox>
            <Text>문구가 아래에</Text>
          </LayoutBox1>

          <LayoutBox>
            <RadioBtn
              type="radio"
              name="layout"
              value="layoutB"
              onChange={handleChange}
            />
            <LayoutBoxSmall>
              <Text>
                문구가 <br /> 왼쪽
              </Text>
              <ImageBox2></ImageBox2>
            </LayoutBoxSmall>
          </LayoutBox>

          <LayoutBox>
            <RadioBtn
              type="radio"
              name="layout"
              value="layoutC"
              onChange={handleChange}
            />
            <LayoutBoxSmall>
              <ImageBox></ImageBox>
              <TextR>
                문구가 <br /> 오른쪽
              </TextR>
            </LayoutBoxSmall>
          </LayoutBox>
        </LayoutBoxs>
        <Div2>
          <Title>사진 선택</Title>
          <Div3>
            <ImageFeild>
              {PostingImage && (
                <img
                  src={PostingImage.url}
                  alt="프로필 사진 미리보기"
                  style={{
                    width: "142px",
                    height: "142px",
                    objectFit: "cover",
                    zIndex: "2",
                    borderRadius: "8px",
                  }}
                />
              )}
              {!PostingImage && <span> 미리보기</span>}
            </ImageFeild>
            <FileBtn htmlfor="postImage">사진 선택</FileBtn>
            <InputFile onChange={preview} type="file" id="postImage" />
          </Div3>
        </Div2>
        <TextContent
          onChange={handleTextChange}
          ref={textContent}
          placeholder="문구를 작성해주세요"
        />
        <DoneBtn
          onClick={() => {
            addPost();
            navigate("/");
          }}
          disabled={!text}
        >
          작성 완료
        </DoneBtn>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Margin = styled.div`
  width: 100vw;
  height: 1vh;
`;

const LayoutBoxs = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LayoutBox1 = styled.div`
  width: 33%;
  height: 150px;
  margin: 20px 0px;
  border: 0.5px solid #dedede;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 10px;
`;

const RadioBtn = styled.input`
  width: 18px;
  height: 18px;
  border: 1px solid black;
  margin-top: 10px;
  margin-left: 20px;
`;

const LayoutBox = styled.div`
  width: 33%;
  height: 150px;
  margin: 20px 0px;
  border: 0.5px solid #dedede;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 10px;
`;

const LayoutBoxSmall = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ImageBox = styled.div`
  width: 60px;
  height: 60px;
  background-color: #f7f7f7;
  margin-left: 20px;
`;

const ImageBox2 = styled.div`
  width: 60px;
  height: 60px;
  background-color: #f7f7f7;
`;

const Text = styled.span`
  font-size: 14px;
  margin-left: 20px;
  text-align: left;
  font-weight: bold;
  color: #aaa;
`;

const TextR = styled.span`
  font-size: 14px;
  margin-left: 4px;
  text-align: left;
  font-weight: bold;
  color: #aaa;
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

const Title = styled.span`
  align-self: flex-start;
  max-width: 580px;
  width: 88%;
  text-align: left;
  margin: 0px auto;
  font-weight: bold;
  font-size: 16px;
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

/* 파일첨부 기본 디자인을 없애는 css */
const InputFile = styled.input`
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
  width: 80px;
  height: 40px;
  background-color: white;
  border: 1.5px solid black;
  font-size: 14px;
  border-radius: 8px;
  margin-left: 16px;
  font-weight: bold;
  align-self: flex-start;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const TextContent = styled.textarea`
  max-width: 580px;
  width: 86%;
  height: 176px;
  margin-top: 30px;
  border-radius: 8px;
  background-color: #f7f7f7;
  border: 1px solid #c7c7c7;
  padding: 10px;
  &::placeholder {
    color: #c7c7c7;
    font-weight: bold;
    font-size: 16px;
  }
`;

const DoneBtn = styled.button`
  max-width: 600px;
  width: 90%;
  height: 56px;
  margin-top: 30px;
  background-color: #000000;
  border: 1px solid black;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    background-color: #aaa;
    border: 1px solid #aaa;
  }
`;

export default Write;
