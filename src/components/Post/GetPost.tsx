import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import APIURL from '../Helpers/environment';


type AcceptedProps = {
    updateToken:string;
}

type postState ={
    title: string;
    description: string;
}


class GetPost extends Component <AcceptedProps, postState>{
    constructor(props: AcceptedProps){
        super(props);
        this.state= {
          title: '',
          description: '',
        }
    }


    componentDidMount(){
      this.fetchPost();
    }

    fetchPost = () => {
      if (this.props.updateToken){
        fetch(`${APIURL}/post/`,{
          method:"Get",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": this.props.updateToken
          }),
        })
        .then((res) => {
          if (res.status !== 200) {
              throw new Error("Error");
          } else return res.json();
        })
        .then((data) => {
          console.log("Post", data.post)
          this.setState({
            title: data.state.title, description: data.state.description
          })
        })
        .catch((err) => console.log(err));
      }
    }

    PostByID = (id: number | undefined) => {
      if (this.props.updateToken){
        fetch(`${APIURL}/post/${id}`,{
          method:"Get",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": this.props.updateToken
          }),
        })
        .then((res) => {
          this.fetchPost()
        })
        .catch((err) => console.log(err));
      }
    }

      render() {
        return (
          <div>
             {/* <Button onClick={this.PostByID}>
                Get All Posts
              </Button>   
              Ask why onclick not working*/}

             <Button onClick={this.fetchPost}
                size="small"
                variant="outlined"
                type="submit"
                value="Get"
                data-test="submit"
              >
                Get All Posts
              </Button>
            {/* <form onSubmit={this.fetchPost.bind(this)}>
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
            </form> */}
          </div>
        );
      }
}
export default GetPost;