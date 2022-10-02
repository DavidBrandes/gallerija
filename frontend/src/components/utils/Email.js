import { Link } from "react-router-dom";

function Email(props) {
  return (
    <Link
      style={{ textDecoration: "none", color: "black" }}
      to="#"
      onClick={(e) => {
        window.location.href = `mailto:${props.address}`;
        e.preventDefault();
      }}
    >
      {props.children}
    </Link>
  );
}

export default Email;
