import {
    FETCH_SIDE_MENU_LIST_FAIL,
    FETCH_SIDE_MENU_LIST_START,
    FETCH_SIDE_MENU_LIST_SUCCESS,
    SideMenuListAction
} from './sideMenusActions';

interface SideMenusState {
    menuList: any[];
    loading: boolean;
    error: string | null
}

const defaultState: SideMenusState = {
    menuList: [],
    loading: true,
    error: null
};

const sideMenusReducer = (state = defaultState, action: SideMenuListAction) => {
    switch (action.type) {
        case FETCH_SIDE_MENU_LIST_START:
            return {...state, loading: true};
        case FETCH_SIDE_MENU_LIST_SUCCESS:
            return {...state, loading: false, menuList: action.payload};
        case FETCH_SIDE_MENU_LIST_FAIL:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
};

export default sideMenusReducer;

