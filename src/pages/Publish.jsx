import { useState } from "react";
import axios from "axios";
import "../pages/Publish.css";
import { useNavigate } from "react-router-dom";

const Publish = ({ userToken }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [change, setChange] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <h2>Vends ton article</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData();
          formData.append("picture", file);
          formData.append("title", title);
          formData.append("description", description);
          formData.append("brand", brand);
          formData.append("size", size);
          formData.append("color", color);
          formData.append("conditon", condition);
          formData.append("city", city);
          formData.append("price", price);
          formData.append("change", change);

          try {
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
              formData,
              {
                headers: {
                  authorization: "Bearer " + userToken,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            console.log(response.data);
            navigate(`/offer/${response.data._id}`);
          } catch (error) {
            console.log(error.response);
          }
        }}
      >
        <input
          type="file"
          onChange={async (event) => {
            setFile(event.target.files[0]);
          }}
        />

        <label htmlFor="title">Titre</label>
        <input
          type="text"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          value={title}
          id={title}
          placeholder="ex: Chemise Sézane verte"
        />

        <label htmlFor="description">Décris ton article</label>
        <input
          type="text"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          value={description}
          id={description}
          placeholder="ex: porté quelquefois, taille correctement"
        />

        <label htmlFor="brand">Marque</label>
        <input
          type="text"
          onChange={(event) => {
            setBrand(event.target.value);
          }}
          value={brand}
          id={brand}
          placeholder="ex: Zara"
        />

        <label htmlFor="size">Taille</label>
        <input
          type="text"
          onChange={(event) => {
            setSize(event.target.value);
          }}
          value={size}
          id={size}
          placeholder="ex: L / 40 / 12"
        />

        <label htmlFor="color">Couleur</label>
        <input
          type="text"
          onChange={(event) => {
            setColor(event.target.value);
          }}
          value={color}
          id={color}
          placeholder="ex: Fushia"
        />

        <label htmlFor="condition">Etat</label>
        <input
          type="text"
          onChange={(event) => {
            setCondition(event.target.value);
          }}
          value={condition}
          id={condition}
          placeholder="Neuf avec étiquette"
        />

        <label htmlFor="city">Lieu</label>
        <input
          type="text"
          onChange={(event) => {
            setCity(event.target.value);
          }}
          value={city}
          id={city}
          placeholder="ex: Paris"
        />

        <label htmlFor="price">Prix</label>
        <input
          type="text"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
          value={price}
          id={price}
          placeholder="0,00 €"
        />

        <input
          type={"checkbox"}
          checked={change}
          onChange={(event) => {
            handleChange(event, setChange, "checkbox");
          }}
        />
        <p>Je suis intéressé(e) par les échanges</p>

        <button>Ajouter</button>
      </form>
    </>
  );
};

export default Publish;
