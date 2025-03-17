import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Home from "./pages/Home";
import Header from "./components/Header";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import "./App.css";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("token") || null);
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const setUser = (token) => {
    if (token) {
      Cookies.set("token", token);
      setUserToken(token);
    } else {
      Cookies.remove("token");
      setUserToken(null);
    }
  };
  return (
    <BrowserRouter>
      <Header
        setUser={setUser}
        userToken={userToken}
        title={title}
        setTitle={setTitle}
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home title={title} priceMin={priceMin} priceMax={priceMax} />
          }
        />
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={<Signup userToken={userToken} setUserToken={setUserToken} />}
        />
        <Route
          path="/login"
          element={<Login userToken={userToken} setUserToken={setUserToken} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
