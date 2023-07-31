import React, { useEffect } from "react";
import "./home.css";
import ProductCard from "../ProductCard/ProductCard";
import MetaData from "../Utility/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader";

function Home() {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="home">
          <MetaData title="UrbanBazaar | Home" />
          <h2 className="home-header">Featured Products</h2>
          <div className="product-container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
