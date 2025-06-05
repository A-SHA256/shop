import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import MyPayment from '../components/MyPayment';

const stripePromise = loadStripe(import.meta.env.VITE_PUBLIC_KEY);

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <MyPayment />
        </Elements>
    );
};

export default Payment;

