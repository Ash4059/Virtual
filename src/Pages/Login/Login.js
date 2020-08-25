import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../services/firebase";
import Login_string from "./login_string";
import "./Login.css";
import Card from "react-bootstrap/Card";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlined from "@material-ui/icons/LockOpenOutlined";
import Typography from "@material-ui/core/Typography";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            email: "",
            password: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({
            [event.target.id]:event.target.value,
        });
    }
    componentDidMount(){
        if(localStorage.getItem(Login_string.ID)){
            this.setState({
                isLoading:false,
            },()=>{
                this.setState({isLoading:false})
                this.props.showToast(1,'Login success')
                this.props.history.push('/Chat')
            })
        }
        else{
            this.setState({isLoading:false})
        }
    }
    async handleSubmit(event){
        event.preventDefault();
        await firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(async result=>{
            let user=result.user;
            if(user){
                await firebase.firestore().collection('users')
                .where('id',"==",user.uid)
                .get()
                .then(function(querySnapshot){
                    querySnapshot.forEach(function(doc){
                        const currentData=doc.data();
                        localStorage.setItem(Login_string.FirebaseDocumentId,doc.id);
                        localStorage.setItem(Login_string.ID,currentData.id);
                        localStorage.setItem(Login_string.Name,currentData.Name);
                        localStorage.setItem(Login_string.Email,currentData.email);
                        localStorage.setItem(Login_string.Password,currentData.password);
                        localStorage.setItem(Login_string.Photourl,currentData.URL);
                        localStorage.setItem(Login_string.Description,currentData.description);
                    })
                })
                
            }
            this.props.history.push("/Chat");
        })
        .catch(function(error){
            alert("Incorrect Email Id/Password or poor internet connection");
        })
    }
    render() {
        const paper = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft: '10px',
            paddingRight: '10px',
        }
        const rightcomponent = {
            boxShadow: "0 80px 80px #808888",
            backgroundColor: "smokegrey",
        }
        const root = {
            height: "100vh",
            background: "linear-gradient(90deg, #e3ffe7 0%,#d9e7ff 100%)",
            marginBottom: "50px",
        }
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
        const form = {
            width: '100%',
            marginTop: '50px',


        }
        const avatar = {

            backgroundColor: 'green',
        }
        return (
            <>
                <Grid container component="main" style={root}>
                    <CssBaseline />
                    <Grid item xs={1} sm={4} md={7} className="image">
                        <div className="image1"></div>
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} style={rightcomponent} elevation={6} >
                        <Card style={Signinsee}>
                            <div>
                                <Avatar style={avatar}>
                                    <LockOutlined width="50px" height="50px" />
                                </Avatar>
                            </div>
                            <div>
                            <Typography component="h1" variant="h5">
                            Sign in
                            To
                        </Typography>

                            </div>
                            <div>
                                <Link to="/">
                                    <button className="btn">
                                        <i className="fa fa-home"></i>
                                        Webchat
                                    </button>
                                </Link>
                            </div>
                        </Card>
                        <div style={paper}>
                            <form style={form} noValidate onSubmit={this.handleSubmit}>
                                <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email address"
                                    autoComplete="email" autoFocus onChange={this.handleChange} value={this.state.email} />
                                <p style={{ color: 'grey', fontSize: '15px', marginLeft: 0 }}>Enter the correct password</p>
                                <TextField variant="outlined" margin="normal" required fullWidth id="password" label="Password"
                                    autoComplete="current-password" autoFocus onChange={this.handleChange} value={this.state.password} type="password" />
                                <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember Me"  />
                                <Typography component="h6" variant="h5">
                                    {this.state.error?(
                                        <p className="text-danger">{this.state.error}</p>
                                    ):null}
                                </Typography>
                                <div className="CenterAliningItems">
                                    <button className="button1" type="submit">
                                        <span>Logging In</span>
                                    </button>
                                </div>
                                <div className="CenterAliningItems">
                                    <p>Didn't have an account </p>
                                    <Link to="/Signup" variant="body2">Sign up</Link>
                                </div>
                                <div className="error">
                                    <p style={{color:"red"}}></p>
                                </div>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    }
}