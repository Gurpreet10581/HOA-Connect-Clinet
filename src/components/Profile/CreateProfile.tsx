import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import APIURL from '../Helpers/environment';


type AcceptedProps = {
    updateToken:string |null;
    
  }
  
  type profileState ={
    address: string,
    about: string,
}


class CreateProfile extends Component <AcceptedProps, profileState>{
    constructor(props: AcceptedProps){
        super(props);
        this.state= {
          
            address: '',
            about: '',
        }
    }
    
    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const url = `${APIURL}/profile/newProfile`;
    
        const profileSend = {
          profile: {
            address: this.state.address,
            about: this.state.about,
          },
        };
        if (this.props.updateToken !== null){

          fetch(url, {
            method: "POST",
            body: JSON.stringify(profileSend),
            headers: {
              "Content-Type": "application/json",
              Authorization: this.props.updateToken,
            },
          })
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            if (json.message === "A new profile has been created") {
              console.log("Profile has been created");
              this.setState({address: json.profile.address, about: json.profile.about})
            }
          })
          .catch((err) => console.log(err));
        }
      }
      render() {
        return (
          <div>
            <form onSubmit={this.handleSubmit.bind(this)}>
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
              />
              <Button
                size="small"
                variant="outlined"
                type="submit"
                value="Create"
                data-test="submit"
              >
                Create Your Profile
              </Button>
            </form>
          </div>
        );
      }
}
export default CreateProfile;