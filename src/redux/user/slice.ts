import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
    loading: boolean;
    error: string | null;
    token: string | null;
}

const initialState: UserState = {
    loading: false,
    error: null,
    token: null
};

export const signIn = createAsyncThunk(
    'user/signIn',
    async (paramters: {account: string, password: string}) => {
        const {data} = await axios.post('/api/signIn', {account: paramters.account, password: paramters.password});
        return data.token;
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        logout: (state) => {
            state.token = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: {
        [signIn.pending.type]: (state) => {
            state.loading = true;
        },
        [signIn.fulfilled.type]: (state, action) => {
            console.log(action);
            state.token = action.payload;
            state.loading = false;
            state.error = null;
        },
        [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})



