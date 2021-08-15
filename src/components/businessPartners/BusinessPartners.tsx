import {Col, Divider, Image, Row, Typography} from 'antd';
import React from 'react';
import {useTranslation} from "react-i18next";

import image4 from '../../assets/images/facebook-807588_640.png';
import image3 from '../../assets/images/follow-826033_640.png';
import image2 from '../../assets/images/icon-720944_640.png';
import image1 from '../../assets/images/microsoft-80658_640.png';
import styles from './BusinessPartners.module.less';


const companies = [
    { src: image1, title: "Microsoft"},
    { src: image2, title: "Youtube"},
    { src: image3, title: "Ins"},
    { src: image4, title: "Facebook"}
]

const BusinessPartners: React.FC = () => {
    const {t} = useTranslation();
    return <div className={styles.content} >
        <Divider orientation='left'>
            <Typography.Title
                level={3}
            >
                {t('home_page.joint_venture')}
            </Typography.Title>
        </Divider>
        <Row>
            {
                companies.map((company, index) => (
                    <Col span={6} key={`business-partner-${index}`}>
                        <Image src={company.src} width='80%'/>
                    </Col>
                ))
            }
        </Row>
    </div>
}

export default BusinessPartners;
