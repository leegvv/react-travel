import {actionLog} from './middlewares/actionLog';
import languageReducer from './language/languageReducer';
import {productDetailSlice} from './productDetail/slice';
import {productSearchSlice} from './productSearch/slice';
import {userSlice} from './user/slice';
import {shoppingCartSlice} from './shoppingCart/slice';
import {orderSlice} from './order/slice';
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import sideMenusReducer from './sideMenus/sideMenusReducer';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
};

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    sideMenuList: sideMenusReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    user: userSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
    order: orderSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
    devTools: true
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default {store, persistor};
