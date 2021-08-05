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
