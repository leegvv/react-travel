import {Tag} from 'antd';
import React, {useState} from 'react';

interface PropsType {
    onSelect?: () => void;
}

export const FilterTag: React.FC<PropsType> = (props) => {
    const [checked, setChecked] = useState(false);
    const handleChange = (checked) => {
        setChecked(checked);
    }
    return<Tag.CheckableTag {...props} checked={checked} onChange={handleChange} />
}
