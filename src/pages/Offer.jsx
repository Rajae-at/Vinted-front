import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

const Offer = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers/${id}`
        );
        setOffer(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération de l'offre :", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOffer();
  }, [id]);

  return loading ? (
    <p>Chargement</p>
  ) : (
    <div>
      <Header />
      <div className="offer-container">
        <div className="offer-image">
          <img src={offer.product_image.secure_url} alt={offer.product_name} />
        </div>

        <div className="offer-details">
          <p className="price">{offer.product_price} €</p>
          <ul className="product-info">
            {offer.product_details.map((detail, index) => {
              const key = Object.keys(detail)[0];
              return (
                <li key={index}>
                  <strong>{key} :</strong> {detail[key]}
                </li>
              );
            })}
          </ul>
          <p className="product-name">{offer.product_name}</p>
          <p className="product-description">{offer.product_description}</p>

          <div className="owner-info">
            {offer.owner.account.avatar && (
              <img
                src={offer.owner.account.avatar.secure_url}
                alt="Avatar"
                className="owner-avatar"
              />
            )}
            <span>{offer.owner.account.username}</span>
          </div>

          <button className="buy-button">Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default Offer;
