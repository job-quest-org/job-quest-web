import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRecruiterProfile = createAsyncThunk(
  'recruiterProfile/fetch',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://localhost:44396/api/recruiter/profile', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const submitRecruiterProfile = createAsyncThunk(
  'recruiterProfile/submit',
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://localhost:44396/api/recruiter/profile',
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
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const recruiterProfileSlice = createSlice({
  name: 'recruiterProfile',
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
    recruiterProfileReducer: (state) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecruiterProfile.pending, (state) => {
        state.fetchProfile.status = 'loading';
      })
      .addCase(fetchRecruiterProfile.fulfilled, (state, action) => {
        state.fetchProfile.status = 'succeeded';
        state.fetchProfile.data = action.payload;
      })
      .addCase(fetchRecruiterProfile.rejected, (state, action) => {
        state.fetchProfile.status = 'failed';
        state.fetchProfile.error = action.payload;
      })
      .addCase(submitRecruiterProfile.pending, (state) => {
        state.submitProfile.status = 'loading';
      })
      .addCase(submitRecruiterProfile.fulfilled, (state, action) => {
        state.submitProfile.status = 'succeeded';
        state.submitProfile.data = action.payload;
      })
      .addCase(submitRecruiterProfile.rejected, (state, action) => {
        state.submitProfile.status = 'failed';
        state.submitProfile.error = action.payload;
      });
  },
});
export const { recruiterProfileReducer } = recruiterProfileSlice.actions;
export default recruiterProfileSlice.reducer;
