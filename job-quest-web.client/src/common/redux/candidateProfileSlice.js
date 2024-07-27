import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCandidateProfile = createAsyncThunk(
  'candidateProfile/fetch',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://localhost:44396/api/candidate/profile',
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const submitCandidateProfile = createAsyncThunk(
  'candidateProfile/submit',
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://localhost:44396/api/candidate/profile',
        JSON.stringify(values),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        return response.data;
      } else {
        // Failed
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const candidateProfileSlice = createSlice({
  name: 'candidateProfile',
  initialState: {
    data: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    candidateProfileReducer: (state, action) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidateProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCandidateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCandidateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(submitCandidateProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitCandidateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(submitCandidateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});
export const { candidateProfileReducer } = candidateProfileSlice.actions;
export default candidateProfileSlice.reducer;
