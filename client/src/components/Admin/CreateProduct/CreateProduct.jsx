import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { createProduct } from "../../../actions/productAction";
import MetaData from "../../Utility/MetaData";
import Sidebar from "../Sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { NEW_PRODUCT_RESET } from "../../../constants/productConstants";
import "./createProduct.css";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "Electronics",
  "Smartphones",
];

function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [openDashboardToggle, setOpenDashboardToggle] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, success } = useSelector((state) => state.newProduct);

  function handleSubmitProductCreation(e) {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((img, index) => {
      myForm.append(`images[${index}]`, img);
    });

    dispatch(createProduct(myForm));
  }

  function createProductImagesChange(e) {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  }
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        `/login?message=You must log in first.&redirectTo=${location.pathname}`
      );
    } else if (user.role && user.role !== "admin") {
      navigate(
        `/login?message=Dashboard: Only Admin View.&login=active&redirectTo=${location.pathname}`
      );
    }

    if (success) {
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, success, isAuthenticated, user]);
  return (
    <>
      <MetaData title={`Add Product`} />
      <div className="dashboard-container">
        <div className="dashboard-toggle" aria-label="dashboard toggler">
          {!openDashboardToggle ? (
            <FontAwesomeIcon
              icon={faBars}
              className="icon-clr"
              onClick={() => setOpenDashboardToggle(true)}
            />
          ) : null}
        </div>
        <div
          className={`dashboard-sidebar-container ${
            openDashboardToggle ? "show" : ""
          }`}
        >
          <Sidebar setOpenDashboardToggle={setOpenDashboardToggle} />
        </div>
        <div className="dashboard-main create-product-main">
          <form
            className="product-creation-form"
            encType="multipart/form-data"
            onSubmit={handleSubmitProductCreation}
          >
            <h2 className="dashboard-header create-product-header">
              Create Product
            </h2>
            <div className="product-namy">
              <FontAwesomeIcon icon={faBars} className="icon-clr" />
              <input
                type="text"
                placeholder="Product Name..."
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="product-pricy">
              <FontAwesomeIcon icon={faBars} className="icon-clr" />
              <input
                type="number"
                placeholder="Product Price..."
                required
                value={price === 0 ? "" : price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className="product-category">
              <FontAwesomeIcon icon={faBars} className="icon-clr" />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="product-stock">
              <FontAwesomeIcon icon={faBars} className="icon-clr" />
              <input
                type="number"
                placeholder="Product Stock..."
                required
                value={stock === 0 ? "" : stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div className="product-description">
              <FontAwesomeIcon icon={faBars} className="icon-clr" />
              <textarea
                placeholder="Product Description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id=""
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div
              className="product-form-file"
              onChange={createProductImagesChange}
            >
              <input type="file" name="avatar" accept="image/*" multiple />
            </div>

            <div className="product-form-img">
              {imagesPreview.map((img, index) => {
                return <img src={img} key={index} alt="Avatar preview" />;
              })}
            </div>

            <button
              className="create-product-form-submit-btn btn"
              type="submit"
              disabled={loading}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateProduct;
