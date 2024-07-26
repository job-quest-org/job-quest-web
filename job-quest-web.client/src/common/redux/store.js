import { configureStore } from '@reduxjs/toolkit';
import candidateProfileReducer, { fetchCandidateProfile, submitCandidateProfile } from './candidateProfileSlice.js';

export const store = configureStore({
  reducer: {
    candidateProfile: candidateProfileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),
});
