import {Divider, Typography} from 'antd';
import React from 'react';

import {FilterTag} from './FilterTag';

interface PropsType {
    title: string;
    tags: string[];
}

export const Filter: React.FC<PropsType> = ({title, tags}) => {
    return <div>
        <Typography.Text
            style={{marginRight: 40, fontSize: 15, fontWeight: 500}}
        >
            {title} : {' '}
        </Typography.Text>
        {
            tags.map((t, index) => {
                if (index === tags.length - 1) {
                    return <FilterTag key={`tag${index}`}>{t}</FilterTag>;
                }
                return <span key={index}>
                    <FilterTag>{t}</FilterTag>
                    <Divider type='vertical'/>
                </span>
            })
        }
    </div>
}
