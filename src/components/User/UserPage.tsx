import React, { Component } from 'react';
import APIURL from '../Helpers/environment';
import {UserData} from '../Helpers/Interfaces';
import Button from "@material-ui/core/Button";
import SignUp from '../Auth/Signup';
// import EditProfile from './EditProfile';
// import DeleteProfile from './DeleteProfile';
import { Grid } from '@material-ui/core';




type userData={
    user: [UserData | null];
}

type propsData = {
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
}



export default class userPage extends Component <propsData, userData>{
    constructor(props: propsData){
        super(props);
        this.state ={
            user: [null]

        }
    }
    componentDidMount() {
        this.fetchUser();
    }
    fetchUser = () => {
        const url = `${APIURL}/user/`;
      
        if(this.props.sessionToken){

            fetch(url, {
                method: 'GET',
                headers:  {
                    "Content-Type": "application/json",
                    Authorization: this.props.sessionToken,
                },
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data == null){
                    console.log('no results')
                    this.setState(data.user.firstName, data.user.lastName, /*data.user.email, data.user.password, data.user.admin, data.user.userName*/)
    // not sure if all the properties need to be included in above line 52
                }
            })
            .catch((err) => console.log(err));
        } 
      
    }
    myuserHandler = (event: any)=> {
        this.setState({user: event.target.value})
    }

    handleDelete = (id: number | undefined) => {
        if (this.props.sessionToken) {
            fetch(`${APIURL}/user/${id}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': this.props.sessionToken
                }),
            })
                .then((res) => {
                    this.fetchUser()
                })
                .catch((err) => alert(err));
        }
    }
    componentDidUpdate(){
        // console.log("UPDATE");
    }
    render( ){
        return(
            <div className="main" style={{marginTop:"5em"}}>
                <form>
                   
                    <Grid container direction="row" justify="space-around" alignItems="center" spacing={3}>
                        <Grid container direction="row" justify="space-around" alignItems="center" spacing={3}>
                            <Grid item>
                                <SignUp updateToken={this.props.updateToken}  />
                            </Grid> 
                            {/* <Grid item>
                                <Edituser updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} />
                            </Grid> <br /> <br />
                            <Grid item>
                                <Deleteuser updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} />
                            </Grid> */}
                        </Grid>
                    </Grid><br /> <br />  <hr />
                    <div style={{textAlign:"center"}}>

                    <Button onClick={this.fetchUser}
                    size="small"
                    variant="outlined"
                    type="submit"
                    value="Get"
                    data-test="submit"
                    >
                    Get Your user
                     </Button>
                    </div>
                    <hr />
                </form>
            </div>
        )
    }
}

