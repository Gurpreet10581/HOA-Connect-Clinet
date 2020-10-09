import { Button } from "@material-ui/core";
import React, { Component } from "react";
import {ResponseData} from '../Helpers/Interfaces';
import APIURL from '../Helpers/environment';


type acceptedProps ={
    // updateToken: string | null;
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
}

type responseData={
    post: [ResponseData | null]
}


class DeleteResponse extends Component<acceptedProps, responseData> {

    constructor(props: acceptedProps){
        super(props)
        // console.log(props)
    }
    
    
    Deleteresponse = (): any => {
        if(this.props.sessionToken !== null){

            let id:number = 1; 
            fetch(`${APIURL}/response/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization:this.props.sessionToken
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
                <Button color="secondary" onClick={this.Deleteresponse}>Delete Response</Button>
            </div>
        )
    }
}
export default DeleteResponse;