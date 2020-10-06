import React, { Component } from 'react';
import APIURL from '../Helpers/environment';
import {PostData} from '../Helpers/Interfaces';
import Button from "@material-ui/core/Button";

type postData={
    post: [PostData | null];
}

type propsData = {
    updateToken: string | null,
}

export default class PostPage extends Component <propsData, postData>{
    constructor(props: propsData){
        super(props);
        this.state ={
            post: [null]

        }
    }
    componentDidMount() {
        // this.fetchpost();
    }
    fetchPost = () => {
        const url = `${APIURL}/post/`;
      
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

    myPostHandler = (event: any)=> {
        this.setState({post: event.target.value})
    }
    


    render( ){
        return(
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
        )
    }
}