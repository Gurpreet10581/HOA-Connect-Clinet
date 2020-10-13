import React from 'react';
import './App.css';
import Auth from "./components/Auth/Auth"
import {UserData} from './components/Helpers/Interfaces';
import Navbar from './components/NavBar/Navbar';
import { BrowserRouter as Router } from "react-router-dom";
import Footer from './components/HomePage/Footer';




type Props= {
  updateToken: (token: string) => void;
  setAdmin: (user: UserData) => void;
  clearToken: () => void,

}
type sessionData ={
  sessionToken: string | null;
  admin: boolean;

}


class App extends React.Component<{},sessionData>{
  constructor(props: {}){
    super(props);
    this.state= {
      sessionToken: localStorage.getItem('token')? localStorage.getItem('token'):  "",
      admin: false,
    }
  }

  componentDidMount(){
    if(localStorage.getItem('token')){
      this.setState({
        sessionToken: localStorage.getItem('token')
      })
    }
  }
  updateToken =(newToken: string) => {
    localStorage.setItem('token',newToken);
    this.setState({
      sessionToken: newToken
      
    })
  }
  setAdmin =(user: UserData) =>{
    this.setState({
      admin: user.admin
    })
  }
 
  clearToken = () => {
    localStorage.clear();
    this.setState({
      sessionToken: ''
    })
  }
  render(){
    return (
      <div className="App">
      <div className="mainApp">
        {/* <h1> Welcome to HOA Connect </h1> */}
        
        {localStorage.getItem("token") === null ?
      <Auth updateToken={this.updateToken} admin={this.state.admin} sessionToken={this.state.sessionToken}  />:
      <Router>

        <Navbar clearToken={this.clearToken} updateToken={this.updateToken} sessionToken={this.state.sessionToken}  admin={this.state.admin}    />
      </Router>
      }
      <Footer />
      </div>
      </div>



      );
  }
}

export default App;
