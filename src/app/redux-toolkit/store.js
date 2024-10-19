const { configureStore } = require("@reduxjs/toolkit")
import additionSlice from "../redux-toolkit/slices/additionSlice"

const store = configureStore({
  reducer: {
    addition: additionSlice,
  },
})

export default store
