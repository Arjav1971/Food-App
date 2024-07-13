import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { FaPaypal } from "react-icons/fa";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {useNavigate} from "react-router-dom"
const CheckoutForm = ({ price, cart }) => {
  const navigate=useNavigate()
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [cardError, setCardError] = useState(null);
  const [cardSuccess, setCardSuccess] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const [customer, setCustomer] = useState({
    name: user?.displayName || 'anonymous',
    email: user?.email || 'unknown',
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'IN', // Default to India
    }
  });

  useEffect(() => {
    if (typeof price !== 'number' || price < 1) {
      console.log("Price is not a number or less than 1");
      return;
    }
    // Create PaymentIntent as soon as the page loads
    axiosSecure.post('/create-payment-intent', { price, customer })
      .then(res => {
        setClientSecret(res.data.clientSecret);
      });
  }, [price, axiosSecure, customer]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardSuccess("Success");
    }

    const { paymentIntent, error: confirmError } = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: customer.name,
            email: customer.email,
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setCardError(confirmError.message);
    }
    if(paymentIntent.status==="succeeded"){
      console.log(paymentIntent.id)
      setCardSuccess(`Your transaction ID is ${paymentIntent.id}`)
      const paymentInfo={
        email:user.email,
        transactionId:paymentIntent.id,
        price,
        quantity:cart.length,
        status:"Order pending",
        itemName:cart.map(item=>item.name),
        cartItems:cart.map(item=>item._id),
        menuItems:cart.map(item=>item.menuItemId),
      }

      // console.log(paymentInfo);
      axiosSecure.post("/payments",paymentInfo)
      .then(res=>{
        console.log(res.data)
        navigate('/orders')
      })
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      }
    }));
  };

  return (
    <div className="flex flex-col sm:flex-row justify-start items-start gap-8 mt-10">
      <div className="md:w-1/2 w-full space-y-3">
        <h4 className="text-lg font-semibold">Order Summary</h4>
        <p>Total Price: ${price}</p>
        <p>Number of Items: {cart.length}</p>
      </div>
      <div className="md:w-2/3 w-full space-y-5 card bg-base-100  max-w-sm shrink-0 shadow-2xl px-8 py-8">
        <h4 className="text-lg font-semibold">Process your Payment!</h4>
        <h5 className="font-medium">Credit/Debit Card</h5>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-5">
            <input
              type="text"
              name="line1"
              value={customer.address.line1}
              onChange={handleInputChange}
              placeholder="Address Line 1"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="line2"
              value={customer.address.line2}
              onChange={handleInputChange}
              placeholder="Address Line 2"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="city"
              value={customer.address.city}
              onChange={handleInputChange}
              placeholder="City"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="state"
              value={customer.address.state}
              onChange={handleInputChange}
              placeholder="State"
              className="input input-bordered w-full"
              required
            />
            <input
              type="text"
              name="postal_code"
              value={customer.address.postal_code}
              onChange={handleInputChange}
              placeholder="Postal Code"
              className="input input-bordered w-full"
              required
            />
          </div>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            disabled={!stripe}
            className="btn btn-sm mt-5 btn-primary text-white w-full"
          >
            Pay
          </button>
          {cardError && (
            <Stack sx={{ width: "100%", marginTop: "10px" }} spacing={2}>
              <Alert variant="outlined" severity="warning">
                {cardError}
              </Alert>
            </Stack>
          )}
          {cardSuccess && (
            <Stack sx={{ width: "100%", marginTop: "10px" }} spacing={2}>
              <Alert variant="outlined" severity="success">
                {cardSuccess}
              </Alert>
            </Stack>
          )}
        </form>

        <div className="mt-5 text-center">
          <hr />
          <button
            type="submit"
            className="btn btn-sm mt-5 bg-orange-500 text-white"
          >
            <FaPaypal /> Pay with Paypal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
