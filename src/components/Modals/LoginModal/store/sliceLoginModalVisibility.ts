import { createSlice } from '@reduxjs/toolkit';

const sliceLoginModalVisibility = createSlice({
  name: 'LoginModal/Visibility',
  initialState: {
    isVisible: false,
    condition: false,
  },
  reducers: {
    visibility: (state, action) => {
      state.isVisible = action.payload.isVisible;
      state.condition = action.payload.condition;
    },
  },
});

export const { visibility } = sliceLoginModalVisibility.actions;

export default sliceLoginModalVisibility.reducer;
