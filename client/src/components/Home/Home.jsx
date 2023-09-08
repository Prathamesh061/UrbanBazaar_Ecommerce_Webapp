import React, { useEffect } from "react";
import "./home.css";
import ProductCard from "../ProductCard/ProductCard";
import MetaData from "../Utility/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { useAlert } from "../../contexts/alertContext";
import { clearErrors } from "../../actions/userAction";
import Footer from "../Layout/Footer/Footer";

function Home() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  const alert = useAlert();
  useEffect(() => {
    dispatch(getProduct({}));

    if (error) {
      alert(error, "errory");
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="home">
          <MetaData title="UrbanBazaar | Home" />
          <h2 className="home-header">Latest Launches</h2>
          <div className="product-container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Home;
