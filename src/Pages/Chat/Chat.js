import React from 'react';
import Login_string from "../Login/login_string";
import firebase from "../../services/firebase";
import "./Chat.css";
import Chatbot from "../Chatbot/Chatbot";
import Welcome from "../Welcome/Welcome";
export default class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            isOpenDialogConfirmLogout: false,
            currentPeerUser: null,
            displayedContactSwitchedNotification: [],
            displayedContacts: [],
        }
        this.currentUserName = localStorage.getItem(Login_string.Name);
        this.cureentUserId = localStorage.getItem(Login_string.ID);
        this.cureentUserPhoto = localStorage.getItem(Login_string.Photourl);
        this.currentUserDocumentId = localStorage.getItem(Login_string.FirebaseDocumentId);
        this.searchUser = [];
        this.currentUserMessage = [];
        this.notificationMessageErase = [];
        this.onProfileClick = this.onProfileClick.bind(this);
        this.getListUser = this.getListUser.bind(this);
        this.renderListUser = this.renderListUser.bind(this);
        this.notificationErase = this.notificationErase.bind(this);
        this.updateRenderList = this.updateRenderList.bind(this);
        this.classnameforUserandNotification = this.classnameforUserandNotification.bind(this);
    };
    logout = () => {
        firebase.auth().signOut();
        this.props.history.push("/");
        localStorage.clear();
    }
    onProfileClick = () => {
        this.props.history.push("/Profile");
    }
    componentDidMount() {
        firebase.firestore().collection('users').doc(this.currentUserDocumentId).get()
            .then((doc) => {
                doc.data().messages.map((item) => {
                    this.currentUserMessage.push({
                        notificationId: item.notificationId,
                        number: item.number
                    })
                })
                this.setState({
                    displayedContactSwitchedNotification: this.currentUserMessage
                })
            })
        this.getListUser();
    }
    getListUser = async () => {
        const result = await firebase.firestore().collection('users').get();
        if (result.docs.length > 0) {
            let listUser = [];
            listUser = [...result.docs];
            listUser.forEach((item, index) => {
                this.searchUser.push(
                    {
                        key: index,
                        documentKey: item.id,
                        id: item.data().id,
                        name: item.data().name,
                        messages: item.data().messages,
                        URL: item.data().URL,
                        description: item.data().description,

                    }
                )
            })
            this.setState({
                isLoading: false
            })
        }
        this.renderListUser();
    }
    classnameforUserandNotification = (itemId) => {
        let number = 0;
        let classname = "";
        let check = false;
        if (this.state.currentPeerUser && this.state.currentPeerUser.id === itemId) {
            classname = "viewWrapItemFocused";
        } else {
            this.state.displayedContactSwitchedNotification.forEach((item) => {
                if (item.notificationId.length > 0) {
                    if (item.notificationId === itemId) {
                        check = true;
                        number = item.number;
                    }
                }
            })
            if (check === true) {
                classname = "viewWrapItemNotification";
            } else {
                classname = "viewWrapItem";
            }
        }
        return classname;

    }
    notificationErase = (itemId) => {
        this.state.displayedContactSwitchedNotification.forEach((el) => {
            if (el.notificationId.length > 0) {
                if (el.notificationId !== itemId) {
                    this.notificationMessageErase.push(
                        {
                            notificationId: el.notificationId,
                            number: el.number,

                        }
                    )
                }
            }
        })
        this.updateRenderList();
    }
    updateRenderList = () => {
        firebase.firestore().collection('users').doc(this.currentUserDocumentId).update(
            { messages: this.notificationMessageErase }
        )
        this.setState({
            displayedContactSwitchedNotification: this.notificationMessageErase
        })
    }

    renderListUser = () => {
        if (this.searchUser.length > 0) {
            let viewListUser = [];
            let classname = "";
            this.searchUser.map((item) => {
                if (item.id !== this.cureentUserId) {
                    classname = this.classnameforUserandNotification(item.id);
                    viewListUser.push(
                        <button key={item.key} className={classname} onClick={() => {
                            this.notificationErase(item.id)
                            this.setState({ currentPeerUser: item })
                        }} >

                            <img
                                className="viewAvatarItem"
                                src={item.URL}
                                alt=""
                            />
                            <div className="viewWrapContentItem">
                                <span className="textItem">
                                    {`Name: ${item.name}`}
                                </span>
                            </div>
                            {classname === "viewWrapItemNotification" ?
                                <div className="notificationparagraph">
                                    <p id={item.key} className="newMessages">
                                        New messages
                                </p>
                                </div> : null}
                        </button>
                    )
                }
            })
            this.setState({
                displayedContacts: viewListUser,
            })
        }
        else {
            console.log("No user is present");
        }
    }
    searchHandler = (event) => {
        let searchQuery = event.target.value.toLowerCase(),
            displayedContacts = this.searchUser.filter((el) => {
                let SearchValue = el.name.toLowerCase();
                return SearchValue.indexOf(searchQuery) !== -1;
            })
        this.displayedContacts = displayedContacts
        this.displaySearchedContacts()
    }
    displaySearchedContacts = () => {
        if (this.searchUser.length > 0) {
            let viewListUser = [];
            let classname = "";
            this.displayedContacts.map((item) => {
                if (item.id !== this.cureentUserId) {
                    classname = this.classnameforUserandNotification(item.id);
                    viewListUser.push(
                        <button key={item.key} className={classname} onClick={() => {
                            this.notificationErase(item.id);
                            this.setState({ currentPeerUser: item });
                            document.getElementById(item.key).style.backgroundColor = "#fff";
                            document.getElementById(item.key).style.color = "#fff";
                        }} >

                            <img
                                className="viewAvatarItem"
                                src={item.URL}
                                alt=""
                            />
                            <div className="viewWrapContentItem">
                                <span className="textItem">
                                    {`Name: ${item.name}`}
                                </span>
                            </div>
                            {classname === "viewWrapItemNotification" ?
                                <div className="notificationparagraph">
                                    <p id={item.key} className="newMessages">
                                        New messages
                                </p>
                                </div> : null}
                        </button>
                    )
                }
            })
            this.setState({
                displayedContacts: viewListUser,
            })
        }
        else {
            console.log("No user is present");
        }
    }
    render() {
        return (
            <div className="root">
                <div className="body">
                    <div className="viewListUser">
                        <div className="profileviewleftside">
                            <img className="ProfilePicture" alt="" src={this.cureentUserPhoto} onClick={this.onProfileClick} />
                            <button className="Logout" onClick={this.logout}>Logout</button>
                        </div>
                        <div className="rootsearchbar">
                            <div className="input-container">
                                <i className="fa fa-search icon"></i>
                                <input className="input-field" type="text" onChange={this.searchHandler} placeholder="Search" />
                            </div>
                        </div>
                        {this.state.displayedContacts}
                    </div>
                    <div className="viewBoard">
                        {this.state.currentPeerUser?(
                            <Chatbot currentPeerUser={this.state.currentPeerUser} showToast={this.state.showToast} />
                        ): (<Welcome currentUserName={this.currentUserName}
                            cureentUserPhoto={this.cureentUserPhoto} />)}
                    </div>
                </div>
            </div>
        )
    }
}