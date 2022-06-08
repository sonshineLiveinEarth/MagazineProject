import { db } from "../../shared/firebase.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Actions
const LOAD = "users/LOAD";

// Reducer
export default function reducer(state = initalState, action = {}) {
  switch (action.type) {
    case "users/LOAD": {
      console.log("이제 값을 불러올거야");
      console.log(action.users.sort());

      return { list: action.users, is_loaded: true };
    }
    default:
      return state;
  }
}

const initalState = {
  list: [
    // {
    //   image_url: "https://firebasestorage.googleapis.com/v0/b/magazine-d0ec8.appspot.com/o/images%2F1.png?alt=media&token=f1c91bb5-4d8c-466a-bb8f-f6a2df3639b1",
    //   name: "dkssud",
    //   user_id: "dkssud@dev.com"
    // },
    // {
    //   image_url: "https://firebasestorage.googleapis.com/v0/b/magazine-d0ec8.appspot.com/o/images%2F1.png?alt=media&token=f1c91bb5-4d8c-466a-bb8f-f6a2df3639b1",
    //   name: "somsom2",
    //   user_id: "somsom2@dev.com"
    // }
  ],
};

// // Action Creators
export function loadUser(users) {
  return { type: LOAD, users };
}

/// middlewares(파이어베이스랑 통신하는 부분)
export const loadUserFB = () => {
  return async function (dispatch) {
    const user_data = await getDocs(collection(db, "users"));

    let user_list = [];
    console.log(user_data);

    user_data.forEach((users) => {
      user_list.push({ id: users.id, ...users.data() });
    });
    dispatch(loadUser(user_list));
  };
};
