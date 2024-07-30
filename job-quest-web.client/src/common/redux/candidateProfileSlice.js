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
      
      if (response.status === 200 ) {
        console.log(response.data);
        return response.data;
      } else {
        console.log(response.data);
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
    fetchProfile: {
      data: {},
      status: 'idle',
      error: null,
    },
    submitProfile: {
      data: {},
      status: 'idle',
      error: null,
    },
  },
  reducers: {
    candidateProfileReducer: (state) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidateProfile.pending, (state) => {
        state.fetchProfile.status = 'loading';
      })
      .addCase(fetchCandidateProfile.fulfilled, (state, action) => {
        state.fetchProfile.status = 'succeeded';
        state.fetchProfile.data = action.payload;
        console.log('ass',action.payload);
      })
      .addCase(fetchCandidateProfile.rejected, (state, action) => {
        state.fetchProfile.status = 'failed';
        state.fetchProfile.error = action.payload;
      })
      .addCase(submitCandidateProfile.pending, (state) => {
        state.submitProfile.status = 'loading';
      })
      .addCase(submitCandidateProfile.fulfilled, (state, action) => {
        state.submitProfile.status = 'succeeded';
        state.submitProfile.data = action.payload;
      })
      .addCase(submitCandidateProfile.rejected, (state, action) => {
        state.submitProfile.status = 'failed';
        state.submitProfile.error = action.payload;
      });
  },
});
export const { candidateProfileReducer } = candidateProfileSlice.actions;
export default candidateProfileSlice.reducer;
