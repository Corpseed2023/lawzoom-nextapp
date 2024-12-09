import { configureStore } from "@reduxjs/toolkit";
import additionSlice from "../redux-toolkit/slices/additionSlice";
import authSlice from "../redux-toolkit/slices/authSlice";
import commonSlice from "../redux-toolkit/slices/commonSlice";
import settingSlice from "../redux-toolkit/slices/settingSlice";
import companySlice from "../redux-toolkit/slices/companySlice";
import usersSlice from "../redux-toolkit/slices/usersSlice";

const store = configureStore({
  reducer: {
    addition: additionSlice,
    auth: authSlice,
    common: commonSlice,
    setting: settingSlice,
    company: companySlice,
    users:usersSlice
  },
});

export default store;
