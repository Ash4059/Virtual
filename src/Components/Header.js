import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = ()=>{
    return(
        <header className="header-login-signup">
            <div className="header-limiter">
                <h1><a href="/">Virtual<span>Police</span></a></h1>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/">About app</Link>
                    <Link to="/">Contact us</Link>
                </nav>
                <ul>
                    <li><Link to="/Login">Login</Link></li>
                    <li><Link to="/Signup">Signup</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default Header;