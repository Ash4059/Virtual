import React from 'react';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import "./Home.css";
import images from "../../ProjectImages/ProjectImages";
import {Link} from "react-router-dom";
const Home=()=>{
    return(
        <>
            <Header />
            <div className="splash-container">
                <div className="splash">
                    <h1 className="splash-head">WEB CHAT APP</h1>
                    <p className="splash-subhead">
                        Let's report complain
                    </p>
                    <div id="custom-button-wrapper">
                        <Link to="/Login">
                            <div className="my-super-cool-btn">
                                <div className="dots-container">
                                    <div className="dots"></div>
                                </div>
                                <span className="buttoncooltext">Gets started</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="content-wrapper">
                <div className="content">
                    <h2 className="content-head is-center">Feature of webchat application</h2>
                    <div className="Appfeatures">
                        <div className="contenthead">
                            <h3 className="content-subhead">
                                <i className="fa fa-rocket"></i>
                                Get's started quickly
                            </h3>
                            <p>
                                Just register yourself with this app and start chatting with your loved ones
                            </p>
                        </div>
                    
                        <div className="1-box pure-u-md-1-2 pure-u-lg-1-4">
                            <h3 className="content-subhead">
                                <i className="fa fa-sign-in"></i>
                                Firebase Authentication
                            </h3>
                            <p>
                                Firebase Authentication has been implemented in this app
                            </p>
                        </div>
                        <div className="1-box pure-u-md-1-2 pure-u-lg-1-4">
                            <h3 className="content-subhead">
                                <i className="fa fa-th-large"></i>
                                Media
                            </h3>
                            <p>
                                You can share the images with your freinds for better experience
                            </p>
                        </div>
                        <div className="1-box pure-u-md-1-2 pure-u-lg-1-4">
                            <h3 className="content-subhead">
                                <i className="fa fa-refresh"></i>
                                Updates
                            </h3>
                            <p>
                                We will working with new features for better experience
                            </p>
                        </div>
                    </div>
                    <div className="AppfeaturesFounder">
                        <div className="l-box-lrg is-center pure-u-1 pure-u-md-1-2 pure-u-lg-2-5">
                            <img width="300" alt="File Icons" className="pure-img-responsive" src={images.ali} />
                        </div>
                        <div className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4">
                            <h2 className="content-head content-head-ribbon">Batch 18</h2>
                            <p style={{color:'white'}}>The founder of virtual police station</p>
                            <p style={{color:'white'}}>Currently working on virtual police station for exploring new ideas</p>
                        </div>

                    </div>
                    <div className="Appfeatures">
                        <div className="l-box-lrg pure-u-1 pure-u-md-2-5">
                            <form className="pure-form pure-form-stacked">
                                <fieldset>
                                    <label htmlFor="name">Your Name</label>
                                    <input id="name" type="text" placeholder="Your name" />
                                    <label htmlFor="email">Your email</label>
                                    <input id="email" type="email" placeholder="Your email" />
                                    <label htmlFor="password">password</label>
                                    <input id="pwd" type="password" placeholder="Your password" />
                                    <button type="submit" className="pure-button">Sign up</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            {/* <Footer /> */}
        </>
    )
}



export default Home;