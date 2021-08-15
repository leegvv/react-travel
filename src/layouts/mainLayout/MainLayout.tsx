import React from 'react';

import {Footer, Header} from '@/components';

import styles from './MainLayout.module.less';

const MainLayout: React.FC = ({children}) => {
    return (
        <>
            <Header/>
            <div className={styles.pageContent}>
                {children}
            </div>
            <Footer/>
        </>
    );
};

export default MainLayout;
