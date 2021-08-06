import React from 'react';
import styles from './SideMenu.module.less';
import {Menu} from 'antd';
import {GifOutlined} from '@ant-design/icons';

export const SideMenu: React.FC = (props) => {
    const [sideMenuList, setSideMenuList] = React.useState([]);
    React.useEffect(() => {
        fetch('/api/sideMenuList')
            .then((res) => res.json())
            .then((data) => {
                setSideMenuList(data);
            });
    }, []);
    return (
        <Menu
            mode={'vertical'}
            className={styles.sideMenu}
        >
            {
                sideMenuList.map((menu: any, index) => (
                    <Menu.SubMenu
                        key={`${index}`}
                        title={
                            <span>
                                <GifOutlined />
                                {menu.title}
                            </span>
                        }
                    >
                        {
                            menu.subMenu.map((sm, smIndex) => (
                               <Menu.SubMenu
                                   key={`${index}-${smIndex}`}
                                   title={
                                       <span>
                                           <GifOutlined />
                                           {sm.title}
                                       </span>
                                   }
                               >
                                   {
                                       sm.subMenu.map((sms, smsIndex) => (
                                           <Menu.Item
                                               key={`${index}-${smIndex}-${smsIndex}`}
                                           >
                                               <span>
                                                   <GifOutlined />
                                                   {sms}
                                               </span>
                                           </Menu.Item>
                                       ))
                                   }
                               </Menu.SubMenu>
                            ))
                        }
                    </Menu.SubMenu>)
                )
            }
        </Menu>
    );
};
