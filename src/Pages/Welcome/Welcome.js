import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import "./welcome.css";

export default class Welcome extends React.Component{


    render(){
        return(
            <>
                <div className="viewWelcomeBoard">
                    <img className="avatarWelcome" src={this.props.cureentUserPhoto} alt="" />
                    <span className="textTitleWelcome">{`welcome, ${this.props.currentUserName} `}</span>
                    <span className="textDesciptionWelcome">Let's connect to the world</span>
                </div>
            </>
        )
    }
}