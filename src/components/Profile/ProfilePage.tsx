import React, { Component } from 'react';
import APIURL from '../Helpers/environment';
import {Profile} from '../Helpers/Interfaces';
import Button from "@material-ui/core/Button";
import CreateProfile from './CreateProfile';
import EditProfile from './EditProfile';
import DeleteProfile from './DeleteProfile';
import { Grid } from '@material-ui/core';




type profileData={
    profile: [Profile | null];
}

type propsData = {
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
}



export default class ProfilePage extends Component <propsData, profileData>{
    constructor(props: propsData){
        super(props);
        this.state ={
            profile: [null]

        }
    }
    fetchProfile = () => {
        const url = `${APIURL}/profile/`;
      
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
                    this.setState(data.Profile.address, data.Profile.about)
                }
            })
            .catch((err) => console.log(err));
        } 
      
    }
    myProfileHandler = (event: any)=> {
        this.setState({profile: event.target.value})
    }

    componentDidMount() {
        this.fetchProfile();
    }

    componentDidUpdate(){
        // console.log("UPDATE");
    }
    render( ){
        return(
            <div className="main" style={{marginTop:"5em"}}>
                <form>
                    <Button onClick={this.fetchProfile}
                    size="small"
                    variant="outlined"
                    type="submit"
                    value="Get"
                    data-test="submit"
                    >
                    Get Your Profile
                     </Button>
                    <br />
                    <Grid container direction="row" justify="space-around" alignItems="center" spacing={3}>
                        
                        
                        <Grid container direction="row" justify="space-around" alignItems="center" spacing={3}>
                            <Grid item>
                                <CreateProfile updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} />
                            </Grid> <br /> <br />
                            <Grid item>
                                <EditProfile updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} />
                            </Grid> <br /> <br />
                            <Grid item>
                                <DeleteProfile updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} />
                            </Grid>
                        </Grid>
                    </Grid>
                </form>


            </div>
        )
    }
}

