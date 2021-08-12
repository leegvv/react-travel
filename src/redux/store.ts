import languageReducer from './language/languageReducer';
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import sideMenusReducer from './sideMenus/sideMenusReducer';
import {productDetailSlice} from './productDetail/slice';
import {productSearchSlice} from './productSearch/slice';
import {actionLog} from './middlewares/actionLog';
import {configureStore, combineReducers} from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    sideMenuList: sideMenusReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer
});

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
