import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);
const Payment = () => {
  const location = useLocation();
  const { title, price } = location.state;
  const options = {
    mode: "payment",
    amount: price * 100,
    currency: "eur",
    appearance: {
      /*...*/
    },
  };
  console.log(price);

  return (
    <>
      <span>{title}</span>;
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm title={title} price={price} />
      </Elements>
    </>
  );
};

export default Payment;
