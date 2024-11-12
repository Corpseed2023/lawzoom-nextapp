const { configureStore } = require("@reduxjs/toolkit")
import additionSlice from "../redux-toolkit/slices/additionSlice"
import authSlice from '../redux-toolkit/slices/authSlice'

const store = configureStore({
  reducer: {
    addition: additionSlice,
    auth:authSlice
  },
})

export default store
