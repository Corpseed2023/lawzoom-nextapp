// const { configureStore } = require("@reduxjs/toolkit")
// import additionSlice from "../redux-toolkit/slices/additionSlice"
// import authSlice from '../redux-toolkit/slices/authSlice'
// import commonSlice from '../redux-toolkit/slices/commonSlice'
// import settingSlice from '../redux-toolkit/slices/settingSlice'

// const store = configureStore({
//   reducer: {
//     addition: additionSlice,
//     auth:authSlice,
//     common:commonSlice,
//     setting:settingSlice
//   },
// })

// export default store

import { configureStore } from "@reduxjs/toolkit";
import additionSlice from "../redux-toolkit/slices/additionSlice";
import authSlice from "../redux-toolkit/slices/authSlice";
import commonSlice from "../redux-toolkit/slices/commonSlice";
import settingSlice from "../redux-toolkit/slices/settingSlice";

const createStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      addition: additionSlice,
      auth: authSlice,
      common: commonSlice,
      setting: settingSlice,
    },
    preloadedState,
  });
};

const store = createStore();
export default store;
