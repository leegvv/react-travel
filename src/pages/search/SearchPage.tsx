import {Spin} from 'antd';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';

import {FilterArea, ProductList} from '@/components';
import {MainLayout} from '@/layouts';
import {useSelector} from '@/redux/hooks';
import {searchProduct} from '@/redux/productSearch/slice';

import styles from './SearchPage.module.less';

interface MatchParams {
    keywords: string;
}

const SearchPage: React.FC = () => {
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
    return <MainLayout>
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
    </MainLayout>
}

export default SearchPage;
