import { Button } from "@material-ui/core";
import React, { Component } from "react";
import {PostData} from '../Helpers/Interfaces';
import APIURL from '../Helpers/environment';
declare var window: any;

type acceptedProps ={
    // updateToken: string | null;
    data: {
        id: number,
        title: string,
        description: string
      } | any,
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
    onDone: () => void
}

type postData={
    post: [PostData | null]
}


class DeletePost extends Component<acceptedProps, postData> {

    constructor(props: acceptedProps){
        super(props)
        // console.log(props)
    }
    
    
    deletePost = (): any => {
        if(!window.confirm('Are you sure you want to delete this item?')){
            return;
        }
        if(this.props.sessionToken !== null){

            let id:number = this.props.data.id; 
            fetch(`${APIURL}/post/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization:this.props.sessionToken
                },
            })
            .then(res => res.json())
            .then(data => {console.log(data); if(typeof this.props.onDone === 'function') {this.props.onDone()} })
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