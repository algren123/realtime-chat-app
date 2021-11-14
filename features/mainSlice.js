import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: '',
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    updateContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { updateContent } = mainSlice.actions;

export default mainSlice.reducer;
