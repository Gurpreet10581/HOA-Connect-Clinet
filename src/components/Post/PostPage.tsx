import React, { Component } from 'react';
import APIURL from '../Helpers/environment';
import {PostData} from '../Helpers/Interfaces';
import Button from "@material-ui/core/Button";
import GetPost from './GetPost';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import DeletePost from './DeletePost';
import { Grid } from '@material-ui/core';


type postData={
    post: [PostData | null];
}

type propsData = {
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
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
      
        if(this.props.sessionToken){

            fetch(url, {
                method: 'GET',
                headers:  {
                    "Content-Type": "application/json",
                    Authorization: this.props.sessionToken,
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
            <div  className="main" style={{marginTop:"5em"}}>
                <Grid container direction="row" justify="space-around" alignItems="center" spacing={3}>
                        
                        
                        <Grid container direction="row" justify="space-around" alignItems="center" spacing={3}>
                            <Grid item>
                                <CreatePost updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} />
                            </Grid>
                            {/* <Grid item>
                                <EditPost updateToken={this.props.updateToken} sessionToken={this.props.sessionToken}/>
                            </Grid>
                            <Grid item>
                                <DeletePost updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} />
                            </Grid> */}
                        </Grid>
                </Grid><br /> <br />  <hr />
                <div style={{textAlign:"center"}}>

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
                <hr />
            </div>
        )
    }
}