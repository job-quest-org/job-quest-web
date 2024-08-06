import { configureStore } from '@reduxjs/toolkit';
import candidateProfileReducer from './candidateProfileSlice.js';
import recruiterProfileReducer from './recruiterProfileSlice.js';
import jobsBrowseReducer from './JobsBrowseSlice.js';

export const store = configureStore({
  reducer: {
    candidateProfile: candidateProfileReducer,
    recruiterProfile: recruiterProfileReducer,
    jobsBrowse: jobsBrowseReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
