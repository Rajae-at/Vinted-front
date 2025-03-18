import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../pages/Home.css";
import hero from "../assets/hero.jpg";

const Home = ({ title, priceMin, priceMax }) => {
  const [offers, setOffers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        let filters = "";
        if (title) {
          filters += "?title=" + title;
        }
        if (priceMin) {
          if (filters) {
            filters += "&priceMin=" + priceMin;
          } else {
            filters += "?priceMin=" + priceMin;
          }
        }
        if (priceMax) {
          if (filters) {
            filters += "&priceMax=" + priceMax;
          } else {
            filters += "?priceMax=" + priceMax;
          }
        }
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers${filters}`
        );

        setOffers(response.data.offers);
        setIsLoading(false);
      } catch (error) {
        console.error(error.response);
      }
    };

    fetchOffers();
  }, [title, priceMin, priceMax]);

  return isLoading ? (
    <p>Chargement...</p>
  ) : (
    <div>
      <div className="hero">
        <img className="hero-image" src={hero} alt="hero" />
        <img
          className="tear-effect"
          src="src/assets/tear-cb30a259.svg"
          alt="déchirure"
        />
        <div className="container">
          <div className=" hero-button">
            Prêts à faire du tri dans vos placards ?
            <Link to={"/login"}>
              <button>Commencer à vendre</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container offers-container">
        {offers.map((offer) => (
          <Link
            to={`/offer/${offer._id}`}
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
        ))}
      </div>
    </div>
  );
};

export default Home;
