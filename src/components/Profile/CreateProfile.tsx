import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import APIURL from '../Helpers/environment';

type AcceptedProps = {
    token:string;
    setProfile: any;
}

type profileState ={
    address: string,
    about: string,
    userId: number,
}


class CreateProfile extends Component <AcceptedProps, profileState>{
    constructor(props: AcceptedProps){
        super(props);
        this.state= {
            address: '',
            about: '',
            userId: 0,
        }
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const url = `${APIURL}/profile/newProfile`;
    
        const profileSend = {
          profileState: {
            address: this.state.address,
            about: this.state.about,
            userId: this.state.userId
          },
        };
    
        fetch(url, {
          method: "POST",
          body: JSON.stringify(profileSend),
          headers: {
            "Content-Type": "application/json",
            Authorization: this.props.token,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            if (json.message === "A new profile has been created") {
              console.log("Profile has been created");
              this.props.setProfile(json.profileState.address, json.profileState.about, json.profileState.userId);
            }
          })
          .catch((err) => console.log(err));
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
                Create
              </Button>
            </form>
          </div>
        );
      }
}
export default CreateProfile;