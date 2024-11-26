import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// 配置 Store
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// 定义类型
export type RootState = ReturnType<typeof store.getState>; // 全局状态类型
export type AppDispatch = typeof store.dispatch;          // Dispatch 类型

export default store;