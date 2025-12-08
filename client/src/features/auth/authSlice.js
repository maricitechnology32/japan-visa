// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import api from '../../utils/api';

// // // Get user from localStorage (if previously saved, optional for persistence)
// // const user = JSON.parse(localStorage.getItem('user'));

// // const initialState = {
// //   user: user ? user : null,
// //   isError: false,
// //   isSuccess: false,
// //   isLoading: false,
// //   message: '',
// // };

// // // Login User Thunk
// // export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
// //   try {
// //     const response = await api.post('/auth/login', userData);
// //     if (response.data) {
// //       localStorage.setItem('user', JSON.stringify(response.data.user));
// //     }
// //     return response.data.user;
// //   } catch (error) {
// //     const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
// //     return thunkAPI.rejectWithValue(message);
// //   }
// // });

// // // Logout User Thunk
// // export const logout = createAsyncThunk('auth/logout', async () => {
// //   await api.get('/auth/logout');
// //   localStorage.removeItem('user');
// // });

// // export const authSlice = createSlice({
// //   name: 'auth',
// //   initialState,
// //   reducers: {
// //     reset: (state) => {
// //       state.isLoading = false;
// //       state.isSuccess = false;
// //       state.isError = false;
// //       state.message = '';
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(login.pending, (state) => {
// //         state.isLoading = true;
// //       })
// //       .addCase(login.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         state.isSuccess = true;
// //         state.user = action.payload;
// //       })
// //       .addCase(login.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.isError = true;
// //         state.message = action.payload;
// //         state.user = null;
// //       })
// //       .addCase(logout.fulfilled, (state) => {
// //         state.user = null;
// //       });
// //   },
// // });

// // export const { reset } = authSlice.actions;
// // export default authSlice.reducer;

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import api from '../../utils/api';

// // Get user from localStorage
// const user = JSON.parse(localStorage.getItem('user'));

// const initialState = {
//   user: user ? user : null,
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: '',
// };

// // Login User
// export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
//   try {
//     const response = await api.post('/auth/login', userData);
    
//     if (response.data) {
//       // SAVE USER INFO
//       localStorage.setItem('user', JSON.stringify(response.data.user));
      
//       // FIX: SAVE TOKEN TO LOCAL STORAGE AS BACKUP
//       // This ensures we have the token even if the cookie fails
//       if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//       }
//     }
    
//     return response.data.user;
//   } catch (error) {
//     const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//     return thunkAPI.rejectWithValue(message);
//   }
// });

// // Logout User
// export const logout = createAsyncThunk('auth/logout', async () => {
//   try {
//     await api.get('/auth/logout');
//   } catch (error) {
//     console.error(error);
//   }
//   // CLEANUP BOTH ITEMS
//   localStorage.removeItem('user');
//   localStorage.removeItem('token');
// });

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     reset: (state) => {
//       state.isLoading = false;
//       state.isSuccess = false;
//       state.isError = false;
//       state.message = '';
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//         state.user = null;
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state.user = null;
//       });
//   },
// });

// export const { reset } = authSlice.actions;
// export default authSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api, { setAuthToken } from '../../utils/api';

// Check BOTH user and token on initial load
const localUser = JSON.parse(localStorage.getItem('user'));
const localToken = localStorage.getItem('token');
   
// If we have a token on load, set it immediately
if (localToken) {
  setAuthToken(localToken);
}

const user = (localUser && localToken) ? localUser : null;

const initialState = {
  user: user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Login User
// Login User
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await api.post('/auth/login', userData);
    
    if (response.data) {
      // 1. Save User Data
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // 2. Save Token (CRITICAL FOR CHROME FIX)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
    }
    
    return response.data.user;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout User
export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await api.get('/auth/logout');
  } catch (error) {
    console.error(error);
  }
  // Clear Everything
  localStorage.removeItem('user');
  localStorage.removeItem('token');
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;