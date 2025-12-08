import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import consultancyReducer from '../features/consultancies/consultancySlice';
import holidayReducer from '../features/holidays/holidaySlice';
import staffReducer from '../features/staff/staffSlice'; // Import
import studentReducer from '../features/students/studentSlice';
import universityReducer from '../features/universities/universitySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,             // Manages User Login/Register
    consultancies: consultancyReducer, // Manages Super Admin's Consultancy List
    students: studentReducer,      // Manages Consultancy's Student List
    staff: staffReducer, 
    universities: universityReducer,
    holidays: holidayReducer,
  },
});