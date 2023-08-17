import React, { useEffect, useState } from "react";
import Loader from "../../Layout/Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, clearErrors } from "../../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../../constants/userConstants";
import MetaData from "../../Utility/MetaData";
import "./updateProfile.css";

function UpdateProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [avatar, setAvatar] = useState(user?.avatar?.url);
  const [avatarPreview, setAvatarPreview] = useState(avatar || "/profile.png");

  function handleUpdateProfile(e) {
    e.preventDefault();

    const formToBeSent = new FormData();

    formToBeSent.set("name", name);
    formToBeSent.set("email", email);
    formToBeSent.set("avatar", avatar);

    dispatch(updateProfile(formToBeSent));
  }

  function updateProfileDataChange(e) {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  useEffect(() => {
    if (isUpdated) {
      navigate(`/account?message=Profile Updated Successfully.`);

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }

    if (!isAuthenticated) {
      navigate(
        `/login?message=You must log in first.&redirectTo=${location.pathname}`
      );
    }

    if (error) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 5000);
    }
  }, [dispatch, error, user, isUpdated, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <div className="update-profile-container">
            <div className="update-box">
              <h2 className="update-profile-container__header">
                Update Profile
              </h2>
              <form
                className="update-form"
                encType="multipart/form-data"
                onSubmit={handleUpdateProfile}
              >
                {error && <p className="error">{error}</p>}

                <div className="update-name">
                  <FontAwesomeIcon icon={faEnvelope} className="icon-clr" />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="update-email">
                  <FontAwesomeIcon icon={faUser} className="icon-clr" />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="update-image">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value={"Update"}
                  className="update-btn btn"
                  disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UpdateProfile;
