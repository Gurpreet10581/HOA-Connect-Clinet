import React, { Component } from 'react';
import APIURL from '../Helpers/environment';
import {Profile} from '../Helpers/Interfaces';
import Button from "@material-ui/core/Button";
import CreateProfile from './CreateProfile';




type profileData={
    profile: [Profile | null];
}

type propsData = {
    updateToken: string | null,


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
      
        if(this.props.updateToken){

            fetch(url, {
                method: 'GET',
                headers:  {
                    "Content-Type": "application/json",
                    Authorization: this.props.updateToken,
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

    render( ){
        return(
            <div className="main">
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
                </form>
        {/* <p> {`Address: ${this.state.profile}`}</p>
        <p> {`About: ${this.state.profile}`}</p> */}
              {/* <CreateProfile updateToken={this.props.updateToken}  /> */}


            </div>
        )
    }
}

