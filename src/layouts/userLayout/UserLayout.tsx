import React from 'react';
import {Layout, Menu, Dropdown, Button} from 'antd';
import {CaretDownOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import logo from '@/assets/logo.svg';
import styles from './UserLayout.module.less';

const {Header, Footer, Content} = Layout;

const UserLayout = (props) => {
    const menu = (
        <Menu>
            <Menu.Item>中文</Menu.Item>
            <Menu.Item>English</Menu.Item>
        </Menu>
    );

    return (
        <Layout className={styles.userLayoutContainer}>
            <Header className={styles.header}>
                <div className={styles.lang}>
                    <Dropdown overlay={menu}>
                        <Button>
                            {" "}
                            选择语言 <CaretDownOutlined />
                        </Button>
                    </Dropdown>
                </div>
            </Header>
            <Content className={styles.content}>
                <div className={styles.top}>
                    <div className={styles.contentHeader}>
                        <Link to='/'>
                            <img alt={logo} src={logo} className={styles.logo}/>
                            <span className={styles.title}>React 旅游网</span>
                        </Link>
                    </div>
                    {props.children}
                </div>
            </Content>

            <Footer style={{textAlign: 'center'}}>@XXX 版权所有</Footer>
        </Layout>
    );
};

export default UserLayout;
