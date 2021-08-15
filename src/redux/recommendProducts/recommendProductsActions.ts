import {RootState} from '@/redux/store';
import {ThunkAction} from 'redux-thunk';
import axios from 'axios';

/**
 * 正在调用推荐信息api
 */
export const FETCH_RECOMMEND_PRODUCTS_START = 'FETCH_RECOMMEND_PRODUCTS_START';

/**
 * 推荐信息api调用成功
 */
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = 'FETCH_RECOMMEND_PRODUCTS_SUCCESS';

/**
 * 推荐信息api调用失败
 */
export const FETCH_RECOMMEND_PRODUCTS_FAIL = 'FETCH_RECOMMEND_PRODUCTS_FAIL';

interface FetchRecommendProductionsStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START;
}

interface FetchRecommendProductsSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS;
    payload: any;
}

interface FetchRecommendProductsFailAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL;
    payload: any;
}

export type RecommendProductionAction = FetchRecommendProductionsStartAction | FetchRecommendProductsSuccessAction | FetchRecommendProductsFailAction;

export const fetchRecommendProductionsStartActionCreator = (): FetchRecommendProductionsStartAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START
    };
}

export const fetchRecommendProductsSuccessActionCreator = (data): FetchRecommendProductsSuccessAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data
    };
}

export const fetchRecommendProductsFailActionCreator = (error): FetchRecommendProductsFailAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAIL,
        payload: error
    };
}

export const loadRecommendProductsActionCreator = (): ThunkAction<void, RootState, unknown, RecommendProductionAction> => async (dispatch) => {
    dispatch(fetchRecommendProductionsStartActionCreator());
    try {
        const {data} = await axios.get('/api/productList');
        dispatch(fetchRecommendProductsSuccessActionCreator(data));
    } catch (error) {
        dispatch(fetchRecommendProductsFailActionCreator(error.message));
    }
}
