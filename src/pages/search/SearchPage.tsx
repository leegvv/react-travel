import React, {useEffect} from 'react';
import styles from './SearchPage.module.less';
import {Header, Footer, FilterArea, ProductList} from '@/components';
import {searchProduct} from '@/redux/productSearch/slice';
import {useParams} from 'react-router-dom';
import {useSelector} from '@/redux/hooks';
import {Spin} from 'antd';
import {useDispatch} from 'react-redux';

interface MatchParams {
    keywords: string;
}

export const SearchPage: React.FC = () => {
    const {keywords} = useParams<MatchParams>();
    const loading = useSelector(state => state.productSearch.loading);
    const error = useSelector(state => state.productSearch.error);
    const productList = useSelector(state => state.productSearch.data);
    const pagination = useSelector(state => state.productSearch.pagination);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchProduct({keywords, page: 1, pageSize: 10}));
    }, [keywords, dispatch]);

    const onPageChange = (page, pageSize) => {
        dispatch(searchProduct({page, pageSize, keywords}));
    }

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
            {/*分类过滤器*/}
            <div className={styles.productListContainer}>
                <FilterArea />
            </div>
            {/*产品列表*/}
            <div className={styles.productListContainer}>
                <ProductList
                    data={productList}
                    pagination={pagination}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
        <Footer/>
    </>
}
