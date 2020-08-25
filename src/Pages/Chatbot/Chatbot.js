import React from 'react';
import "./Chatbot.css";
import {Card} from "react-bootstrap";
import ReactLoading from 'react-loading';
import "react-toastify/dist/ReactToastify.css";
import firebase from "../../services/firebase";
import images from "../../ProjectImages/ProjectImages";
import moment from 'react-moment';
import "./Chatbot.css";
import Login_string from "../Login/login_string";
import "bootstrap/dist/css/bootstrap.min.css";
import SendIcon from '@material-ui/icons/Send';
export default class Chatbot  extends React.Component{
    constructor(props){
        super (props);
        this.state={
            isLoading: false,
            isShowSticker:false,
            inputValue:'',
        }
        this.currentUserName = localStorage.getItem(Login_string.Name);
        this.cureentUserId = localStorage.getItem(Login_string.ID);
        this.cureentUserPhoto = localStorage.getItem(Login_string.Photourl);
        this.currentUserDocumentId = localStorage.getItem(Login_string.FirebaseDocumentId);
        this.stateChanged=localStorage.getItem(Login_string.UPLOAD_CHANGED);
        this.currentPeerUser = this.props.currentPeerUser;
    }
    componentWillReceiveProps(newProps){
        if(newProps.currentPeerUser){
            this.currentPeerUser=newProps.currentPeerUser;
            //this.getListHistory()
        }
    }
    componentDidMount(){
        //this.getListHistory()
    }
    render(){
        return (
        <div>
            <Card className="viewChatBoard" style={{width:'100%'}}>
                <div className="headerChatBoard">
                    <img className="viewAvatarItem" src={this.currentPeerUser.URL} />
                    <span className="textHeaderChatBoard">
                        <p style={{fontSize:'20px'}}>{this.currentPeerUser.name}</p>
                    </span>
                    <div className="aboutMe">
                        <span className="textHeaderChatBoard">
                            <p>{this.currentPeerUser.description}</p>
                        </span>
                    </div>
                </div>

                <div className="viewListContentChat">
                    {}
                    <div style={{float:'left',clear:'both'}}
                    ref={el=>{
                        this.messagesEnd=el
                    }} />
                </div>
                {this.state.isShowSticker?this.renderSticker():null}
                <div className="veiwBottom">
                    <img className="viewInputGallery" accept="images/*" type="file" onChange={this.choosePhoto} />
                    <input className="viewInput" placeholder="Type a message" value={this.state.inputValue} onChange={
                        event=>{
                            this.setState({inputValue:event.target.value})
                        }
                    } onKeyPress={this.onKeyPress} />
                    <SendIcon className="icSend" src={images.send} alt="icon send"  />
                </div>
            </Card>
        </div>
        )
    }
}