import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import APIURL from '../Helpers/environment';
// import {PostData} from '../Helpers/Interfaces';

type acceptedProps ={
    updateToken: string | null;
}

type postData={
    // postData: [PostData | null]
    title: string,
    description: string,
}

class EditPost extends Component<acceptedProps, postData> {
    constructor(props: acceptedProps){
        super(props);
        console.log(props)
        this.state= {
          
            title: '',
            description: '',
        }
    }
    
    editPost=(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
        if(this.props.updateToken !== null ){
            let id:number =1;
            fetch(`${APIURL}/post/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: this.state.title,
                    description: this.state.description,
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization:this.props.updateToken
                },
                
            })
            .then(res => res.json())
            .then((data) => {
                console.log('Data', data)
            })
            .catch((err) => console.log(err));
        }
        
    }
    render() {
        return (
          <div>
                <h1> Edit Post</h1>
            <form onSubmit={postData => {this.editPost(postData)}}>
              <TextField
                label="Title"
                type="text"
                value={this.state.title}
                onChange={(e) =>
                  this.setState({ ...this.state, title: e.target.value })
                }
              />
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
                Edit Post
              </Button>
            </form>
          </div>
        );
      }

}

export default EditPost;