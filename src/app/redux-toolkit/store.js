import { configureStore } from "@reduxjs/toolkit";
import additionSlice from "../redux-toolkit/slices/additionSlice";
import authSlice from "../redux-toolkit/slices/authSlice";
import commonSlice from "../redux-toolkit/slices/commonSlice";
import settingSlice from "../redux-toolkit/slices/settingSlice";
import companySlice from "../redux-toolkit/slices/companySlice";

const store = configureStore({
  reducer: {
    addition: additionSlice,
    auth: authSlice,
    common: commonSlice,
    setting: settingSlice,
    company: companySlice,
  },
});

export default store;
