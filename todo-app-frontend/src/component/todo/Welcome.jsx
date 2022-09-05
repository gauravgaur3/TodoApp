import React from "react";
import {useParams } from "react-router-dom";

const Welcome = () => {
  let { fname } = useParams();
  return(
  <>
  <div className="py-5 m-auto">
    <div className="row py-lg-5">
      <div className="col-lg-6 col-md-8 mx-auto">
        <h1 className="fw-light">Welcome {fname.toUpperCase()}.</h1>
        <p className="lead m-5">A new way to develop positive habits and achieve goals through productivity. </p>
      </div>
    </div>
  </div>
  </>
)}

export default Welcome
