import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string;
}

const initialState: UserState = {
  id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ id: string }>) {
      console.log('setUser', action.payload.id, action);
      state.id = action.payload.id;
    },
    clearUser(state) {
      state.id = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
