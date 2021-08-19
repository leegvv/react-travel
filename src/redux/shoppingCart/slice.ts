import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface ShoppingCartState {
    loading: boolean;
    error: string | null;
    items: any[];
}

const initialState: ShoppingCartState = {
    loading: false,
    error: null,
    items: []
};

export const getShoppingCart = createAsyncThunk(
    'shoppingCart/getShoppingCart',
async (jwt: string) => {
        const {data} = await axios.get(
            '/api/shoppingCart/getShoppingCart',
            {
                headers: {
                    Authorization: `bearer ${jwt}`
                }
            }
        );
        return data.shoppingCartItems;
    }
);

export const addShoppingCartItem = createAsyncThunk(
    'shoppingCart/addShoppingCartItem',
    async (paramters: {jwt: string, touristRouteId: string}) => {
        const {data} = await axios.post(
            '/api/shoppingCart/addShoppingCartItem',
            {
                touristRouteId: paramters.touristRouteId
            },
            {
                headers: {
                    Authorization: `bearer ${paramters.jwt}`
                }
            }
        );
        return data.shoppingCartItems;
    }
)

export const clearShoppingCartItem = createAsyncThunk(
    'shoppingCart/clearShoppingCartItem',
    async (paramters: {jwt: string, itemIds: number[]}) => {
        return await axios.delete(
            '/api/shoppingCart/clearShoppingCartItem',
            {
                headers: {
                    Authorization: `bearer ${paramters.jwt}`
                }
            }
        );
    }
)

export const checkOut = createAsyncThunk(
    'shoppingCart/checkOut',
    async (jwt: string) => {
        const {data} = await axios.post(
            '/api/shoppingCart/checkOut',
            null,
            {
                headers: {
                    Authorization: `bearer ${jwt}`
                }
            }
        )
        return data;
    }
)

export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {},
    extraReducers: {
        [getShoppingCart.pending.type]: (state) => {
            state.loading = true;
        },
        [getShoppingCart.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.items = action.payload;
            state.error = null;
        },
        [getShoppingCart.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error= action.payload;
        },
        [addShoppingCartItem.pending.type]: (state) => {
            state.loading = true;
        },
        [addShoppingCartItem.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.items = action.payload;
            state.error = null;
        },
        [addShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
        [clearShoppingCartItem.pending.type]: (state) => {
            state.loading = true;
        },
        [clearShoppingCartItem.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.items = action.payload;
            state.error = null;
        },
        [clearShoppingCartItem.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
        [checkOut.pending.type]: (state) => {
            state.loading = true;
        },
        [checkOut.fulfilled.type]: (state) => {
            state.items = [];
            state.loading = false;
            state.error = null;
        },
        [checkOut.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})
