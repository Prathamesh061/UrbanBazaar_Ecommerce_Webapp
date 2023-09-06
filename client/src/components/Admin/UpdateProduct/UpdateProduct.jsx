import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../../actions/productAction";
import MetaData from "../../Utility/MetaData";
import Sidebar from "../Sidebar/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faComment,
  faFill,
  faIndianRupeeSign,
  faList,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productConstants";
import Loader from "../../Layout/Loader/Loader";
import { useAlert } from "../../../contexts/alertContext";
import "./updateProduct.css";

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

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [openDashboardToggle, setOpenDashboardToggle] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const { error, product } = useSelector((state) => state.productDetails);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  const alert = useAlert();

  const productId = params.id;

  function handleProductUpdation(e) {
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

    dispatch(updateProduct(productId, myForm));
  }

  function updateProductImageChange(e) {
    const files = Array.from(e.target.files);

    setImages([]);
    setOldImages([]);
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
    dispatch(getProductDetails(productId));
  }, []);

  useEffect(() => {
    setName(product?.name);
    setDescription(product?.description);
    setPrice(product?.price);
    setCategory(product?.category);
    setStock(product?.stock);
    setOldImages(product?.images);

    if (!isAuthenticated) {
      navigate(
        `/login?message=You must log in first.&redirectTo=${location.pathname}`
      );
    } else if (user.role && user.role !== "admin") {
      navigate(
        `/login?message=Dashboard: Only Admin View.&login=active&redirectTo=${location.pathname}`
      );
    }

    if (isUpdated) {
      navigate("/admin/dashboard");
      dispatch({
        type: UPDATE_PRODUCT_RESET,
      });
    }

    if (error) {
      alert(error, "errory");
      dispatch(clearErrors());
    }

    if (updateError) {
      alert(updateError, "errory");
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert("Product successfully updated!", "success");
      dispatch({
        type: UPDATE_PRODUCT_RESET,
      });
    }
  }, [
    dispatch,
    isAuthenticated,
    user,
    isUpdated,
    productId,
    product,
    error,
    updateError,
  ]);

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
        {loading ? (
          <Loader />
        ) : (
          <div className="dashboard-main create-product-main">
            <Link
              to={`/admin/products`}
              relative="path"
              className="profile-back-btn"
            >
              &larr; <span>Back</span>
            </Link>
            <form
              className="product-creation-form"
              encType="multipart/form-data"
              onSubmit={handleProductUpdation}
            >
              <h2 className="dashboard-header create-product-header">
                Update Product
              </h2>
              <div className="product-namy">
                <FontAwesomeIcon icon={faUser} className="icon-clr" />
                <input
                  type="text"
                  placeholder="Product Name..."
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="product-pricy">
                <FontAwesomeIcon
                  icon={faIndianRupeeSign}
                  className="icon-clr"
                />
                <input
                  type="number"
                  placeholder="Product Price..."
                  required
                  value={price === 0 ? "" : price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="product-category">
                <FontAwesomeIcon icon={faList} className="icon-clr" />
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="">Choose Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="product-stock">
                <FontAwesomeIcon icon={faFill} className="icon-clr" />
                <input
                  type="number"
                  placeholder="Product Stock..."
                  required
                  value={stock === 0 ? "" : stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="product-description">
                <FontAwesomeIcon icon={faComment} className="icon-clr" />
                <textarea
                  placeholder="Product Description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id=""
                  cols="30"
                  rows="2"
                ></textarea>
              </div>

              <div
                className="product-form-file"
                onChange={updateProductImageChange}
              >
                <input type="file" name="avatar" accept="image/*" multiple />
              </div>

              <div className="product-form-img old-images">
                {oldImages &&
                  oldImages.map((img, index) => {
                    return (
                      <img
                        src={img.url}
                        key={index}
                        alt="Old Product preview"
                      />
                    );
                  })}
              </div>

              <div className="product-form-img">
                {imagesPreview.map((img, index) => {
                  return <img src={img} key={index} alt="Product preview" />;
                })}
              </div>

              <button
                className="create-product-form-submit-btn btn"
                type="submit"
                disabled={loading}
              >
                UPDATE
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default UpdateProduct;
