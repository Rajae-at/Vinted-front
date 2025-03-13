import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Login = () => {
  const [login, setLogin] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/login");
        setLogin(response.data.token);
      } catch (error) {
        console.error("Une erreur est survenue. Veuillez réessayer. ");
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <button>s'inscrire</button>
    </div>
  );
};

export default Login;
