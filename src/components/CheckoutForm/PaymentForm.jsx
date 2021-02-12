import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import Review from './Review';

const PaymentForm = ({ checkoutToken }) => {
    return (
        <div>
            <Review checkoutToken={checkoutToken} />
        </div>
    )
}

export default PaymentForm
