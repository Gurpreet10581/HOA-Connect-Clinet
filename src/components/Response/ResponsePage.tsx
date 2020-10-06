import React, { Component } from 'react';
import APIURL from '../Helpers/environment';
import {ResponseData} from '../Helpers/Interfaces';
import Button from "@material-ui/core/Button";

type responseData={
    response: [ResponseData | null];
}

type propsData = {
    updateToken: string | null,
}

export default class ResponsePage extends Component <propsData, responseData>{
    constructor(props: propsData){
        super(props);
        this.state ={
            response: [null]

        }
    }
    componentDidMount() {
        // this.fetchpost();
    }
    fetchResponse = () => {
        const url = `${APIURL}/response/`;
      
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
            })
            .catch((err) => console.log(err));
        } 
      
    }

    myResponseHandler = (event: any)=> {
        this.setState({response: event.target.value})
    }
    


    render( ){
        return(
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
                </div>
        )
    }
}