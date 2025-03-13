import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../pages/Home.css";
import hero from "../assets/hero.jpg";

const Home = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/v2/offers"
        );
        setOffers(response.data.offers);
      } catch (error) {
        console.error("Erreur lors de la récupération des offres :", error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div>
      <Header />
      <div className="hero">
        <img className="hero-image" src={hero} alt="hero" />
        <img
          className="tear-effect"
          src="src/assets/tear-cb30a259.svg"
          alt="déchirure"
        />
      </div>
      <div className="container offers-container">
        {offers.length === 0 ? (
          <p>Chargement...</p>
        ) : (
          offers.map((offer) => (
            <Link
              to={`/offers/${offer._id}`}
              key={offer._id}
              className="offer-card"
            >
              <div className="offer-header">
                {offer.owner.account.avatar && (
                  <img
                    src={offer.owner.account.avatar.secure_url}
                    alt={offer.owner.account.username}
                    className="offer-avatar"
                  />
                )}
                <span>{offer.owner.account.username}</span>
              </div>
              <img
                src={offer.product_pictures[0]?.secure_url}
                alt={offer.product_name}
                className="offer-image"
              />
              <p className="offer-price">{offer.product_price} €</p>
              <p className="offer-size">
                {offer.product_details[1]?.TAILLE || null}
              </p>
              <p className="offer-brand">
                {offer.product_details[0]?.MARQUE || null}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
