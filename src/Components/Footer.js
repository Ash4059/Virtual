import React from 'react';
import "./Footer.css";

const Footer = ()=>{
       
    return(
            <div className="footer 1-box is-center">
                <h2 variant="body2" color="textSecondary" align="center">
                { 'Copyright ©' }
                { 'Virtual Police' }
                { new Date().getFullYear() }
                {'.'}
                </h2>
            </div>
    )
}
export default Footer;