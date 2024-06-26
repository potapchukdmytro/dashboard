import React from "react";
import "./style.css";

const Navbar = (props) => {
    return (
        <div className="navbar">
            <div className="logo">
                <h3>{props.logo}</h3>
            </div>
            <div className="title">
                <h2>{props.title}</h2>
            </div>
            <div className="auth">
                Login/Register
            </div>
        </div>
    );
};

export default Navbar;