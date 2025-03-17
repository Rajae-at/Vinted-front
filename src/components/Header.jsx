import React from "react";
import "./Header.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = ({
  setUser,
  userToken,
  title,
  setTitle,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
}) => {
  const existingToken = userToken;
  return (
    <header className="header container">
      <div>
        <Link to={"/"}>
          <img className="logo" src={logo} alt="logo vinted" />
        </Link>
      </div>
      <div>
        <input
          type="text"
          id={title}
          value={title}
          placeholder="Recherche es articles"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <label htmlFor="priceMin">Prix minimum :</label>
        <input
          type="number"
          id="priceMin"
          value={priceMin}
          onChange={(event) => {
            setPriceMin(event.target.value);
          }}
        />
        <label htmlFor="priceMax">Prix maximum :</label>
        <input
          type="number"
          id="priceMax"
          value={priceMax}
          onChange={(event) => {
            setPriceMax(event.target.value);
          }}
        />
      </div>

      <div className="buttons">
        {existingToken ? (
          <button
            onClick={() => {
              setUser(null);
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <>
            <Link to={"/signup"}>
              <button>S'inscrire</button>
            </Link>
            <Link to={"/login"}>
              <button>Se connecter</button>
            </Link>
          </>
        )}
        <button>Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
