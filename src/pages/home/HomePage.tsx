import React from 'react';
import {BusinessPartners, Carousel, Footer, Header, ProductCollection, SideMenu} from '../../components';
import styles from './HomePage.module.less';
import {Col, Row, Typography} from 'antd';
import sideImage from '@/assets/images/sider_2019_02-04.png';
import sideImage2 from '@/assets/images/sider_2019_02-04-2.png';
import sideImage3 from '@/assets/images/sider_2019_12-09.png';
import {useTranslation} from 'react-i18next';

export const HomePage: React.FC = () => {
    const [productList, setProductList] = React.useState({productList1: [], productList2: [], productList3: []});
    React.useEffect(() => {
        fetch('/api/productList')
            .then(res => res.json())
            .then(data => setProductList(data));
    }, []);
    const {productList1 = [], productList2 = [], productList3 = []} = productList;
    const {t} = useTranslation();
    return <>
        <Header/>
        <div className={styles.pageContent}>
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
        </div>
        <Footer/>
    </>
};
