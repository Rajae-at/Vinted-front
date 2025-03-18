import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./pages/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);
const Payment = () => {
  const location = useLocation();
  const { title } = location.state;
  const options = {
    mode: "payment",
    amount: 1099,
    currency: "eur",
    // Fully customizable with appearance API.
    appearance: {
      /*...*/
    },
  };
  return (
    <>
      <span>{title}</span>;
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </>
  );
};

export default Payment;
