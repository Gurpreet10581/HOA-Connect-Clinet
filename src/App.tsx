import React from 'react';
import './App.css';
import Auth from "./components/Auth/Auth"
import {User} from './components/Helpers/Interfaces';
import {Admin} from './components/Auth/Admin';
import {HomePage} from './components/HomePage/HomePage'


type Props= {
  updateToken: (token: string) => void;
  setAdmin: (user: User) => void;
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
  setAdmin =(user: User) =>{
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
        <h1>App Page</h1>
        {localStorage.getItem("token") === null ?
      <Auth updateToken={this.updateToken} admin={this.setAdmin} />:
      <HomePage clearToken={this.clearToken} updateToken= {this.state.sessionToken}  />
      }
      </div>
      </div>
      );
  }
}

export default App;
