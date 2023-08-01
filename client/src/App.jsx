import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import ProductDescription from "./components/Product/ProductDescription/ProductDescription";
import ProductReviews from "./components/Product/ProductReview/ProductReviews";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />}>
            <Route index element={<ProductReviews />} />
            <Route path="description" element={<ProductDescription />} />
          </Route>
          <Route path="/products" element={<h1>product</h1>} />
          <Route path="/contact" element={<h1>contact</h1>} />
          <Route path="/about" element={<h1>about</h1>} />
          <Route path="/profile" element={<h1>Profile</h1>} />
          <Route path="/cart" element={<h1>Cart</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
