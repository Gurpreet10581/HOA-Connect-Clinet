import React, { Component } from 'react';
import { Route, Switch,BrowserRouter as Router } from "react-router-dom";
import CreateProfile from '../Profile/CreateProfile';
import CreatePost from '../Post/CreatePost';
import CreateResponse from '../Response/CreateResponse';

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
                    <h1> HomePage</h1>
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

