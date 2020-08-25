import React from 'react';
import "./Profile.css";
import ReactLoading from "react-loading";
import 'react-toastify/dist/ReactToastify.css';
import firebase from "../../services/firebase";
import Image from "../../ProjectImages/ProjectImages";
import Login_string from "../Login/login_string";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
export default class Profile  extends React.Component{
    constructor(props){
        super (props);
        this.state = {
            isLoading: false,
            documentKey:localStorage.getItem(Login_string.FirebaseDocumentId),
            id: localStorage.getItem(Login_string.ID),
            name: localStorage.getItem(Login_string.Name),
            description: localStorage.getItem(Login_string.Description),
            photoUrl:localStorage.getItem(Login_string.Photourl)
        }
        this.newPhoto=null;
        this.newPhotoUrl = "";
    }
    componentDidMount(){
        if(!localStorage.getItem(Login_string.ID)){
            this.props.history.push("/");
        }
    }
    onChangeNickName=(event)=>{
        this.setState({name:event.target.value})
    }
    onChangeAboutMe=(event)=>{
        this.setState({
            aboutMe:event.target.value
        })
    }
    onChangeAvatar=(event)=>{
        if(event.target.files && event.target.files[0]){
            const prefixFiletype=event.target.files[0].type.toString();
            if(prefixFiletype.indexOf(Login_string.PREFIX_IMAGE)!==0){
                this.props.showToast(0,"this file is not an image");
                return;
            }
            this.newPhoto=event.target.files[0];
            this.setState({photoUrl:URL.createObjectURL(event.target.files[0])})
        }else{
            this.props.showToast(0,"something wrong with input files")
        }
    }
    updateAvatar=()=>{
        this.setState({isLoading:true})
        if(this.newPhoto){
            const uploadTask=firebase.storage()
            .ref()
            .child(this.state.id)
            .put(this.newPhoto)
            uploadTask.on(
                Login_string.UPLOAD_CHANGED,
                null,
                err=>{
                    this.props.showToast(0,err.message)
                },
                ()=>{
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL=>{
                        this.updateUserInfo(true,downloadURL)
                    })
                }
            )
        }else{
            this.updateUserInfo(false,null)
        }
    }
    updateUserInfo=(isUpdatedPhotoURL,downloadURL)=>{
        let newinfo;
        if(isUpdatedPhotoURL){
            newinfo={
                name:this.state.name,
                description:this.state.aboutMe,
                URL:downloadURL
            }
            
        }else{
            newinfo={
                name:this.state.name,
                description:this.state.aboutMe,
            }
        }
        firebase.firestore().collection('users')
        .doc(this.state.documentKey)
        .update(newinfo)
        .then(()=>{
            localStorage.setItem(Login_string.Name,this.state.name)
            localStorage.setItem(Login_string.Description,this.state.description)
            if(isUpdatedPhotoURL){
                localStorage.setItem(Login_string.Photourl,downloadURL)
            }
            this.setState({isLoading:false})
            this.props.showToast(1,'Update info success');
        })
    }
    render(){
        return(
            <div className="profileroot">
                <div className="headerprofile">
                    <span>Profile</span>
                </div>
                <img className="avatar" alt="" src={this.state.photoUrl} />
                <div className="viewWrapInputFile">
                    <AddAPhotoIcon className="imgInputFile" alt="icon gallery" src={Image.choosefile} 
                    onClick={()=>{
                        this.refInput.click()}} />
                    <input ref={el=>{
                        this.refInput=el;
                    }} accept="image/*" className="viewInputFile" type="file" onChange={this.onChangeAvatar} />
                </div>
                <span className="textLabel">Name</span>
                <input className="textinput" value={this.state.name ? this.state.name:" "} placeholder="Your nickname..."
                onChange={this.onChangeNickName} />
                <span className="textLabel">About Me</span>
                <input 
                className="textInput"
                value={this.state.aboutMe ? this.state.aboutMe:""}
                placeholder="Tell about yourself"
                onChange={this.onChangeAboutMe}
                />
                <div>
                    <button className="btnUpdate" onClick={this.updateAvatar}>SAVE</button>
                    <button className="btnback" onClick={()=>{
                        this.props.history.push("/Chat")
                    }}>Back</button>
                </div>
                {this.state.isLoading?(
                    <div>
                        <ReactLoading type={'spin'} color="#203152" height={'3%'} width={'3%'} />
                    </div>
                ):null}
            </div>
        )
    }
}