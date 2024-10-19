const { createSlice } = require("@reduxjs/toolkit")

const additionSlice = createSlice({
  name: "addition",
  initialState: {
    sum: 0,
  },
  reducers: {
    handleAddition: (state, action) => {
      state.sum = state.sum + action.payload
    },
  },
})

export const { handleAddition } = additionSlice.actions

export default additionSlice.reducer
