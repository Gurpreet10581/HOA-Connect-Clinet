import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import APIURL from '../Helpers/environment';

type AcceptedProps = {
    token:string;
    setResponse: any;
}

type responseState ={
    description: string,
    userId: number,
    profileId: number,
}


class CreateResponse extends Component <AcceptedProps, responseState>{
    constructor(props: AcceptedProps){
        super(props);
        this.state= {
            description: '',
            userId: 0,
            profileId: 0
        }
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const url = `${APIURL}/response/newResponse/:id`;
    
        const postSend = {
          responseState: {
            description: this.state.description,
            userId: this.state.userId,
            profileId: this.state.profileId
          },
        };
    
        fetch(url, {
          method: "POST",
          body: JSON.stringify(postSend),
          headers: {
            "Content-Type": "application/json",
            Authorization: this.props.token,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            if (json.message === "A new response has been created") {
              console.log("Response has been created");
              this.props.setResponse(json.responseState.description, json.responseState.userId, json.responseState.profileId);
            }
          })
          .catch((err) => console.log(err));
      }
      render() {
        return (
          <div>
            <form onSubmit={this.handleSubmit.bind(this)}>
              
              <TextField
                label="Description"
                type="text"
                value={this.state.description}
                onChange={(e) =>
                  this.setState({ ...this.state, description: e.target.value })
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
export default CreateResponse;