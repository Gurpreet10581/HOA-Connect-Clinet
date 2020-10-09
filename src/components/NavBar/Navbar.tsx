import React, { Component } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
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




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

type NavProps = {
  updateToken: (newToken: string) => void,
  clearToken: () => void,
  sessionToken: string | null,
  admin: boolean;



};

export default class Navbar extends Component<NavProps, {}> {
 constructor(props: NavProps) {
    super(props);
    this.state = {};
    // console.log(props);
  }
    render(){

      return (
        <div className="navDiv">
          <h1 className="glow"> HOA Connect</h1>
            <AppBarStyles position="fixed">

              <Toolbar>
                <Link to='/profilePage'><Button >Profile</Button></Link>
                <Link to='/postPage'><Button >Posts</Button></Link>
                <Link to='/responsePage'><Button >Responses</Button></Link>
                <Link to='/'><Button onClick={this.props.clearToken}>Sign Out</Button></Link>
              </Toolbar>
               
            </AppBarStyles>
          <div>
            <Switch>
                {/* <Route exact path="/signup"><Signup updateToken={this.props.updateToken} /></Route>
                <Route exact path="/signin"><Signin admin={this.props.admin} updateToken={this.props.updateToken}  /></Route>
                <Route exact path='/auth'>
                  <Auth updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} admin={this.props.admin}  />
                </Route> */}
                <Route exact path='/profilePage'>
                  <ProfilePage updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} />
                </Route> <Route exact path='/postPage'>
                  <PostPage updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} />
                </Route> <Route exact path='/responsePage'>
                  <ResponsePage updateToken={this.props.updateToken}sessionToken={this.props.sessionToken}  />
                  
                </Route>
            </Switch>
          </div>
      </div>
    );
  }
}