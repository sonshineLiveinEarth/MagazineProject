import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loadMagazineFB } from "./redux/modules/magazine";
import PostBoxA from "./PostBoxA";
import PostBoxB from "./PostBoxB";
import PostBoxC from "./PostBoxC";

const PostingCard = (props) => {
  const posting_lists = useSelector((state) => state.magazine.list);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadMagazineFB());
  }, []);
  console.log(posting_lists);
  return (
    <>
      {posting_lists.map((list, index) => {
        return (
          <React.Fragment key={index}>
            {list.posting_layoutType === "layoutA" && <PostBoxA list={list} />}
            {list.posting_layoutType === "layoutB" && <PostBoxB list={list} />}
            {list.posting_layoutType === "layoutC" && <PostBoxC list={list} />}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default PostingCard;
