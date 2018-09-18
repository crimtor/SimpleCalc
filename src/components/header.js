import React from "react";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-primary">
    <a className="navbar-brand" href="#" style={{marginLeft: "30px"}}>Simple Calc FCC</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#">Home <span className="sr-only"></span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://www.shawntfox.com#about">About Me</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://www.shawntfox.com#resume">Back To STF.com</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="https://www.shawntfox.com/projects.html">Projects</a>
        </li>
      </ul>
    </div>
  </nav>
  );
};

export default Header;
