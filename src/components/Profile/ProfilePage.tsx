import React, { Component } from 'react';
import APIURL from '../Helpers/environment';
import {Profile} from '../Helpers/Interfaces';
import Button from "@material-ui/core/Button";



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
        const url = `${APIURL}/profile/all`;
      
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
                // else{

                //     {this.state.profile}
                // }
            })
            .catch((err) => console.log(err));
        } 
        // else{

        //         if (this.props.updateToken){
        //             const url = `${APIURL}/profile/newProfile`;
            
        //             const profileSend = {
        //             profileState: {
        //                 Profile: {}
        //             },
        //         };
        //             fetch(url, {
        //                 method: "POST",
        //                 body: JSON.stringify(profileSend),
        //                 headers: {
        //                   "Content-Type": "application/json",
        //                   Authorization: this.props.updateToken,
        //                 },
        //               })
        //                 .then((res) => res.json())
        //                 .then((json) => {
        //                   console.log(json);
        //                   if (json.message === "A new profile has been created") {
        //                     console.log("Profile has been created");
        //                     this.props.setProfile(json.profileState.address, json.profileState.about, json.profileState.userId);
        //                   }
        //                 })
        //                 .catch((err) => console.log(err));
        //         }
        // }
    }

    myProfileHandler = (event: any)=> {
        this.setState({profile: event.target.value})
    }
    

    componentDidMount() {
        this.fetchProfile();
    }

    render( ){
        return(
            <div>
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
              
                {/* <button  > Profile Info  {this.fetchProfile}</button> */}
                

                {/* {this.state.profile.map((profile: Profile) => {
                    return(
                        <CreateProfile address={profile.address} about={profile.about} userId={profile.userId} />
                        )
                    })}
                    <h1> Profile Info {this.fetchProfile}</h1>
                    <button addProfile={this.state.addProfile} updateToken={this.props.updateToken}>Create Your Profile</button> */}
                </form>
                </div>
        )
    }
}

