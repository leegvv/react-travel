import i18next from "i18next";
import {CHANGE_LANGUAGE, ADD_LANGUAGE, LanguageActionTypes} from "./languageActions";

export interface LanguageState {
    language: 'en' | 'zh',
    languageList: { name: string, code: string }[]
}

const defaultState: LanguageState = {
    language: 'zh',
    languageList: [
        {name: '中文', code: 'zh'},
        {name: 'English', code: 'en'}
    ]
}

const languageReducer = (state = defaultState, action: LanguageActionTypes) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            i18next.changeLanguage(action.payload); //reducer应该是纯函数, 没有副作用，但此处有副作用
            return {...state, language: action.payload};
        case ADD_LANGUAGE:
            return {
                ...state,
                languageList: [...state.languageList, action.payload]
            };
        default:
            return state;
    }
};

export default languageReducer;
