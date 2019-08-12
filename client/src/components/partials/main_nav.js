import React from "react";
import { Link } from "react-router-dom";

function MainNav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">
        The Secret chat
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Login
            </Link>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Menu
            </a>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to="/chats/new">
                Create Chat
              </Link>
              <Link className="dropdown-item" to="/chats/index">
                Chat List
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/logout">
              Logout
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/authors/new">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default MainNav;
