import React from "react";
import { Link , useNavigate} from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

const Header=()=> {
  const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">TodoApp.Com</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                {isUserLoggedIn && <Link className="nav-link active" aria-current="page" to="/welcome/gaurav">Home</Link>}
                </li>
                <li className="nav-item">
                {isUserLoggedIn && <Link className="nav-link" to="/todos">Todos</Link>}
                </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                {!isUserLoggedIn && <Link className="nav-link" to="/login">Login</Link>}
                </li>
                <li className="nav-item">
                {isUserLoggedIn && <Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link>}
                </li>
            </ul>
            </div>
        </div>
        </nav>
    </>
  );
}

export const withRouter = (Component) => {
  const Wrapper = (props) => {
      const navigate = useNavigate();
      return (
          <Component
              navigate={navigate}
              {...props}
          />
      );
  };
  return Wrapper;
};

export default withRouter(Header);
