import React, { Component } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBarStyles from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button} from '@material-ui/core';
import { Route, Switch,Link } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import ProfilePage from "../Profile/ProfilePage";
import PostPage from "../Post/PostPage";
import ResponsePage from "../Response/ResponsePage";




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
            <AppBarStyles position="fixed">

              <Toolbar>
              
                {/* <Link to='/'><Button >Home</Button></Link> */}
                <Link to='/profilePage'><Button >Profile</Button></Link>
                <Link to='/postPage'><Button >Posts</Button></Link>
                <Link to='/responsePage'><Button >Responses</Button></Link>
                {/* <Link to='/auth'><Button >Sign Out</Button></Link> */}

                <Button onClick={this.props.clearToken}>
                  Logout
                </Button>

              </Toolbar>
                  {/* <Button style={{ marginRight: "5em" }} onClick={this.props.clearToken}>
                  Home
                </Button> */}
            </AppBarStyles>
          <div>
            <Switch>
                {/* <Route exact path='/homePage'>
                  <HomePage updateToken={this.props.updateToken} clearToken={this.props.clearToken} sessionToken={this.props.sessionToken} />
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