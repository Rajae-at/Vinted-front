import React from "react";
import "./Header.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header container">
      <div>
        <Link to={"/"}>
          <img className="logo" src={logo} alt="logo vinted" />
        </Link>
      </div>

      <div className="buttons">
        <Link to={"/signup"}>
          <button>S'inscrire</button>
        </Link>
        <Link to={"/login"}>
          <button>Se connecter</button>
        </Link>
        <button>Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
