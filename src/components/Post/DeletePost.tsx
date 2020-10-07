import { Button } from "@material-ui/core";
import React, { Component } from "react";
import {PostData} from '../Helpers/Interfaces';
import APIURL from '../Helpers/environment';


type acceptedProps ={
    updateToken: string | null;
}

type postData={
    post: [PostData | null]
}


class DeletePost extends Component<acceptedProps, postData> {

    constructor(props: acceptedProps){
        super(props)
        console.log(props)
    }
    
    
    deletePost = (): any => {
        if(this.props.updateToken !== null){

            let id:number = 1; 
            fetch(`${APIURL}/post/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization:this.props.updateToken
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
                <Button color="secondary" onClick={this.deletePost}>Delete Post</Button>
            </div>
        )
    }
}
export default DeletePost;