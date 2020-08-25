import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import "./Signup.css";
import firebase from "../../services/firebase";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Card from "react-bootstrap/Card";
import Login_string from "../Login/login_string";
import Typography from '@material-ui/core/Typography';
export default class Signup extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            name: "",
            error: null,
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({
            [event.target.id]:event.target.value,
        });
    }
    async handleSubmit(event){
        const {email,password,name}=this.state;
        event.preventDefault();
        try{
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(async result=>{
                firebase.firestore().collection('users')
                .add({
                    name,
                    id:result.user.uid,
                    email,
                    password,
                    URL:'',
                    description:'',
                    messages:[{notificationId:'',number:0}]
                }).then((docRef)=>{
                    localStorage.setItem(Login_string.ID,result.user.uid);
                    localStorage.setItem(Login_string.Name,name);
                    localStorage.setItem(Login_string.Email,email);
                    localStorage.setItem(Login_string.Password,password);
                    localStorage.setItem(Login_string.Photourl,"");
                    localStorage.setItem(Login_string.UPLOAD_CHANGED,'state_changed');
                    localStorage.setItem(Login_string.Description,"");
                    localStorage.setItem(Login_string.FirebaseDocumentId,docRef.id);
                    this.setState({
                        name:'',
                        password:"",
                        URL:'',
                    });
                    this.props.history.push("/Chat");
                })
                .catch((error)=>{
                    console.error("Error adding document",error);
                })
            })
        }
        catch(error){
            document.getElementById('1').innerHTML=error.message;
        }
    }
    render() {
        const Signinsee = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white',
            backgroundColor: '#lebea5',
            width: '100%',
            boxShadow: '0px 5px 5px #80888',
            height: "10rem",
            paddingTop: '48px',
            opacity: "0.5",
            borderBottom: '5px solid green',
        }
        return (
            <>
                <CssBaseline />
                <Card style={Signinsee}>
                    <div>
                        <Typography component="h1" variant="h5">
                            Sign up
                            To
                        </Typography>
                    </div>
                    <div>
                        <Link to="/">
                            <button className="btn"><i className="fa fa-home"></i>WebChat</button>
                        </Link>
                    </div>
                </Card>
                <Card className="formacontrooutside">
                    <form className="customform" noValidate onSubmit={this.handleSubmit}>
                    <TextField variant="outlined" margin="normal" required fullWidth id="name" label="Your name:abc"
                        autoComplete="name" autoFocus onChange={this.handleChange} value={this.state.name} />
                        <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email address-example:abc@gmail.com"
                            autoComplete="email" autoFocus onChange={this.handleChange} value={this.state.email} />
                        <p style={{ color: 'grey', fontSize: '15px', marginLeft: 0 }}>password length greater than 6(alphabet,numerical)</p>
                        <TextField variant="outlined" margin="normal" required fullWidth id="password" label="Password"
                            autoComplete="current-password" autoFocus onChange={this.handleChange} value={this.state.password} type="password" />
                        
                        <p style={{ color: 'grey', fontSize: '15px'}}>please fill all details carefully</p>
                        <div className="CenterAliningItems">
                            <button className="button1" type="submit">
                                <span>Signup</span>
                            </button>
                        </div>
                        <div>
                            <p style={{color:'grey'}}>Already have an account??</p>
                            <Link to="/Login">Login</Link>
                        </div>
                    </form>
                </Card>
            </>
        )
    }
};