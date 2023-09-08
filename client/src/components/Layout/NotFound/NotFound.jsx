import { Link } from "react-router-dom";
import "./notFound.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h2>
        <FontAwesomeIcon icon={faExclamationCircle} className="icon-clr" />
      </h2>
      <p>Sorry, the page you were looking for was not found.</p>
      <Link to="/" className="link-button btn">
        Return to Home
      </Link>
    </div>
  );
}
