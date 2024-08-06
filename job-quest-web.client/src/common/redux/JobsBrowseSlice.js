import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchJobsList = createAsyncThunk('jobsBrowse/fetch', async (jobsList, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://localhost:44396/api/jobs', {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
export const jobsBrowseSlice = createSlice({
  name: 'jobsBrowse',
  initialState: {
    jobsList: {
      data: [{}],
      status: 'idle',
      error: null,
    },
  },
  reducers: {
    jobsList: (state, action) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobsList.pending, (state) => {
        state.jobsList.status = 'loading';
      })
      .addCase(fetchJobsList.fulfilled, (state, action) => {
        state.jobsList.status = 'succeeded';
        state.jobsList.data = action.payload;
      })
      .addCase(fetchJobsList.rejected, (state, action) => {
        state.jobsList.status = 'failed';
        state.jobsList.error = action.payload;
      });
  },
});
export const { jobsListReducer } = jobsBrowseSlice.actions;
export default jobsBrowseSlice.reducer;
