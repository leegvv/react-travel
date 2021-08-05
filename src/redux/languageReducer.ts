import i18next from "i18next";

export interface LanguageState {
    language: 'en' | 'zh',
    languageList: {name: string, code: 'en' | 'zh'}[]
}

const defaultLanguageStore: LanguageState = {
    language: 'zh',
    languageList: [
        {name: '中文', code: 'zh'},
        {name: 'English', code : 'en'}
    ]
}

const languageReducer = (state = defaultLanguageStore, action) => {
    switch (action.type) {
        case 'change_language':
            i18next.changeLanguage(action.payload); //reducer应该是纯函数, 没有副作用，但此处有副作用
            const item = state.languageList.find(it => it.code === action.payload);
            if (item) {
                return {...state, language: item.code};
            }
            break;
        case 'add_language':
            return {
                ...state,
                languageList: [...state.languageList, action.payload]
            };
    }
    return state;
};

export default languageReducer;
