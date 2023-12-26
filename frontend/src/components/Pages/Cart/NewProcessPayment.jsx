import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import ProcessPayment from './ProcessPayment';


const stripePromise = loadStripe('pk_test_51OHXtCSE24due53MPjdFyi4DDBBooGsmC9OFzhZXexJIRPUOrYVxf26WHrrPelBzGaAKJd18Thd0VfK95JHjxC9E00lrBPTcXN');


const NewProcessPayment = () => {


    const [stripeApiKey, setStripeApiKey] = useState("");

    async function getStripeApiKey() {
        const { data } = await axios.get("/api/v1/stripeApiKey");
        setStripeApiKey(data.stripeApiKey);
    }


   const options = {
    // passing the client secret obtained from the server
    clientSecret: 'sk_test_51OHXtCSE24due53MY2uxA0ck8OnYkWsnPqiv0pX9TyVJWAAdQJGUHOkY7D2P0ER3dv5fxfvaJ0HycbTvjqtA3Itf007gVmk5zS',
  };

    useEffect(() => {
        getStripeApiKey();
    }, []);

    return (
        <Elements stripe={stripePromise}>
            <ProcessPayment />
        </Elements>
    )
}


export default NewProcessPayment