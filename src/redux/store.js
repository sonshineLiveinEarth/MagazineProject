import { configureStore } from "@reduxjs/toolkit";
import magazineSlice from "./modules/magazineSlice";

const store = configureStore({
  reducer: {
    magazine: magazineSlice,
  },
});

export default store;
