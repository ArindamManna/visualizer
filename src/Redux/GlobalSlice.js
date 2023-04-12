import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { ApiHelperFunction } from "../Api/ApiHelperfunction";



export const GlobalSlice = createSlice({
  name: "counter",
  initialState: {
    
  },

  reducers: {
    updateGlobalState: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    
  },

  // extraReducers: (builder) => {
  //   builder
    //   .addCase(getuserprofile.pending, (state, action) => {
    //     state.status = true;
    //   })
    //   .addCase(getuserprofile.fulfilled, (state, action) => {
    //     state.responce = action.payload;
    //     return state;
    //   });
  // },
});

// Action creators are generated for each case reducer function
export const { updateGlobalState } = GlobalSlice.actions;

export default GlobalSlice.reducer;
