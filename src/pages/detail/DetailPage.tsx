import React, {useEffect} from 'react';
import {RouteComponentProps, useParams} from 'react-router-dom';
import {Spin, Col, Row, DatePicker, Divider, Typography, Menu, Anchor} from 'antd';
import styles from './DetailPage.module.less';
import {Header, Footer, ProductIntro, ProductComments} from '@/components';
import {useDispatch} from 'react-redux';
import {getProductDetail, getComments} from '@/redux/productDetail/slice';
import {useSelector} from '@/redux/hooks';

interface MatchParams {
    touristRouteId: string;
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (props) => {
    const {touristRouteId} = useParams<MatchParams>();
    const product = useSelector(state => state.productDetail.data);
    const comments = useSelector(state => state.productDetail.comments);
    const loading = useSelector(state => state.productDetail.loading);
    const error = useSelector(state => state.productDetail.error);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProductDetail(touristRouteId));
    }, [touristRouteId, dispatch]);

    useEffect(() => {
        dispatch(getComments())
    }, [dispatch]);

    if (loading) {
        return <Spin
            size='large'
            style={{
                marginTop: 200,
                marginBottom: 200,
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '100%'
            }}
        />
    }
    if (error) {
        return <div>网站出错：{error}</div>
    }

    return <>
        <Header/>
        <div className={styles.pageContent}>
            {/*产品简介与日期选择*/}
            <div className={styles.productIntroContainer}>
                <Row>
                    <Col span={13}>
                        <ProductIntro
                            title={product.title}
                            shortDescription={product.description}
                            price={product.originalPrice}
                            coupons={product.coupons}
                            points={product.points}
                            discount={product.price}
                            rating={product.rating}
                            pictures={product.touristRoutePictures.map(p => p.url)}
                        />
                    </Col>
                    <Col span={11}>
                        <DatePicker.RangePicker open={true} style={{marginTop: 20}}/>
                    </Col>
                </Row>
            </div>
            {/*锚点菜单*/}
            <Anchor className={styles.productDetailAnchor}>
                <Menu mode='horizontal'>
                    <Menu.Item key={1}>
                        <Anchor.Link href='#feature' title='产品特色'/>
                    </Menu.Item>
                    <Menu.Item key={2}>
                        <Anchor.Link href='#fees' title='费用'/>
                    </Menu.Item>
                    <Menu.Item key={3}>
                        <Anchor.Link href='#notes' title='预订须知'/>
                    </Menu.Item>
                    <Menu.Item key={4}>
                        <Anchor.Link href='#comments' title='用户评价'/>
                    </Menu.Item>
                </Menu>
            </Anchor>
            {/*产品特色*/}
            <div id='feature' className={styles.productDetailContainer}>
                <Divider orientation='center'>
                    <Typography.Title level={3}>产品特色</Typography.Title>
                </Divider>
                <div
                    dangerouslySetInnerHTML={{__html: product.features}}
                    style={{ margin: 50 }}
                />
            </div>
            {/*费用*/}
            <div id='fees' className={styles.productDetailContainer}>
                <Divider orientation='center'>
                    <Typography.Title level={3}>费用</Typography.Title>
                </Divider>
                <div
                    dangerouslySetInnerHTML={{__html: product.fees}}
                    style={{ margin: 50 }}
                />
            </div>
            {/*预订须知*/}
            <div id='notes' className={styles.productDetailContainer}>
                <Divider orientation='center'>
                    <Typography.Title level={3}>预订须知</Typography.Title>
                </Divider>
                <div
                    dangerouslySetInnerHTML={{__html: product.notes}}
                    style={{ margin: 50 }}
                />
            </div>
            {/*产品评价*/}
            <div id='comments' className={styles.productDetailContainer}>
                <Divider orientation='center'>
                    <Typography.Title level={3}>用户评价</Typography.Title>
                </Divider>
                <div style={{margin: 40}}>
                    <ProductComments data={comments} />
                </div>
            </div>
        </div>
        <Footer/>
    </>
};
