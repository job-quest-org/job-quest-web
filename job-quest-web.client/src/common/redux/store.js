import { configureStore } from '@reduxjs/toolkit';
import candidateProfileReducer from './candidateProfileSlice.js';
import recruiterProfileReducer from './recruiterProfileSlice.js';

export const store = configureStore({
  reducer: {
    candidateProfile: candidateProfileReducer,
    recruiterProfile: recruiterProfileReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
