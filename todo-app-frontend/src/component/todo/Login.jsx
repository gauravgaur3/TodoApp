import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "./AuthenticationService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [hasLoginFailed, setHasLoginFailed] = useState(false);

  const navigate = useNavigate();

  function loginClicked() {
    AuthenticationService.executeJwtAuthenticationService(username, password)
      .then((response) => {
        AuthenticationService.registerSuccessfulLoginForJwt(username, response.data.token);
        navigate(`/welcome/${username}`);
      })
      .catch(() => {
        setHasLoginFailed(true);
      });
  }

  return (
    <>
      {hasLoginFailed && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Invalid Credentials{" "}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      <div className="m-auto shadow rounded p-md-5 p-sm-5 p-5">
        <h1 className="h1 m-4 fw-normal">Member Login</h1>
        <input
          type="email"
          className="form-control mt-4"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="form-control mt-4"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button
          className="w-50 btn btn-lg btn-secondary mt-4"
          onClick={loginClicked}
        >
          Login
        </button>
      </div>
    </>
  );
}

export default Login