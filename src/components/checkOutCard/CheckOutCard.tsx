import React from 'react';
import {Skeleton, Card, Button, Typography, Table} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {CheckCircleOutlined, HomeOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';

const {Meta} = Card;
const {Title, Text} = Typography;

interface OrderItem {
    key: number;
    item: string;
    amount: string | number | JSX.Element;
}

const columns: ColumnsType<OrderItem> = [
    {
        title: '产品',
        dataIndex: 'item',
        key: 'item'
    },
    {
        title: '价格',
        dataIndex: 'amount',
        width: 150,
        key: 'amount'
    }
];

interface PropsType {
    loading: boolean;
    order: any;
    onCheckout: () => void;
}

const CheckOutCard: React.FC<PropsType> = ({loading, order, onCheckout}) => {
    console.log(order);
    const history = useHistory();
    const paymentData: OrderItem[] = order ?
        (order.orderItems.map((i, index) => ({
            key: index,
            item: i.touristRoute.title,
            amount: (<>
                <Text delete={true}>
                    ￥ {i.originalPrice}
                </Text>
                {' '}
                <Text type='danger' strong={true}>
                    ￥ {i.originalPrice * i.discountPresent}
                </Text>
            </>)
        })))
        : [];
    return (
        <Card
            style={{width: 600, marginTop: 50}}
            actions={[
                order && order.state === 'Completed' ? (
                    <Button
                        type='primary'
                        loading={loading}
                        onClick={() => {
                            history.push('/');
                        }}
                    >
                        <HomeOutlined />
                        回到首页
                    </Button>
                ) : (
                    <Button
                        type='primary'
                        danger={true}
                        loading={loading}
                        onClick={onCheckout}
                    >
                        <CheckCircleOutlined />
                        支付
                    </Button>
                )
            ]}
        >
            <Skeleton loading={loading} active={true}>
                <Meta
                    title={
                        <Title level={2}>
                            {order && order.state === 'Completed' ? '支付成功' : '总计'}
                        </Title>
                    }
                    description={
                        <Table<OrderItem>
                            columns={columns}
                            dataSource={paymentData}
                            showHeader={false}
                            size='small'
                            bordered={false}
                            pagination={false}
                        />
                    }
                />
            </Skeleton>
        </Card>
    );
};

export default CheckOutCard;
