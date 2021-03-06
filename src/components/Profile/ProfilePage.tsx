import React, { Component } from 'react';
import APIURL from '../Helpers/environment';
import {Profile} from '../Helpers/Interfaces';
import Button from "@material-ui/core/Button";
import CreateProfile from './CreateProfile';
import EditProfile from './EditProfile';
import { Grid } from '@material-ui/core';
import DeleteProfile from './DeleteProfile';

type profileData={
    profile?: Profile | null;
}

type propsData = {
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
}



export default class ProfilePage extends Component <propsData, profileData>{
    constructor(props: propsData){
        super(props);
        this.state ={
            profile: null

        }
    }
    componentDidMount() {
        this.fetchProfile();
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
                    this.setState({profile: null});
                } else {
                    this.setState({profile: {id: data.id, address: data.address, about: data.about}})
                }
            })
            .catch((err) => console.log(err));
        } 
      
    }
    myProfileHandler = (event: any)=> {
        this.setState({profile: event.target.value})
    }

    handleDelete = (id: number | undefined) => {
        if (this.props.sessionToken) {
            fetch(`${APIURL}/profile/${id}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': this.props.sessionToken
                }),
            })
                .then((res) => {
                    this.fetchProfile()
                })
                .catch((err) => alert(err));
        }
    }
    componentDidUpdate(){
        // console.log("UPDATE");
    }

    onUpdate() {
        this.fetchProfile();
        console.log("Here");
        // window.location.reload();//this is refreshing the render
    }
  
      
    render( ){
        return(
            <div className="main" style={{marginTop:"5em"}}>
                   
                    <Grid container direction="row" justify="space-around" alignItems="center" spacing={3}>
                        <Grid container direction="row" justify="space-around" alignItems="center" spacing={3}>
                            {this.state.profile == null ?
                            <Grid item>
                                <CreateProfile onDone={this.onUpdate.bind(this)} updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} />
                            </Grid> 
                            : 
                            <Grid item>
                                <EditProfile onDone={this.onUpdate.bind(this)} data={this.state.profile} updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} />
                            </Grid>
                            }
                            <Grid item>
                            <DeleteProfile onDone={this.onUpdate.bind(this)} data={this.state.profile} updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} />
                            </Grid> 
                        </Grid>
                    </Grid><br /> <br />  <hr />
                    <div style={{textAlign:"center"}}>
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
                     </form>
                    </div>
                    <hr />
                    <div style={{textAlign:"center", fontWeight:"bold", fontSize:"x-large", fontFamily:"cursive"}}>

                    {this.state.profile == null ? null : <>
                         Address:   {this.state.profile.address} <br/> <br/>
                         About: {this.state.profile.about} <br/> <br/>
                         Profile ID: {this.state.profile.id} <br/> <br/>
                </>}
                    </div>
            </div>
        )
    }
}

