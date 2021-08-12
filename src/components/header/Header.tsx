import React from 'react';
import styles from './Header.module.less'
import {Button, Dropdown, Input, Layout, Menu, Typography} from 'antd';
import {GlobalOutlined} from '@ant-design/icons';
import logo from '@/assets/logo.svg';
import {useHistory, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {
    addLanguageActionCreator,
    changeLanguageActionCreator
} from '@/redux/language/languageActions';
import {useSelector} from '@/redux/hooks';

interface MatchParams {
    keywords: string;
}

export const Header: React.FC = () => {
    const history = useHistory();
    const {t} = useTranslation();

    const language = useSelector((state) => state.language.language);
    const languageList = useSelector((state) => state.language.languageList);
    // const dispatch = useDispatch<Dispatch<LanguageActionTypes>>();
    const dispatch = useDispatch();
    const {keywords} = useParams<MatchParams>();

    const menuClickHandle = (e) => {
        if (e.key === 'new') {
            dispatch(addLanguageActionCreator('new语言', 'newLanguage'));
        } else {
            dispatch(changeLanguageActionCreator(e.key));
        }
    }

    return (
        <div className={styles.appHeader}>
            <div className={styles.topHeader}>
                <div className={styles.inner}>
                    <Typography.Text>{t('header.slogan')}</Typography.Text>
                    <Dropdown.Button
                        overlay={
                            <Menu onClick={menuClickHandle}>
                                {languageList.map((l) => (
                                    <Menu.Item key={l.code}>
                                        {l.name}
                                    </Menu.Item>
                                ))}
                                <Menu.Item key='new'>{t('header.add_new_language')}</Menu.Item>
                            </Menu>
                        }
                        icon={<GlobalOutlined/>}
                        style={{marginLeft: 15}}
                    >
                        {language === 'zh' ? '中文' : 'English'}
                    </Dropdown.Button>
                    <Button.Group className={styles.buttonGroup}>
                        <Button onClick={() => history.push('signIn')}>{t('header.signin')}</Button>
                        <Button onClick={() => history.push('register')}>{t('header.register')}</Button>
                    </Button.Group>
                </div>
            </div>
            <Layout.Header className={styles.mainHeader}>
                <span onClick={() => history.push('/')}>
                    <img src={logo} alt="logo" className={styles.appLogo}/>
                    <Typography.Title level={3} className={styles.title}>{t('header.title')}</Typography.Title>
                </span>
                <Input.Search
                    placeholder="请输入旅游目的地、主题、或关键字"
                    onSearch={value => history.push(`/search/${value}`)}
                    className={styles.searchInput}
                    defaultValue={keywords}
                />
            </Layout.Header>
            <Menu mode={"horizontal"} className={styles.mainMenu}>
                <Menu.Item key={1}>{t('header.home_page')}</Menu.Item>
                <Menu.Item key={2}>{t('header.weekend')}</Menu.Item>
                <Menu.Item key={3}>{t('header.group')}</Menu.Item>
                <Menu.Item key={4}>{t('header.backpack')}</Menu.Item>
                <Menu.Item key={5}>{t('header.private')}</Menu.Item>
                <Menu.Item key={6}>{t('header.cruise')}</Menu.Item>
                <Menu.Item key={7}>{t('header.hotel')}</Menu.Item>
                <Menu.Item key={8}>{t('header.local')}</Menu.Item>
                <Menu.Item key={9}>{t('header.theme')}</Menu.Item>
                <Menu.Item key={10}>{t('header.custom')}</Menu.Item>
                <Menu.Item key={11}>{t('header.study')}</Menu.Item>
                <Menu.Item key={12}>{t('header.visa')}</Menu.Item>
                <Menu.Item key={13}>{t('header.enterprise')}</Menu.Item>
                <Menu.Item key={14}>{t('header.high_end')}</Menu.Item>
                <Menu.Item key={15}>{t('header.outdoor')}</Menu.Item>
                <Menu.Item key={16}>{t('header.insurance')}</Menu.Item>
            </Menu>
        </div>
    );
};
