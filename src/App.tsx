import React, {useEffect} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import styles from './App.module.less';
import {DetailPage, HomePage, RegisterPage, SearchPage, SignInPage, ShoppingCartPage} from './pages';
import {useSelector} from '@/redux/hooks';
import {useDispatch} from 'react-redux';
import {getShoppingCart} from '@/redux/shoppingCart/slice';

const PrivateRoute = ({component, isAuthenticated, ...rest}) => {
    const routeComponent = (props) => {
        return isAuthenticated ? (
            React.createElement(component, props)
        ) : (
            <Redirect to={{pathname: '/signIn'}} />
        );
    }
    return <Route render={routeComponent} {...rest} />
}

const App: React.FC = () => {

    const jwt = useSelector(state => state.user.token);
    const dispatch = useDispatch();

    useEffect(() => {
        if (jwt) {
            dispatch(getShoppingCart(jwt))
        }
    }, [jwt, dispatch]);

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
                    <PrivateRoute
                        isAuthenticated={jwt !== null}
                        path='/shoppingCart'
                        component={ShoppingCartPage}
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
