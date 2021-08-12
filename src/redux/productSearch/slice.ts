import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductSearchState {
    data: any;
    pagination: any;
    loading: boolean;
    error: string | null;
}

const initialState: ProductSearchState = {
    data: null,
    pagination: undefined,
    loading: true,
    error: null
};

export const searchProduct = createAsyncThunk(
    'productSearch/searchProduct',
    async (params: {keywords: string | null, page: number, pageSize: number}) => {
        const {data} = await axios.get('/api/search', {params});
        return data;
    }
)


export const productSearchSlice = createSlice({
    name: 'productSearch',
    initialState,
    reducers: {},
    extraReducers: {
        [searchProduct.pending.type]: (state) => {
            state.loading = true;
        },
        [searchProduct.fulfilled.type]: (state, action) => {
            state.data = action.payload.data;
            state.pagination = action.payload.pagination;
            state.loading = false;
            state.error = null;
        },
        [searchProduct.rejected.type]: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});
