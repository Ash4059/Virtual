import React from 'react';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import Home from "./Pages/Home/Home";
import Chat from "./Pages/Chat/Chat";
import Profile from "./Pages/Profile/Profile";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import { toast, ToastContainer } from "react-toastify";
import "./App.css";
class App extends React.Component {
  showToast = (type, message) => {
    switch (type) {
      case 0:
        toast.warning(message);
        break;
      case 1:
        toast.success(message);
        break;
      default:
        break;
    };
  };
  render() {
    return (
        <Router>
          <ToastContainer
            autoClose={2000}
            hideProgressBar={true}
            position={toast.POSITION.BOTTOM_CENTER}
          />
          <Switch>
            <Route exact path="/" render={props => <Home {...props} />} />

            <Route path="/Login" render={props => <Login showToast={this.showToast}{...props} />} />
            <Route path="/Profile" render={props => <Profile showToast={this.showToast}{...props} />} />
            <Route path="/Signup" render={props => <Signup showToast={this.showToast}{...props} />} />
            <Route path="/Chat" render={props => <Chat showToast={this.showToast}{...props} />} />
          </Switch>
        </Router>
    )
  }
}
export default App;