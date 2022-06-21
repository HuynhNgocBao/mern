import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('/auth/login', async(_,thunkAPI)=>{
    await axios.post('/api/auth/login', {email: "a@", password: "1234"});
    const response = await axios.get('/api/users').catch(thunkAPI.rejectWithValue);
    console.log(response)
    return response.data;
})

export const authSlice = createSlice({
    name: "auth",
    initialState:{
        user: 1,
        isLoading: false,
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(login.pending, (state,action)=>{
            state.isLoading = true;
        })
        builder.addCase(login.fulfilled, (state,action)=>{
            state.user = action.payload;
            state.isLoading = false;
        })
        builder.addCase(login.rejected, (state,action)=>{
            state.isLoading = true;
        })
    }
})

export default authSlice.reducer;