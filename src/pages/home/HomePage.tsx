import {MainLayout} from '@/layouts';
import React from 'react';
import {loadRecommendProductsActionCreator} from '@/redux/recommendProducts/recommendProductsActions';
import sideImage from '@/assets/images/sider_2019_02-04.png';
import sideImage2 from '@/assets/images/sider_2019_02-04-2.png';
import sideImage3 from '@/assets/images/sider_2019_12-09.png';
import {useDispatch} from 'react-redux';
import {useSelector} from '@/redux/hooks';
import {useTranslation} from 'react-i18next';
import {Col, Row, Spin, Typography} from 'antd';

import {BusinessPartners, Carousel, ProductCollection, SideMenu} from '../../components';

const HomePage: React.FC = () => {
    const productList = useSelector(state => state.recommendProducts.productList);
    const loading = useSelector(state => state.recommendProducts.loading);
    const error = useSelector(state => state.recommendProducts.error);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(loadRecommendProductsActionCreator());
    }, [dispatch]);
    const {productList1 = [], productList2 = [], productList3 = []} = productList;
    const {t} = useTranslation();
    if (loading) {
        return <Spin
            size='large'
            style={{marginTop: 200, marginBottom: 200, marginLeft:'auto', marginRight: 'auto', width: '100%'}}
        />
    }
    if (error) {
        return <div>
            网站出错： {error}
        </div>
    }
    return <MainLayout>
        <Row style={{marginTop: 20}}>
            <Col span={6}>
                <SideMenu />
            </Col>
            <Col span={18}>
                <Carousel />
            </Col>
        </Row>
        <ProductCollection
            title={
                <Typography.Title
                    level={3}
                    type='warning'
                >
                    {t('home_page.hot_recommended')}
                </Typography.Title>
            }
            sideImage={sideImage}
            products={productList1}
        />
        <ProductCollection
            title={
                <Typography.Title
                    level={3}
                    type='danger'
                >
                    {t('home_page.new_arrival')}
                </Typography.Title>
            }
            sideImage={sideImage2}
            products={productList2}
        />
        <ProductCollection
            title={
                <Typography.Title
                    level={3}
                    type='success'
                >
                    {t('home_page.domestic_travel')}
                </Typography.Title>
            }
            sideImage={sideImage3}
            products={productList3}
        />
        <BusinessPartners />
    </MainLayout>
};

export default HomePage;

