import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import APIURL from '../Helpers/environment';


type AcceptedProps = {
    // updateToken:string | null;
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
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
      if (this.props.sessionToken){
        fetch(`${APIURL}/post/`,{
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
          console.log("Post", data.post)
          this.setState({
            title: data.state.title, description: data.state.description
          })
        })
        .catch((err) => console.log(err));
      }
    }

    PostByID = (id: number | undefined) => {
      if (this.props.sessionToken){
        fetch(`${APIURL}/post/${id}`,{
          method:"Get",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": this.props.sessionToken
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
             <Button onClick={this.fetchPost}
                size="small"
                variant="outlined"
                type="submit"
                value="Get"
                data-test="submit"
              >
                Get All Posts
              </Button>


            
          </div>
        );
      }
}
export default GetPost;