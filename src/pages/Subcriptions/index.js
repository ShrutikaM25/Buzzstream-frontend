	
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './index.css'
import auth from '../../firebase.init';
import  {useAuthState } from 'react-firebase-hooks/auth';


const SubscriptionPlans = () => {
  const user = useAuthState(auth);
  console.log(user[0].email);
  const email = user[0].email;
  const [plan, setPlan] = useState('');
  const [price, setPrice] = useState(0);
  const [details, setDetails] = useState({plan:'', price:0});
  //const details = {plan : plan, price : price};
  const plans = [
    {
      id: 1,
      name: 'Standard Plan',
      price: 19.99 ,
      features: ['5 tweets/day', 'Priority support'],
    },
    {
      id: 2,
      name: 'Premium Plan',
      price: 29.99,
      features: ['10 tweets/day', '24/7 premium support'],
    },
    {
      id: 3,
      name: 'Exclusive Plan',
      price: 49.99,
      features: ['','Exclusive posts', 'Notification of exclusive posts', 'Subscriber-only Spaces'],
    },
    {
      id: 4,
      name: 'Premium Plus Plan',
      price: 69.99 ,
      features: [
        'Exclusive posts',
        'Notification of exclusive posts',
        'Subscriber-only Spaces',
        'Subscriber-only replies',
        'A Subscriber Badge',
        '10 tweets/day',
        'Basic support',
      ],
    },
    {
      id: 5,
      name: 'Ultimate Plan',
      price: 99.99,
      features: [
        'Exclusive posts',
        'Notification of exclusive posts',
        'Subscriber-only Spaces',
        'Subscriber-only replies',
        'A Subscriber Badge',
        'Subscription posts tab',
        'Subscriber messages',
        'Priority support',
        'Unlimited tweets',
        '24/7 premium support',
      ],
    },
  ];

  useEffect(()=>{
    console.log(details)
    },[])

    const updateDet = async() => {
      setDetails({...details, "plan" : plan, "price" : price})
    }
 
  const navigate = useNavigate();
  const handleSubscribe = async (ev) =>{
    ev.preventDefault();
        console.log("ABB", plan, price);
        await updateDet();
        console.log("XYZ", details);
        navigate(`/payment/${plan}/${price}`);
  }
  return (
    <>
    {/* <div>
      <h2>Subscription Plans</h2>
    </div> */}

      <div className="container">
      {plans.map((plan) => (
        <form key={plan.id} className="planCard" onSubmit={handleSubscribe}>
          <h2>{plan.name}</h2>
          <p>${plan.price} per month</p>
          <ul>
            {plan.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <button className="subscribeButton" onClick={()=>{setPlan(plan.name); setPrice(plan.price)}}>Subscribe</button>
        </form>
      ))}
    </div>
    </>
    
  );
};

export default SubscriptionPlans;
