import { CollectionsBookmark, Home, PostAddOutlined } from "@mui/icons-material";
import "./header.css";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { themeState } from "../../store/Theme/atoms";
import React from "react";

export default function Header() {
  const setTheme = useSetRecoilState(themeState);
  try {
    const theme = useRecoilValue(themeState);
  } catch (error) {
    console.error(error);
    console.log(themeState);
  }
  React.useEffect(() => {}, []);
  const handleTheme = () => {
    setTheme((prev) => ({ active: prev.active === "dark" ? "light" : "dark" }));
  };

  return (
    <header className="header">
      <div>
        <h1 className="header__title"> Flash Cards</h1>
        <button
          onClick={() => {
            handleTheme();
          }}
          aria-label="Toggle Theme"
        >
          <div id="circle"></div>
        </button>
      </div>

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
