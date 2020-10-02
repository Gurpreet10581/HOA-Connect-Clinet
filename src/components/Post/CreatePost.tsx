import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import APIURL from '../Helpers/environment';

type AcceptedProps = {
    token:string;
    setPost: any;
}

type postState ={
    title: string,
    description: string,
    userId: number,
    profileId: number,
}


class CreatePost extends Component <AcceptedProps, postState>{
    constructor(props: AcceptedProps){
        super(props);
        this.state= {
            title: '',
            description: '',
            userId: 0,
            profileId: 0
        }
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const url = `${APIURL}/post/newPost`;
    
        const postSend = {
          postState: {
            title: this.state.title,
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
            if (json.message === "A new post has been created") {
              console.log("Post has been created");
              this.props.setPost(json.postState.title, json.postState.description, json.postState.userId, json.postState.profileId);
            }
          })
          .catch((err) => console.log(err));
      }
      render() {
        return (
          <div>
            <form onSubmit={this.handleSubmit.bind(this)}>
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
                Create
              </Button>
            </form>
          </div>
        );
      }
}
export default CreatePost;