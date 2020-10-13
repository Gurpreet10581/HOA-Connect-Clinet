import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import APIURL from '../Helpers/environment';

type AcceptedProps = {
    // updateToken:string | null;
    onDone?: Function,
    id?: string,
    updateToken: (newToken: string) => void,
    sessionToken: string | null,

}

type responseState ={
    description: string,
    // userId: number,
    // profileId: number,
}


class CreateResponse extends Component <AcceptedProps, responseState>{
    constructor(props: AcceptedProps){
        super(props);
        this.state= {
            description: '',
            // userId: 0,
            // profileId: 0
        }
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let id: number = Number(this.props.id);
        const url = `${APIURL}/response/newResponse/${id}`;//might have an issue with route- it has to be some type of varible that is collecting the profile id and pass instead of the :id above 
    
        const postSend = {
          response: {
            description: this.state.description,
            // userId: this.state.userId,
            // profileId: this.state.profileId
          },
        };
        if (this.props.sessionToken !== null){
        fetch(url, {
          method: "POST",
          body: JSON.stringify(postSend),
          headers: {
            "Content-Type": "application/json",
            Authorization: this.props.sessionToken,
          },
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            if (json.message === "A new response has been created") {
              console.log("Response has been created");
              this.setState({description: ''});
            }

            if(typeof this.props.onDone === 'function') {
              this.props.onDone();
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
                Create A Response
              </Button>
            </form>
          </div>
        );
      }
}
export default CreateResponse;