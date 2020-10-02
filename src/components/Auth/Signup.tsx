import React, {Component} from 'react';
import APIURL from '../Helpers/environment';
import './Auth.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

type acceptedProps = {
    updateToken: any,
    updateLog: any
  }

type state ={
    firstName: string;
    Alert1: string;
    lastName: string;
    Alert2: string;
    email: string;
    Alert3: string;
    password: string;
    Alert4: string;
    admin: boolean;
}

export default class Signup extends Component <acceptedProps, state>{
    constructor (props: acceptedProps){
        super(props)
        this.state= {
            firstName: '',
            Alert1: '',
            lastName: '',
            Alert2: '',
            email: '',
            Alert3: '',
            password: '',
            Alert4: '',
            admin: false,
        }
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        if (!this.state.firstName) {
          this.setState({ Alert1: "Enter First Name" });
        }
        else {
          this.setState({ Alert1: "" });
          if (!this.state.lastName) {
            this.setState({ Alert2: "Enter Last Name" });
          }
          else {
            this.setState({ Alert2: "" })
            if (!this.state.email) {
              this.setState({ Alert3: "Enter Email" });
            }
            else {
              this.setState({ Alert1: "" });
              if (!this.state.lastName) {
                this.setState({ Alert2: "Enter Last Name" });
              }
              else {
                this.setState({ Alert2: "" })
                if (!this.state.email) {
                  this.setState({ Alert3: "Enter Email!" });
                }
                else {
                  this.setState({ Alert3: "" });
                  if (!this.state.password) {
                    this.setState({ Alert4: "Enter Password!" });
                  }
                  else {
                    this.setState({ Alert4: "" });
                    fetch(`${APIURL}/user/signup`, {
                      method: "POST",
                      body: JSON.stringify({
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        email: this.state.email,
                        password: this.state.password
                      }),
                      headers: new Headers({
                        "Content-Type": "application/json"
                      })
                    })
                      .then(data => data.json())
                      .then(json => {
                        this.props.updateToken(json.sessionToken, this.state.admin, json.data.firstName,json.data.id);
                        this.props.updateLog("LogOut");
                      })
                  }
                }
              }
            }
          }
        }
    }
    componentDidMount = () => {
        this.props.updateLog("LogIn");
    }

    render() {
        return (
          <Grid container component="main" className='root'>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className='image' />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <div className='paper'>
                <Avatar className='avatar'>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign Up
              </Typography>
                <form className='form' noValidate onSubmit={this.handleSubmit}>
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
                    //onChange = {e=>this.setState({firstName:e.target.value})}
                    onChange={e => {
                      this.setState({ firstName: e.target.value })
                    }}
                  />
                  {this.state.Alert1}<br />
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
                  {this.state.Alert2}<br />
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
                  {this.state.Alert3}<br />
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
                  {this.state.Alert4}<br />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className='submit'
                  >
                    Sign Up
                </Button>
                  <Grid container>
                    <Grid item className='Signin'>
                      <span style={{ color: "black" }}> Already have an account? </span>
                      <Link href="Signin" variant="body2">
                        {"Signin"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Grid>
          </Grid>
        );
      }
}
