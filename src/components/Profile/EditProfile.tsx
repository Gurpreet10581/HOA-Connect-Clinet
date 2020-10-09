import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import APIURL from '../Helpers/environment';
// import {Profile} from '../Helpers/Interfaces';

type acceptedProps ={
    // updateToken: string | null;
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
}

type profileData={
    // profile: [Profile | null]
    address: string,
    about: string,
}

class EditProfile extends Component<acceptedProps, profileData> {
    constructor(props: acceptedProps){
        super(props);
        // console.log(props)
        this.state= {
          
          address: '',
          about: '',
      }
    }
    
    editProfile =(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

            if(this.props.sessionToken !== null ){
            let id:number =1;
            fetch(`${APIURL}/profile/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    address: this.state.address,
                    about: this.state.about
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
                <h1> Edit Profile</h1>
            <form onSubmit={profile =>{this.editProfile(profile)}}>
              <TextField
                label="Address"
                type="text"
                value={this.state.address}
                onChange={(e) =>
                  this.setState({ ...this.state, address: e.target.value })
                }
              />
              <TextField
                label="About"
                type="text"
                value={this.state.about}
                onChange={(e) =>
                  this.setState({ ...this.state, about: e.target.value })
                }
              /><br /> <br />
              <Button
                size="small"
                variant="outlined"
                type="submit"
                value="Create"
                data-test="submit"
                
              >
                Edit Profile
              </Button>
            </form>
          </div>
        )
    }

}

export default EditProfile;
