import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "../pages/Signup.css";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  // const handleSubmit = (event) => {
  //   setValue(event.target.value);
  // };
  return (
    <div>
      <Header />
      <div className="form">
        <h2>S'inscrire</h2>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/user/signup",
                {
                  email: email,
                  username: username,
                  password: password,
                  newsletter: true,
                }
              );

              console.log(response.data);
            } catch (error) {
              console.log(error.response);
            }
          }}
        >
          <input
            type={"text"}
            name={"username"}
            id={username}
            value={username}
            placeholder={"Nom d'utilisateur"}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <br />
          <input
            type={"email"}
            name={"email"}
            id={"email"}
            value={email}
            placeholder={"Email"}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <br />
          <input
            type={"password"}
            name={"password"}
            id={"password"}
            value={password}
            placeholder={"Mot de passe"}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <br />
          <input
            type={"checkbox"}
            checked={newsletter}
            onChange={(event) => {
              setNewsletter(event.target.value);
            }}
          />
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button className="msg" type="submit">
            S'inscrire
          </button>
          <Link to={"/login"}>
            <p>Tu as déjà un compte ? Connecte-toi !</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
