import {createSlice, PayloadAction} from '@reduxjs/toolkit';

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

export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        fetchFail: (state, action: PayloadAction<string | null>) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchComments: (state, action) => {
            state.comments = action.payload;
        }
    }
});
