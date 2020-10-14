import React, { Component } from 'react';
import APIURL from '../Helpers/environment';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import './Auth.css';

type acceptedProps ={
    updateToken: any ;
    admin:boolean;
}

type State ={
    email: string;
    setEmail: string;
    password: string;
    setPassword:string;
}

export default class Signin extends Component <acceptedProps, State>{
    constructor(props: acceptedProps){
        super(props);
        this.state ={
            email: "",
            setEmail: "",
            password: "",
            setPassword: "",
        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        fetch(`${APIURL}/user/signin`,{
            method: "POST",
            body: JSON.stringify({
                user:{

                    email: this.state.email,
                    password: this.state.password,
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json",
            }), 
        })
        .then((response) => response.json())
        .then((data) => { console.log(data);
            this.props.updateToken(data.sessionToken);//to pass string not object
            console.log(`You are now Signed In!`);
           
        })
        .catch(err => err.status(500).json({error: err}))

    };
    render(){
        return(
                <Grid container component="main" className='root'>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className='image' />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className='paper'>
                    <Avatar className='avatar'>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Login
                    </Typography>
                    <form className='form' noValidate onSubmit = {this.handleSubmit}>
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
                        value = {this.state.email}
                        onChange = {e=>this.setState({email:e.target.value})}
                    />
                    {this.state.setEmail}
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
                        value = {this.state.password}
                        InputProps={{
                            inputProps: { 
                                max: 16, min: 5
                            }
                        }}
                        title="Password must be at least 5 characters"
                        onChange = {e=>this.setState({password:e.target.value})}
                    />
                    {this.state.setPassword}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className='submit'
                        onClick={event => { this.handleSubmit(event) }}
                    >
                        SignIn
                    </Button>
                    <Grid container>
                        <Grid item className='Signin'>
                        <span style = {{color:"black"}}> SignUp if you don't have an account yet? </span>
                        <Link to="/signup" >
                        {"Click here to sign up "}
                        </Link>
                        </Grid>
                    </Grid>
                    </form>
                </div>
                </Grid>
            </Grid>
        )
    }
}
