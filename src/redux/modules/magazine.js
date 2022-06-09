import { db } from "../../shared/firebase.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

// Actions
const LOAD = "magazine/LOAD";
const CREATE = "magazine/CREATE";
const UPDATE = "magazine/UPDATE";
const DELETE = "magazine/DELETE";
const MODIFI = "magazine/MODIFI";

// Reducer
export default function reducer(state = initalState, action = {}) {
  switch (action.type) {
    case "magazine/LOAD": {
      console.log("이제 값을 불러올거야");
      console.log(action.magazine);
      // const q = query(action.magazine, orderBy("posting_id"), limit(1000));
      return { list: action.magazine, is_loaded: true };
    }

    case "magazine/CREATE": {
      console.log("이제 값을 만들거야");

      const new_magazine_list = [...state.list];
      return { ...state, list: new_magazine_list };
    }

    case "magazine/UPDATE": {
      console.log("완료!");

      const new_magazine_list = state.list.map((l, idx) => {
        if (parseInt(action.magazine_index) === idx) {
          return { ...l, completed: l.completed + 1 };
        } else {
          return l;
        }
      });
      console.log({ list: new_magazine_list });
      return { ...state, list: new_magazine_list };
    }

    case "magazine/MODIFI": {
      console.log("값을 수정할거야!");

      const new_magazine_list = state.list.map((l, idx) => {
        if (parseInt(action.magazine_index) === idx) {
          return { ...l };
        } else {
          return l;
        }
      });
      return { ...state, list: new_magazine_list };
    }

    case "magazine/DELETE": {
      const new_magazine_list = state.list.filter((l, idx) => {
        return parseInt(action.magazine_index) !== idx;
      });
      return { ...state, list: new_magazine_list };
    }
    default:
      return state;
  }
}

const initalState = {
  is_loaded: false,
  list: [
    // {
    //   posting_comment: [
    //     {
    //       comment: "멋지네요!",
    //       comment_time: "22.6.8 13:17",
    //       profileImage:
    //         "https://firebasestorage.googleapis.com/v0/b/magazine-d0ec8.appspot.com/o/images%2F1.png?alt=media&token=f1c91bb5-4d8c-466a-bb8f-f6a2df3639b1",
    //       nickname: "sonshine",
    //     },
    //   ],
    //   posting_image:
    //     "https://firebasestorage.googleapis.com/v0/b/magazine-d0ec8.appspot.com/o/images%2F1.png?alt=media&token=f1c91bb5-4d8c-466a-bb8f-f6a2df3639b1",
    //   posting_layoutType: "layoutA",
    //   posting_like: 0,
    //   posting_text: "안녕하세요! 오늘 날씨가 좋네요.",
    //   posting_time: "22.6.8 13:14",
    //   user_id: "sonshine@dev.com",
    //   user_nickname: "sonshine",
    //   user_profileImage:
    //     "https://firebasestorage.googleapis.com/v0/b/magazine-d0ec8.appspot.com/o/images%2F1.png?alt=media&token=f1c91bb5-4d8c-466a-bb8f-f6a2df3639b1",
    // },
    // {
    //   posting_comment: [
    //     {
    //       comment: "멋지네요!",
    //       comment_time: "22.6.8 13:17",
    //       profileImage:
    //         "https://firebasestorage.googleapis.com/v0/b/magazine-d0ec8.appspot.com/o/images%2F1.png?alt=media&token=f1c91bb5-4d8c-466a-bb8f-f6a2df3639b1",
    //       nickname: "sonshine",
    //     },
    //   ],
    //   posting_image:
    //     "https://firebasestorage.googleapis.com/v0/b/magazine-d0ec8.appspot.com/o/images%2F1.png?alt=media&token=f1c91bb5-4d8c-466a-bb8f-f6a2df3639b1",
    //   posting_layoutType: "layoutA",
    //   posting_like: 0,
    //   posting_text: "안녕하세요! 오늘 날씨가 좋네요.",
    //   posting_time: "2022.6.8 13:14",
    //   user_id: "sonshine@dev.com",
    //   user_nickname: "sonshine",
    //   user_profileImage:
    //     "https://firebasestorage.googleapis.com/v0/b/magazine-d0ec8.appspot.com/o/images%2F1.png?alt=media&token=f1c91bb5-4d8c-466a-bb8f-f6a2df3639b1",
    // },
  ],
};

// // Action Creators
export function loadMagazine(magazine) {
  return { type: LOAD, magazine };
}

export function createMagazine(magazine) {
  console.log("액션을 생성할거야!");
  return { type: CREATE, magazine };
}

export function updateMagazine(magazine_index) {
  console.log("액션을 완료할거야!");
  return { type: UPDATE, magazine_index };
}

export function modifiMagazine(magazine_index) {
  console.log("수정할 인덱스", magazine_index);
  return { type: MODIFI, magazine_index };
}

export function deleteMagazine(magazine_index) {
  console.log("지울 인덱스", magazine_index);
  return { type: DELETE, magazine_index };
}

/// middlewares(파이어베이스랑 통신하는 부분)
export const loadMagazineFB = () => {
  return async function (dispatch) {
    const magazine_data = await getDocs(collection(db, "magazine"));

    let magazine_list = [];

    magazine_data.forEach((magazine) => {
      magazine_list.push({ id: magazine.id, ...magazine.data() });
      // console.log(magazine_list);
    });
    dispatch(loadMagazine(magazine_list));
  };
};

export const createMagazineFB = (magazine) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "magazine"), magazine);
    const magazine_data = { id: docRef.id, ...magazine };
    dispatch(createMagazine(magazine_data));
  };
};

export const updateMagazineFB = (magazine_id, magazine_completed) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "magazine", magazine_id);
    await updateDoc(docRef, { completed: magazine_completed + 1 });

    console.log(getState().magazine);
    const _magazine_list = getState().magazine.list;
    const magazine_index = _magazine_list.findIndex((m) => {
      return m.id === magazine_id;
    });

    dispatch(updateMagazine(magazine_index));
  };
};

export const deleteMagazineFB = (magazine_id) => {
  return async function (dispatch, getState) {
    if (!magazine_id) {
      window.alert("아이디가 없네요!");
      return;
    }
    const docRef = doc(db, "magazine", magazine_id);
    await deleteDoc(docRef);

    const _magazine_list = getState().magazine.list;
    const magazine_index = _magazine_list.findIndex((m) => {
      return m.id === magazine_id;
    });

    dispatch(deleteMagazine(magazine_index));
  };
};
