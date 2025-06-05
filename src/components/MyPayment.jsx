
import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import useShopContext from "../hooks/useShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyPayment = () => {
  const stripe = useStripe();
  const elements = useElements();
  
  const { totalPrice, clearBasket } = useShopContext();

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    setIsLoading(true);

    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/payment`, {
            amount: totalPrice
        });
        const result = await stripe.confirmCardPayment(
            res.data.client_secret,
            {
                payment_method: {
                    card: cardElement
                }
            }
        );
        if (result.error){
            setMessage(result.error.message);
        } else if (result.paymentIntent.status === 'succeeded') {
            setMessage('Payment successful! 🎉');
            clearBasket();
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    } catch (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
          } else {
            setMessage("An unexpected error occurred.");
          }
    } finally {
        setIsLoading(false);
    }
  }

  const cardStyleOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1f2937',
        '::placeholder': {
          color: '#9ca3af' 
        },
        fontFamily: 'Inter, sans-serif',
      },
      invalid: {
        color: '#ef4444'
      }
    }
  };
  


  return (
    <form onSubmit={(e) => handleSubmit(e)} className="max-w-md mx-auto space-y-4 p-4">
      <div className="p-4 border rounded shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
        <CardElement options={cardStyleOptions} />
      </div>
  
      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        className={`w-full py-2 px-4 rounded text-white font-semibold transition-all ${
          isLoading || !stripe || !elements
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        <span>
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
          ) : (
            `Pay $${totalPrice}`
          )}
        </span>
      </button>
  
      {message && (
        <div className="text-center text-sm text-red-600 mt-2">
          {message}
        </div>
      )}
    </form>
  );
  
}

export default MyPayment