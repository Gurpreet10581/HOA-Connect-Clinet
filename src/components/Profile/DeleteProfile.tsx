import { Button } from "@material-ui/core";
import React, { Component } from "react";
import {Profile} from '../Helpers/Interfaces';
import APIURL from '../Helpers/environment';


type acceptedProps ={
    updateToken: string | null;
}

type profileData={
    profile: [Profile | null]
}


class DeleteProfile extends Component<acceptedProps, profileData> {

    constructor(props: acceptedProps){
        super(props)
        console.log(props)
    }
    
    
    deleteProfile = (): any => {
        if(this.props.updateToken !== null){

            let id:number = 1; 
            fetch(`${APIURL}/profile/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization:this.props.updateToken
                },
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        }
    }
    render() {
        return (
            <div>
                <br />
                <Button color="secondary" onClick={this.deleteProfile}>Delete Profile</Button>
            </div>
        )
    }
}
export default DeleteProfile;