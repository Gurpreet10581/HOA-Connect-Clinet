import React from "react";
import { Route, Switch,BrowserRouter as Router } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";

type Props = {
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
    admin: boolean ;
}
const Auth: React.FC<Props> = (props: Props) => {
    return (
        <Router>
            <Switch>
                <Route exact path="/"><Signup updateToken={props.updateToken}  /></Route>
                <Route exact path="/signup"><Signup updateToken={props.updateToken} /></Route>
                <Route exact path="/signin"><Signin admin={props.admin} updateToken={props.updateToken}  /></Route>
            </Switch>
        </Router>
    )
}
export default Auth;