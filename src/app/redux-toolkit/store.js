import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux-toolkit/slices/authSlice";
import commonSlice from "../redux-toolkit/slices/commonSlice";
import settingSlice from "../redux-toolkit/slices/settingSlice";
import companySlice from "../redux-toolkit/slices/companySlice";
import usersSlice from "../redux-toolkit/slices/usersSlice";
import employeesSlice from "../redux-toolkit/slices/employeesSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    common: commonSlice,
    setting: settingSlice,
    company: companySlice,
    users: usersSlice,
    employee: employeesSlice,
  },
});

export default store;
