import {Divider} from 'antd';
import React from 'react';

import {Filter} from './Filter';
import styles from './FilterArea.module.less';

const FilterArea: React.FC = () => {
    return <>
        <Filter
            title='线路评价'
            tags={['1星', '2星', '3星', '4星', '5星']}
        />
        <Divider dashed={true} className={styles.filterDivider}/>
        <Filter
            title='出发城市'
            tags={['北京', '上海', '广州', '深圳']}
        />
        <Divider dashed={true} className={styles.filterDivider}/>
        <Filter
            title='行程天数'
            tags={['2日', '3日', '4日', '5日', '6日']}
        />
        <Divider dashed={true} className={styles.filterDivider}/>
        <Filter
            title='旅程类型'
            tags={['跟团游', '自由行', '自驾游', '高端定制']}
        />
        <Divider dashed={true} className={styles.filterDivider}/>
        <Filter
            title='出发时间'
            tags={['春节', '清明', '劳动节']}
        />
    </>
}

export default FilterArea;
