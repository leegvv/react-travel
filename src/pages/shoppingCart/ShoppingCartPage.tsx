import React from 'react';
import {MainLayout} from '@/layouts';
import {Affix, Col, Row} from 'antd';
import {ProductList, PaymentCard} from '@/components';
import {useSelector} from '@/redux/hooks';
import {useDispatch} from 'react-redux';
import {clearShoppingCartItem, checkOut} from '@/redux/shoppingCart/slice';
import styles from './ShoppingCart.module.less';
import {useHistory} from 'react-router-dom';

const ShoppingCartPage = () => {
    const shoppingCartItems = useSelector(state => state.shoppingCart.items);
    const loading = useSelector(state => state.shoppingCart.loading);
    const jwt = useSelector(state => state.user.token) as string;
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <MainLayout>
            <Row>
                {/*购物车清单*/}
                <Col span={16}>
                    <div className={styles.productListContainer}>
                        <ProductList data={shoppingCartItems.map(s => s.touristRoute)} />
                    </div>
                </Col>
                {/*支付卡组件*/}
                <Col span={8}>
                    <Affix>
                        <div className={styles.paymentCardContainer}>
                            <PaymentCard
                                loading={loading}
                                originalPrice={
                                    shoppingCartItems.map(s => s.originalPrice).reduce((a, b) => a + b, 0)
                                }
                                price={shoppingCartItems
                                    .map(s => s.originalPrice * (s.discountPresent ? s.discountPresent : 1))
                                    .reduce((a, b) => a + b, 0)
                                }
                                onCheckout={() => {
                                    if (shoppingCartItems.length <= 0) {
                                        return;
                                    }
                                    dispatch(checkOut(jwt));
                                    history.push('/placeOrder');
                                }}
                                onShoppingCartClear={() => {
                                    dispatch(clearShoppingCartItem({jwt, itemIds: shoppingCartItems.map(s => s.id)}))
                                }}
                            />
                        </div>
                    </Affix>
                </Col>
            </Row>
        </MainLayout>
    );
};

export default ShoppingCartPage;
