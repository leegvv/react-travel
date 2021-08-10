import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductDetailState {
    data: any;
    comments: any;
    loading: boolean;
    error: string | null;
}

const initialState: ProductDetailState = {
    data: [],
    comments: [],
    loading: true,
    error: null
};

export const getProductDetail = createAsyncThunk(
    'productDetail/getProductDetail',
    async (touristRouteId: string) => {
        const {data} = await axios.get(`/api/touristRoutes/${touristRouteId}`)
        return data;
    }
);

export const getComments = createAsyncThunk(
    'productDetail/getComments',
    async () => {
        const {data} = await axios.get(`/api/comments`)
        return data;
    }
)

export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
        fetchComments: (state, action) => {
            state.comments = action.payload;
        }
    },
    extraReducers: {
        [getProductDetail.pending.type]: (state) => {
            state.loading = true;
        },
        [getProductDetail.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getComments.fulfilled.type]: (state, action) => {
            state.comments = action.payload;
        }
    }
});
