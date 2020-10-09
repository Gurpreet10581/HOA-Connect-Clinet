import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import APIURL from '../Helpers/environment';

type AcceptedProps = {
    // updateToken:string | null;
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
}

type responseState ={
    description: string,
}


class GetResponse extends Component <AcceptedProps, responseState>{
    constructor(props: AcceptedProps){
        super(props);
        this.state= {
            description: '',
        }
    }

    componentDidMount(){
      this.fetchResponse();
    }

    fetchResponse = () => {
      if (this.props.sessionToken){
        fetch(`${APIURL}/response/`,{
          method:"Get",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": this.props.sessionToken
          }),
        })
        .then((res) => {
          if (res.status !== 200) {
              throw new Error("Error");
          } else return res.json();
        })
        .then((data) => {
          console.log("Response", data.response)
          this.setState({
            description: data.state.description
          })
        })
        .catch((err) => console.log(err));
      }
    }


    ResponseByID = (id: number | undefined) => {
      if (this.props.sessionToken){
        fetch(`${APIURL}/response/${id}`,{
          method:"Get",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": this.props.sessionToken
          }),
        })
        .then((res) => {
          this.fetchResponse()
        })
        .catch((err) => console.log(err));
      }
    }
    
      render() {
        return (
          <div>
            <Button onClick={this.fetchResponse}
                size="small"
                variant="outlined"
                type="submit"
                value="Get"
                data-test="submit"
              >
                Get All Responses
              </Button>

            {/* <form onSubmit={this.fetchResponse.bind(this)}>
              
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
            </form> */}
          </div>
        );
      }
}
export default GetResponse;