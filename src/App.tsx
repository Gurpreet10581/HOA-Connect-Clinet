import React from 'react';
import logo from './logo.svg';
import './App.css';
import Auth from "./components/Auth/Auth"

type sessionData ={
  sessionToken: string | null;
  role: string
}
class App extends React.Component<{},sessionData>{
  constructor(props: {}){
    super(props);
    this.state= {
      sessionToken: "",
      role: "User"

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
      <Auth updateToken={this.updateToken}
      />
      </div>
      </div>
      );
  }
}

export default App;
