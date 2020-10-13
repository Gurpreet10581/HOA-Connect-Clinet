import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import APIURL from '../Helpers/environment';
import {ResponseData} from '../Helpers/Interfaces';

type acceptedProps ={
    // updateToken: string | null;
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
    data: any,
    onDone?: Function
}

type responseData={
    // responseData: [ResponseData | null],
    description: string,
}

class EditResponse extends Component<acceptedProps, responseData> {
    constructor(props: acceptedProps){
        super(props);
        // console.log(props)
        this.state= {
            description: this.props.data.description,
            // userId: 0,
            // profileId: 0
        }
    }
    
    editResponse =(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
            if(this.props.sessionToken !== null ){
            let id:number = Number(this.props.data.id);
            fetch(`${APIURL}/response/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    description: this.state.description,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization:this.props.sessionToken
                },
                
            })
            .then(res => res.json())
            .then((data) => {
                console.log('Data', data)
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
                <h1> Edit Response</h1>
            <form onSubmit={response => {this.editResponse(response)}}>
              
              <TextField
                label="Description"
                type="text"
                multiline
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
                Edit Response
              </Button>
            </form>
          </div>
        );
      }

}

export default EditResponse;
