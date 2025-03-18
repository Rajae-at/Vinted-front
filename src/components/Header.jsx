import React, { useState } from "react";
import "./Header.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Range } from "react-range";

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
  const [sortedByPrice, setSortedByPrice] = useState(false);

  return (
    <header className="header container">
      <div>
        <Link to={"/"}>
          <img className="logo" src={logo} alt="logo vinted" />
        </Link>
      </div>
      <div className="search">
        <input
          type="text"
          id={title}
          value={title}
          placeholder="Recherche des articles"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <div className="toggle-container">
          <label>Trier par prix :</label>
          <div
            className={`toggle-switch ${sortedByPrice ? "active" : ""}`}
            onClick={() => setSortedByPrice(!sortedByPrice)}
          ></div>
          <div className="toggle-btn"></div>

          <div className="filter">
            <label>Prix entre :</label>
            <Range
              step={1}
              min={0}
              max={1000}
              values={[priceMin, priceMax]}
              onChange={(values) => {
                setPriceMin(values[0]);
                setPriceMax(values[1]);
              }}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "6px",
                    width: "100%",
                    backgroundColor: "#ccc",
                    borderRadius: "3px",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ index, props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "20px",
                    width: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#09b0ba",
                    cursor: "pointer",
                  }}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div>
        {existingToken ? (
          <button
            className="deconnection"
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
        <Link to={"/publish"}>
          <button className="sales">Vends tes articles</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
