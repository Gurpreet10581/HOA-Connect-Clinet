import React, { Component } from "react";
import HomePage from '../HomePage/HomePage'
import PostPage from '../Post/PostPage'
import ProfilePage from '../Profile/ProfilePage'
import ResponsePage from '../Response/ResponsePage'
import { Route, Switch,BrowserRouter as Router } from "react-router-dom";
import Landing from "../Auth/Landing";



type routerState = {

}
type propsData = {
    // updateToken: string | null,
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
    clearToken: () => void,
    admin: boolean;

}

class Routes extends Component<propsData, routerState> {

  

    render() {
        return (

            <div>
                <Switch>
                    
                    <Route exact path="/auth"><HomePage updateToken={this.props.updateToken}  clearToken={this.props.clearToken} sessionToken={this.props.sessionToken} admin={this.props.admin}  /></Route>
                    <Route exact path="/profilePage"><ProfilePage updateToken={this.props.updateToken } sessionToken={this.props.sessionToken} /></Route>
                    <Route exact path="/postPage"><PostPage updateToken={this.props.updateToken } sessionToken={this.props.sessionToken} /></Route>
                    <Route path="/responsePage/:id" component={(props: any) => <ResponsePage  updateToken={this.props.updateToken } sessionToken={this.props.sessionToken} {...props} />}></Route>
                    <Route exact path= "/landing"><Landing  /></Route>

                </Switch>
            </div>
        )
    }
}
export default Routes;