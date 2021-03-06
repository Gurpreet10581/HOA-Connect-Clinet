import React, {Component} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import APIURL from '../Helpers/environment';

type AcceptedProps = {
    // updateToken:string |null;
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
    // fetchPost: () => void
}

type postState ={
    title: string,
    description: string,
    // userId: number,
    // profileId: number,
}


class CreatePost extends Component <AcceptedProps, postState>{
    constructor(props: AcceptedProps){
        super(props);
        this.state= {
            title: '',
            description: '',
            // userId: 0,
            // profileId: 0
        }
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let id:any = (this.props.sessionToken !== null); 

        const url = `${APIURL}/post/newPost`;//might have an issue with route
    
        const postSend = {
          post: {
            title: this.state.title,
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
            if (json.message === "A new post has been created") {
              console.log("Post has been created");
              this.setState(json.post.title, json.post.description);
              // this.props.fetchPost();
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
                label="Title"
                type="text"
                multiline
                value={this.state.title}
                onChange={(e) =>
                  this.setState({ ...this.state, title: e.target.value })
                }
              />
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
                Create A Post
              </Button>
            </form>
          </div>
        );
      }
}
export default CreatePost;
