import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import styles from './App.module.less';
import {DetailPage, HomePage, RegisterPage, SearchPage, SignInPage} from './pages';

const App: React.FC = () => {
    return (
        <div className={styles.app}>
            <BrowserRouter>
                <Switch>
                    <Route
                        path='/'
                        component={HomePage}
                        exact={true}
                    />
                    <Route
                        path='/signIn'
                        component={SignInPage}
                    />
                    <Route
                        path='/register'
                        component={RegisterPage}
                    />
                    <Route
                        path='/detail/:touristRouteId'
                        component={DetailPage}
                    />
                    <Route
                        path='/search/:keywords?'
                        component={SearchPage}
                    />
                    <Route
                        render={() => <h1>404 not found 页面去火星了</h1>}
                    />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
