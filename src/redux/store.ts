import {createStore, applyMiddleware} from 'redux';
import languageReducer from './language/languageReducer';
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import sideMenusReducer from './sideMenus/sideMenusReducer';
import {productDetailSlice} from './productDetail/slice';
import thunk from 'redux-thunk';
import {actionLog} from './middlewares/actionLog';
import {combineReducers} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    sideMenuList: sideMenusReducer,
    productDetail: productDetailSlice.reducer
});

const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));

export type RootState = ReturnType<typeof store.getState>;

export default store;
