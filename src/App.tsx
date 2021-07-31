import React from 'react';
import styles from './App.module.less';
import 'antd/dist/antd.less';
import {Header, Footer, SideMenu, Carousel, ProductCollection, BusinessPartners} from './components';
import {Row, Col, Typography} from 'antd';
import sideImage from '@/assets/images/sider_2019_02-04.png';
import sideImage2 from '@/assets/images/sider_2019_02-04-2.png';
import sideImage3 from '@/assets/images/sider_2019_12-09.png';

function App() {
    const [productList, setProductList] = React.useState({productList1: [], productList2: [], productList3: []});
    React.useEffect(() => {
        fetch('/api/productList')
            .then(res => res.json())
            .then(data => setProductList(data));
    }, []);
    const {productList1 = [], productList2 = [], productList3 = []} = productList;
    return (
        <div className={styles.app}>
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
                            爆款推荐
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
                            新品上市
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
                            国内游推荐
                        </Typography.Title>
                    }
                    sideImage={sideImage3}
                    products={productList3}
                />
                <BusinessPartners />
            </div>
            <Footer/>
        </div>
    );
}

export default App;
