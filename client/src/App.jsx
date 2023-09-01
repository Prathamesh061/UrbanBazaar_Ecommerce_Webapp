import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails/ProductDetails";
import ProductDescription from "./components/Product/ProductDescription/ProductDescription";
import ProductReviews from "./components/Product/ProductReview/ProductReviews";
import Products from "./components/Product/Products";
import LoginSignUp from "./components/User/LoginSignUp";
import "./app.css";
import { useEffect, useState } from "react";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Profile from "./components/User/Profile/Profile";
import About from "./components/About/About";
import DashBoard from "./components/Admin/DashBoard/DashBoard";
import UpdateProfile from "./components/User/UpdateProfile/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Cart/Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess/OrderSuccess";
import Orders from "./components/Cart/Orders/Orders";
import OrderDetails from "./components/Cart/Orders/OrderDetails/OrderDetails";
import ProductList from "./components/Admin/ProductList/ProductList";
import CreateProduct from "./components/Admin/CreateProduct/CreateProduct";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(async () => {
    const { data } = await axios.get("/eshop/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
    store.dispatch(loadUser());
  }, []);

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
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/password/forget" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/order/confirm" element={<ConfirmOrder />} />
        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />
        )}
        <Route path="/success" element={<OrderSuccess />} />
        // Admin Routes
        <Route path="/admin/dashboard" element={<DashBoard />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/product" element={<CreateProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
