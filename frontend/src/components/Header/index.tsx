import { CollectionsBookmark, Home, PostAddOutlined } from "@mui/icons-material";
import "./header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <h1 className="header__title"> Flash Cards</h1>

      <nav className="navigation">
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link to={"/"} title="Home">
              <Home style={{ fontSize: "2rem" }} />
            </Link>
          </li>
          <li className="navigation__item">
            <Link to={"/cards/add"} title="AddCard">
              <PostAddOutlined style={{ fontSize: "2rem" }} />
            </Link>
          </li>
          <li className="navigation__item">
            <Link to={"/collections/"} title="Collections">
              <CollectionsBookmark style={{ fontSize: "2rem" }} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
