import React, { Component } from "react";
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import APIURL from '../Helpers/environment';
import AppBarStyles from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button} from '@material-ui/core';
import { Route, Switch,Link, BrowserRouter as Router } from "react-router-dom";
// import HomePage from "../HomePage/HomePage";
import ProfilePage from "../Profile/ProfilePage";
import PostPage from "../Post/PostPage";
import ResponsePage from "../Response/ResponsePage";
// import Auth from '../Auth/Auth'
// import Signup from "../Auth/Signup";
// import Signin from "../Auth/Signin";
import './NavBar.css';
import Landing from "../Auth/Landing";




// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//     title: {
//       flexGrow: 1,
//     },
//   })
// );

type NavProps = {
  updateToken: (newToken: string) => void,
  clearToken: () => void,
  sessionToken: string | null,
  admin: boolean;



};

type StateItems = {
  isProfileDone: boolean
}

export default class Navbar extends Component<NavProps, StateItems> {
 constructor(props: NavProps) {
    super(props);
    this.state = {
      isProfileDone: false
    };
    // console.log(props);
  }

  fetchProfile = () => {
    const url = `${APIURL}/profile/`;
  
    if(this.props.sessionToken){

        return fetch(url, {
            method: 'GET',
            headers:  {
                "Content-Type": "application/json",
                Authorization: this.props.sessionToken,
            },
        })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((err) => console.log(err));
    } else {
      return new Promise((r, rj) => {
        r(null);
      } )
    }
  
  }

  async componentDidMount() {
    let isProfileDone = await this.fetchProfile();
    if(isProfileDone === null) {
      this.setState({isProfileDone: false})
    } else {
      this.setState({isProfileDone: true})
    }
  }

    render(){

      return (
        <div className="navDiv">
          <h1 className="glow"> HOA Connect</h1>
            <AppBarStyles position="fixed" style={{ background: '#e0dde0', boxShadow:"black" }}>

              <Toolbar style={{fontFamily:"monospace"}}>
                <Link to='/landing' style={{ textDecoration: 'none', border:"solid black 1px",borderRadius:"10px" }}><Button >Home</Button></Link>
                <Link to='/profilePage' style={{ textDecoration: 'none' }}><Button >Profile</Button></Link>
                {this.state.isProfileDone ? 
                  <>
                  <Link to='/postPage' style={{ textDecoration: 'none' }}><Button >Posts</Button></Link>
                  </>
                : null}
                
                {/*<Link to='/responsePage'><Button >Responses</Button></Link>*/}
                <Link to='/' style={{ textDecoration: 'none' }}><Button onClick={this.props.clearToken}>Sign Out</Button></Link>

              </Toolbar>
               
            </AppBarStyles>
          <div>
            <Switch >
                {/* <Route exact path="/signup"><Signup updateToken={this.props.updateToken} /></Route>
                <Route exact path="/signin"><Signin admin={this.props.admin} updateToken={this.props.updateToken}  /></Route>
                <Route exact path='/auth'>
                  <Auth updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} admin={this.props.admin}  />
                </Route> */}
                <Route exact path='/profilePage'>
                  <ProfilePage updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} />
                </Route> 
                <Route exact path='/postPage'>
                  <PostPage updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} />
                </Route> 
                <Route path="/responsePage/:id" component={(props: any) => <ResponsePage  updateToken={this.props.updateToken } sessionToken={this.props.sessionToken} {...props} />}></Route>
                <Landing updateToken={this.props.updateToken } sessionToken={this.props.sessionToken} />
                  
            </Switch>
          </div>
      </div>
    );
  }
}