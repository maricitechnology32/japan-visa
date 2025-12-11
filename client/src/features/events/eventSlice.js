// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios'; // Direct axios for external API
// import api from '../../utils/api'; // Your internal API

// const initialState = {
//     dbEvents: [], // Events from your database (Exams, etc.)
//     publicHolidays: [], // Events from Public API
//     isLoading: false,
//     isError: false,
//     isSuccess: false,
//     message: ''
// };

// // 1. Get Database Events (Your SaaS Events)
// export const getEvents = createAsyncThunk('events/getAll', async (_, thunkAPI) => {
//     try {
//         const response = await api.get('/events');
//         return response.data.data;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response.data.message);
//     }
// });

// // 2. NEW: Fetch Public Holidays (Automatic from API)
// export const fetchPublicHolidays = createAsyncThunk('events/getHolidays', async (_, thunkAPI) => {
//     try {
//         const year = new Date().getFullYear();
//         // Using Nager.Date API for Nepal (NP)
//         const response = await axios.get(`https://date.nager.at/api/v3/publicholidays/${year}/NP`);
        
//         // Format them to match our Event structure
//         const holidays = response.data.map(h => ({
//             _id: `holiday-${h.date}`, // Unique fake ID
//             title: `🌴 ${h.localName} (${h.name})`, // Add emoji to distinguish
//             start: h.date, // ISO String
//             end: h.date,
//             type: 'holiday',
//             isPublic: true // Flag to prevent editing
//         }));
//         return holidays;
//     } catch (error) {
//         console.error("Holiday API Error:", error);
//         return []; // Return empty array on fail (don't break the app)
//     }
// });

// // 3. Create Event
// export const createEvent = createAsyncThunk('events/create', async (eventData, thunkAPI) => {
//     try {
//         const response = await api.post('/events', eventData);
//         return response.data.data;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response.data.message);
//     }
// });

// // 4. Delete Event
// export const deleteEvent = createAsyncThunk('events/delete', async (id, thunkAPI) => {
//     try {
//         await api.delete(`/events/${id}`);
//         return id;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response.data.message);
//     }
// });

// export const eventSlice = createSlice({
//     name: 'events',
//     initialState,
//     reducers: {
//         reset: (state) => {
//             state.isLoading = false;
//             state.isError = false;
//             state.isSuccess = false;
//             state.message = '';
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             // DB Events
//             .addCase(getEvents.pending, (state) => { state.isLoading = true; })
//             .addCase(getEvents.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.dbEvents = action.payload;
//             })
//             // Public Holidays
//             .addCase(fetchPublicHolidays.fulfilled, (state, action) => {
//                 state.publicHolidays = action.payload;
//             })
//             // Create
//             .addCase(createEvent.fulfilled, (state, action) => {
//                 state.isSuccess = true;
//                 state.dbEvents.push(action.payload);
//             })
//             // Delete
//             .addCase(deleteEvent.fulfilled, (state, action) => {
//                 state.dbEvents = state.dbEvents.filter(e => e._id !== action.payload);
//                 state.isSuccess = true;
//                 state.message = 'Event deleted';
//             });
//     }
// });

// export const { reset } = eventSlice.actions;
// export default eventSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../utils/api';

const initialState = {
    dbEvents: [],
    publicHolidays: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};

// 1. Get Database Events
export const getEvents = createAsyncThunk('events/getAll', async (_, thunkAPI) => {
    try {
        const response = await api.get('/events');
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch events');
    }
});

// 2. Fetch Public Holidays (With Validation & Fallback)
export const fetchPublicHolidays = createAsyncThunk('events/getHolidays', async (_, thunkAPI) => {
    const year = new Date().getFullYear();
    
    try {
        // Attempt to fetch from Nager.Date API
        const response = await axios.get(`https://date.nager.at/api/v3/publicholidays/${year}/NP`);
        
        // CHECK: Ensure data is actually an array before mapping
        if (Array.isArray(response.data)) {
            return response.data.map(h => ({
                _id: `holiday-${h.date}`,
                title: `🌴 ${h.localName || h.name}`,
                start: h.date,
                end: h.date,
                type: 'holiday',
                isPublic: true
            }));
        } else {
            throw new Error("Invalid API response format");
        }

    } catch (error) {
        console.warn("Public Holiday API failed, loading fallback data.", error.message);
        
        // FALLBACK: Major fixed Nepal Holidays (Adjust dates as needed for 2025/2082)
        // Note: Lunar holidays like Dashain/Tihar vary by year. These are approximations or fixed ones.
        return [
            { _id: 'h1', title: '🌴 Nepali New Year', start: `${year}-04-14`, end: `${year}-04-14`, type: 'holiday', isPublic: true },
            { _id: 'h2', title: '🌴 Republic Day', start: `${year}-05-28`, end: `${year}-05-28`, type: 'holiday', isPublic: true },
            { _id: 'h3', title: '🌴 Constitution Day', start: `${year}-09-19`, end: `${year}-09-19`, type: 'holiday', isPublic: true },
            { _id: 'h4', title: '🌴 Martyrs Day', start: `${year}-01-30`, end: `${year}-01-30`, type: 'holiday', isPublic: true },
            { _id: 'h5', title: '🌴 Democracy Day', start: `${year}-02-19`, end: `${year}-02-19`, type: 'holiday', isPublic: true },
            { _id: 'h6', title: '🌴 International Women\'s Day', start: `${year}-03-08`, end: `${year}-03-08`, type: 'holiday', isPublic: true },
            { _id: 'h7', title: '🌴 Labour Day', start: `${year}-05-01`, end: `${year}-05-01`, type: 'holiday', isPublic: true },
        ];
    }
});

// 3. Create Event
export const createEvent = createAsyncThunk('events/create', async (eventData, thunkAPI) => {
    try {
        const response = await api.post('/events', eventData);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create event');
    }
});

// 4. Delete Event
export const deleteEvent = createAsyncThunk('events/delete', async (id, thunkAPI) => {
    try {
        await api.delete(`/events/${id}`);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete event');
    }
});

export const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEvents.pending, (state) => { state.isLoading = true; })
            .addCase(getEvents.fulfilled, (state, action) => {
                state.isLoading = false;
                state.dbEvents = action.payload;
            })
            .addCase(getEvents.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // Public Holidays (Always fulfilled because we catch errors inside)
            .addCase(fetchPublicHolidays.fulfilled, (state, action) => {
                state.publicHolidays = action.payload;
            })
            .addCase(createEvent.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.dbEvents.push(action.payload);
            })
            .addCase(deleteEvent.fulfilled, (state, action) => {
                state.dbEvents = state.dbEvents.filter(e => e._id !== action.payload);
                state.isSuccess = true;
                state.message = 'Event deleted';
            });
    }
});

export const { reset } = eventSlice.actions;
export default eventSlice.reducer;