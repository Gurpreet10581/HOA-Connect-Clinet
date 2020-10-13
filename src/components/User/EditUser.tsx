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
            userName: 'Enter an User Name'
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
            <Grid container component="main" className='root'>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className='image' />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <div className='paper'>
                
                <Typography component="h1" variant="h5">
                  User Edit
              </Typography>
                <form className='form' noValidate onSubmit={this.editUser}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="First Name"
                    autoFocus
                    value={this.state.firstName}
                    onChange={e => {
                      this.setState({ firstName: e.target.value })
                    }}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="Last Name"
                    autoFocus
                    value={this.state.lastName}
                    onChange={e => this.setState({ lastName: e.target.value })}
                  />
                    <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    name="userName"
                    autoComplete="User Name"
                    autoFocus
                    value={this.state.userName}
                    onChange={e => this.setState({ userName: e.target.value })}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="off"
                    InputProps={{
                        inputProps: { 
                            max: 16, min: 5
                        }
                    }}
                    title="Password must be at least 5 characters"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className='submit'
                  >
                    Edit User
                </Button>
                </form>
              </div>
            </Grid>
          </Grid>
        )
    }

}

export default EditUser;
