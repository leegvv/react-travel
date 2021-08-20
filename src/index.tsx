import './index.css';
import './i18n/config';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import rootStore from "@/redux/store";
import App from './App';
import reportWebVitals from './reportWebVitals';
import {PersistGate} from 'redux-persist/integration/react';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={rootStore.store}>
            <PersistGate persistor={rootStore.persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
