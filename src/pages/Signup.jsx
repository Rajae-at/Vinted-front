import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Signup = () => {
  const [signup, setSignup] = useState([]);
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/signup");
        setSignup(response.data.token);
      } catch (error) {
        console.error("Une erreur est survenue. Veuillez réessayer. ");
      }
    };

    fetchOffers();
  }, []);
  return (
    <div>
      <button>s'inscrire</button>
    </div>
  );
};

export default Signup;
