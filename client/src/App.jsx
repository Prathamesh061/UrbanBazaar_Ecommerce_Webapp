import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails/ProductDetails";
import ProductDescription from "./components/Product/ProductDescription/ProductDescription";
import ProductReviews from "./components/Product/ProductReview/ProductReviews";
import Products from "./components/Product/Products";
import LoginSignUp from "./components/User/LoginSignUp";
import "./app.css";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Profile from "./components/User/Profile/Profile";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />}>
            <Route index element={<ProductReviews />} />
            <Route path="description" element={<ProductDescription />} />
          </Route>
          <Route path="/products" element={<Products />} />
          <Route path="/products/search/:productName" element={<Products />} />
          <Route path="/contact" element={<h1>contact</h1>} />
          <Route path="/about" element={<h1>about</h1>} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/cart" element={<h1>Cart</h1>} />
          <Route path="/dashboard" element={<h1>dashboard</h1>} />
          <Route path="/orders" element={<h1>orders</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
