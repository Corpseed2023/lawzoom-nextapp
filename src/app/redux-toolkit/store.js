const { configureStore } = require("@reduxjs/toolkit")
import additionSlice from "../redux-toolkit/slices/additionSlice"
import authSlice from '../redux-toolkit/slices/authSlice'
import commonSlice from '../redux-toolkit/slices/commonSlice'

const store = configureStore({
  reducer: {
    addition: additionSlice,
    auth:authSlice,
    common:commonSlice
  },
})

export default store
