import React from "react";
import "./css/home.css";
import Product from "./Product";
import MetaData from "./MetaData";

const product = {
  name: "Rocky shirt",
  images: [{ url: "http://localhost:5173/1.jpg" }],
  price: "Rs. 3000",
  _id: "Lalu",
  rating: 5,
};

function Home() {
  return (
    <div className="home">
      <MetaData title="UrbanBazaar | Home" />
      <h2 className="home-header">Featured Products</h2>
      <div className="product-container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </div>
  );
}

export default Home;
