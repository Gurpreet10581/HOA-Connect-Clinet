import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import APIURL from '../Helpers/environment';
// import {user} from '../Helpers/Interfaces';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


type acceptedProps ={
    // updateToken: string | null;
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
}

type userState={
    user: any,
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    admin: boolean ;
    userName: string;
}

class EditUser extends Component<acceptedProps, userState> {
    constructor(props: acceptedProps){
        super(props);
        // console.log(props)
        this.state= {
          
            user: {},
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            admin: false,
            userName: ''
      }
    }
    
    editUser =(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

            if(this.props.sessionToken !== null ){
            let id:number =1;//////////////////////// not sure if I need this line
            fetch(`${APIURL}/user/editUser/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    user:{
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        email: this.state.email,
                        password: this.state.password,
                        userName: this.state.userName,
                        admin:this.state.admin
                        }
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization:this.props.sessionToken
                },
                
            })
            .then(res => res.json())
            .then((data) => {
                console.log('Data', data)
            })
            .catch((err) => console.log(err));
        }
        
    }

    render(){
        return(
          <div>
                <h1> Edit User</h1>
            <form onSubmit={user =>{this.editUser(user)}}>
              <TextField
                label="First Name"
                type="text"
                multiline
                value={this.state.firstName}
                onChange={(e) =>
                  this.setState({ ...this.state, firstName: e.target.value })
                }
              />
              <TextField
                label="Last Name"
                type="text"
                multiline
                value={this.state.lastName}
                onChange={(e) =>
                  this.setState({ ...this.state, lastName: e.target.value })
                }
              />
                <TextField
                label="Email"
                type="text"
                multiline
                value={this.state.email}
                onChange={(e) =>
                  this.setState({ ...this.state, email: e.target.value })
                }
              />
                <TextField
                label="User Name"
                type="text"
                multiline
                value={this.state.userName}
                onChange={(e) =>
                  this.setState({ ...this.state, userName: e.target.value })
                }
              />
                {/* <TextField
                label="Address"
                type="text"
                multiline
                value={this.state.admin}
                onChange={(e) =>
                  this.setState({ ...this.state, admin: e.target.value })
                }
              /> */}
              <br /> <br />
              <Button
                size="small"
                variant="outlined"
                type="submit"
                value="Create"
                data-test="submit"
                
              >
                Edit User
              </Button>
            </form>
          </div>
        )
    }

}

export default EditUser;
