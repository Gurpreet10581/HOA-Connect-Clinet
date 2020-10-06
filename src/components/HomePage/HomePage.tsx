import React, { Component } from 'react';
import { Route, Switch,BrowserRouter as Router } from "react-router-dom";
import CreatePost from '../Post/CreatePost';
import PostPage from '../Post/PostPage';
import CreateProfile from '../Profile/CreateProfile';
import ProfilePage from '../Profile/ProfilePage';
import CreateResponse from '../Response/CreateResponse';
import ResponsePage from '../Response/ResponsePage';

type HomeData={

}

type propsData = {
    clearToken: () => void,
    updateToken: string | null,
}

export class HomePage extends Component<propsData, HomeData> {
    constructor(props: propsData) {
        super(props)
    }

    render() {
        return (

                <div>
                    <h1 style={{color:"red"}}>Welcome to HOA Connect</h1>
                    <ProfilePage updateToken={this.props.updateToken}  />
                    <br />
                    <CreateProfile updateToken={this.props.updateToken}  />
                    <br />
                    <PostPage updateToken={this.props.updateToken} />
                    <br />
                    <CreatePost updateToken={this.props.updateToken} />
                    <br />
                    {/* <ResponsePage updateToken={this.props.updateToken} />
                    <br />
                    <CreateResponse updateToken={this.props.updateToken} />
                    <br /> */}
                </div>
                // <Router>
                //  <nav id="navbar">
                //  <ul>
                //      <li id="name"><a href="#" className="nav-link">HOA Connect</a></li>
                //      <li><a onClick={this.props.clearToken} className="nav-link">Logout</a></li>
                //      <li><a href="#" className="nav-link">My Profile</a></li>
                //      {/* <li><Link to = "/profile" className="nav-link"> Profile </Link></li>
                //      <li><Link to = "/post" className="nav-link"> Post </Link> </li>
                //      <li><Link to = "/response" className="nav-link"> Response </Link> </li> */}
                //  </ul>
                // </nav>
                // <div className="navbarRoute">
                //     <Switch>
                //         <Route exact path="/"><CreateProfile updateToken={this.props.updateToken} /></Route>
                //         <Route exact path="/post"><CreatePost updateToken={this.props.updateToken}/></Route>
                //         <Route exact path="/response"><CreateResponse updateToken={this.props.updateToken}/></Route>

                //     </Switch>
                // </div>
                // </Router>
        )
    }
}

export default HomePage;

