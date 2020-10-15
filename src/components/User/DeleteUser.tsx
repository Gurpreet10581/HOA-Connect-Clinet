import { Button } from "@material-ui/core";
import React, { Component } from "react";
import {UserData} from '../Helpers/Interfaces';
import APIURL from '../Helpers/environment';


type acceptedProps ={
    // updateToken: string | null;
    data: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        userName: string
      } | any,
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
    onDone: () => void

}

type userData={
    userData: [UserData | null]
}


class DeleteUser extends Component<acceptedProps, userData> {

    constructor(props: acceptedProps){
        super(props)
        // console.log(props)
    }
    
    
    deleteUser = (): any => {
        if(!window.confirm('Are you sure you want to delete this item?')){
            return;
        }
        if(this.props.sessionToken !== null){

            let id:number = this.props.data.id; 
            fetch(`${APIURL}/user/deleteUser/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization:this.props.sessionToken
                },
            })
            .then(res => res.json())
            .then(data => {console.log(data); if(typeof this.props.onDone === 'function') {this.props.onDone()}})
            .catch(err => console.log(err))
        }
    }
    render() {
        return (
            <div>
                <br />
                <Button color="secondary" onClick={this.deleteUser}>Delete User</Button>
            </div>
        )
    }
}
export default DeleteUser;