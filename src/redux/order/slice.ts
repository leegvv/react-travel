import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {checkOut} from '../shoppingCart/slice';

interface OrderState {
    loading: boolean;
    error: string | null;
    currentOrder: any;
}

const initialState: OrderState = {
    loading: false,
    error: null,
    currentOrder: null
};

export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async (parameters: {jwt: string, orderId: string}) => {
        const {data} = await axios.post(
            `/api/orders/${parameters.orderId}/placeOrder`,
            null,
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`
                }
            }
        );
        return data;
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: {
        [placeOrder.pending.type]: (state) => {
            state.loading = true;
        },
        [placeOrder.fulfilled.type]: (state, action) => {
            state.currentOrder = action.payload;
            state.loading = false;
            state.error = null;
        },
        [placeOrder.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
        [checkOut.pending.type]: (state) => {
            state.loading = true;
        },
        [checkOut.fulfilled.type]: (state, action) => {
            state.currentOrder = action.payload;
            state.loading = false;
            state.error = null;
        },
        [checkOut.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})
