import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StripeCheckout from 'react-stripe-checkout';
import './index.css'; 
import config from '../../config.js';
import axios from 'axios';
import BACK_URL from '../../helper';
import auth from '../../firebase.init';
import  {useAuthState } from 'react-firebase-hooks/auth';

const Payment = () => {
  const { plan, price } = useParams();
  const user = useAuthState(auth);
  const email = user[0].email;
  const [PaymentComplete, setPaymentComplete] = useState(false);
  const onToken = (token) => {
    console.log(token);
    setPaymentComplete(true);
    axios.patch(`${BACK_URL}/userUpdates/${email}`, {subscriptionPlan:plan})

    const paymentSuccessful = false;

    if (paymentSuccessful) {
      toast.success('Payment successful!');
    } else {
      toast.error('Payment failed. Please try again.');
    }
  };

  return (
    <div className='payment'>
      <h2 style={{color:"black"}}>Confirm Your Payment</h2>
      {plan ? (
        <div className='selected-plan'>
          <p>You have selected the {plan}</p>
          <p>Amount: ${price} per month</p>
        </div>
      ) : (
        <p>Please select a plan before proceeding with the payment.</p>
      )}
      <StripeCheckout
        name={plan}
        token={onToken}
        currency="usd"
        amount={price * 100}
        stripeKey={config.stripeKey} 
        >
          <button className='stripe-checkout-btn'>Pay Now</button>
          </StripeCheckout>
    </div>
  );
};

export default Payment;

