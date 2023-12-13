import { configureStore } from '@reduxjs/toolkit';
import SliceLoginModalVisibility from '../components/Modals/LoginModal/store/sliceLoginModalVisibility';

export const store = configureStore({
  reducer: {
    loginModalVisibility: SliceLoginModalVisibility,
  },
});

export type AppStore = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
