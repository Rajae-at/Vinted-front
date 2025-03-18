import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const CheckoutForm = ({ title, price }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleError = (error) => {
    setIsLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe) {
      return;
    }
    setIsLoading(true);
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
    const stripeResponse = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
      {
        title: title,
        amount: price * 100,
      }
    );
    const clientSecret = stripeResponse.data.client_secret;

    const confirmPaymentResponse = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:5173/",
      },
      redirect: "if_required",
    });
    console.log("ici =>", confirmPaymentResponse);

    if (confirmPaymentResponse.error) {
      handleError(confirmPaymentResponse.error);
    }

    if (confirmPaymentResponse.paymentIntent.status === "succeeded") {
      setCompleted(true);
    }

    setIsLoading(false);
  };

  return completed ? (
    <p>Paiement effectué, félicitations pour votre achat ! 🎉</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe || !elements || isLoading}>Pay</button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
