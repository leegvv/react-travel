import {RecommendProductionAction} from './recommendProductsActions';

interface RecommendProductsState {
    productList: any[];
    loading: boolean;
    error: string | null;
}

const defaultState: RecommendProductsState = {
    productList: [],
    loading: true,
    error: null
};

const recommendProductsReducer = (state = defaultState, action: RecommendProductionAction) => {
    switch (action.type) {
        case 'FETCH_RECOMMEND_PRODUCTS_START':
            return {...state, loading: true};
        case 'FETCH_RECOMMEND_PRODUCTS_SUCCESS':
            return {...state, loading: false, productList: action.payload};
        case 'FETCH_RECOMMEND_PRODUCTS_FAIL':
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }

};

export default recommendProductsReducer;
