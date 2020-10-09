import { Button } from '@material-ui/core';
import React, { Component } from 'react';
import CreatePost from '../Post/CreatePost';
import PostPage from '../Post/PostPage';
import CreateProfile from '../Profile/CreateProfile';
import ProfilePage from '../Profile/ProfilePage';
import CreateResponse from '../Response/CreateResponse';
import ResponsePage from '../Response/ResponsePage';
import Navbar from '../NavBar/Navbar';

type HomeData={

}

type propsData = {
    clearToken: () => void,
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
    admin: boolean ;
    
}

export class HomePage extends Component<propsData, HomeData> {
    constructor(props: propsData) {
        super(props)
    }
    
    render() {
        return (

                <div>
                    <Button style={{float:"right", marginRight:"5em", color: "#e8af04", fontFamily: "cursive", borderColor:"#e8af04"}}
                     type="submit"
                     variant="outlined"
                     color="primary"
                     className='submit'
                    onClick={this.props.clearToken} >Sign Out</Button>
                    
                    <Navbar clearToken={this.props.clearToken} updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} admin={this.props.admin}  />
                    <br />
                    <br />
                    {/* <CreateProfile sessionToken={this.props.sessionToken} updateToken={this.props.updateToken}  />
                    <br />
                    <CreatePost sessionToken={this.props.sessionToken} updateToken={this.props.updateToken} />
                    <br />
                    <CreateResponse sessionToken={this.props.sessionToken} updateToken={this.props.updateToken} />
                    <br />
                    <ProfilePage sessionToken={this.props.sessionToken} updateToken={this.props.updateToken}  />
                    <br />
                    <PostPage sessionToken={this.props.sessionToken} updateToken={this.props.updateToken} />
                    <br />
                    <ResponsePage sessionToken={this.props.sessionToken}updateToken={this.props.updateToken} /> */}
                </div>
                // <Router>
                //  <nav id="navbar">
                //  <ul>
                //      <li id="name"><a href="#" className="nav-link">HOA Connect</a></li>
                //      <li><a href="#" className="nav-link"><ProfilePage updateToken={this.props.updateToken}/></a></li>
                //      <li><a onClick={this.props.clearToken} className="nav-link">Logout</a></li>
                //      <li><Link to = "/profile" className="nav-link"> Profile </Link></li>
                //      <li><Link to = "/post" className="nav-link"> Post </Link> </li>
                //      <li><Link to = "/response" className="nav-link"> Response </Link> </li>
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

