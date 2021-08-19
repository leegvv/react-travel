import React, {useState} from 'react';
import styles from './PaymentForm.module.less';
import Cards from 'react-credit-cards';
import {Form, Input} from 'antd';
import "react-credit-cards/es/styles-compiled.css";

interface CardState{
    cvc: string;
    expiry: string;
    focused: string;
    name: string;
    number: string;
}

const PaymentForm = () => {
    const [card, setCard] = useState<CardState>({cvc: "", expiry: "", focused: "", name: "", number: ""});
    const handleInputFocus = (e) => {
        console.log(e.target.name);
        setCard({...card, focused: e.target.name});
    };
    const handleInputChange = (e) => {
        console.log(e.target);
        const {name, value} = e.target;
        setCard({...card, [name]: value});
    }
    return (
        <div style={{marginTop: 50}}>
            <Cards
                cvc={card.cvc}
                expiry={card.expiry}
                focused={card.focused}
                name={card.name}
                number={card.number}
            />
            <Form className={styles.paymentForm}>
                <Input
                    type='tel'
                    name='number'
                    placeholder='Card Number'
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
            </Form>
        </div>
    );
};

export default PaymentForm;
