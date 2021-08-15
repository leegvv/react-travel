import axios from 'axios';
import {RootState} from '@/redux/store';
import {ThunkAction} from 'redux-thunk';

/**
 * 正在调用获取菜单栏api
 */
export const FETCH_SIDE_MENU_LIST_START = 'FETCH_SIDE_MENU_LIST_START';

/**
 * 调用获取菜单栏api成功
 */
export const FETCH_SIDE_MENU_LIST_SUCCESS = 'FETCH_SIDE_MENU_LIST_SUCCESS';

/**
 * 调用获取菜单栏api失败
 */
export const FETCH_SIDE_MENU_LIST_FAIL = 'FETCH_SIDE_MENU_LIST_FAIL';

interface FetchSideMenuListStartAction {
    type: typeof FETCH_SIDE_MENU_LIST_START;
}

interface FetchSideMenuListSuccessAction {
    type: typeof FETCH_SIDE_MENU_LIST_SUCCESS;
    payload: any
}

interface FetchSideMenuListFailAction {
    type: typeof FETCH_SIDE_MENU_LIST_FAIL;
    payload: any
}

export type SideMenuListAction = FetchSideMenuListStartAction | FetchSideMenuListSuccessAction | FetchSideMenuListFailAction;

export const fetchSideMenuListStartActionCreator = (): FetchSideMenuListStartAction => {
    return {
        type: FETCH_SIDE_MENU_LIST_START
    };
}

export const fetchSideMenuListSuccessActionCreator = (data): FetchSideMenuListSuccessAction => {
    return {
        type: FETCH_SIDE_MENU_LIST_SUCCESS,
        payload: data
    }
}

export const fetchSideMenuListFailActionCreator = (msg): FetchSideMenuListFailAction => {
    return {
        type: FETCH_SIDE_MENU_LIST_FAIL,
        payload: msg
    };
}

export const loadSideMenuListActionCreator = (): ThunkAction<void, RootState, unknown, SideMenuListAction> => async (dispatch) => {
    dispatch(fetchSideMenuListStartActionCreator());
    try {
        const {data} = await axios.get('/api/sideMenuList');
        dispatch(fetchSideMenuListSuccessActionCreator(data));
    } catch (e) {
        dispatch(fetchSideMenuListFailActionCreator(e.message));
    }
}
