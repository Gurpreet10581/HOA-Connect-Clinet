import React, { Component } from 'react';
import APIURL from '../Helpers/environment';
import {PostData} from '../Helpers/Interfaces';
import Button from "@material-ui/core/Button";
import GetPost from './GetPost';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import DeletePost from './DeletePost';
import { Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, List, Container } from '@material-ui/core';
import StyledList from '../StyledComponets/StyledList';

type postData={
    post: [PostData | null];
}

type propsData = {
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
}

let subTotal: number = 0, numberOfPosts: number = 0;
export default class PostPage extends Component <propsData, postData>{
    constructor(props: propsData){
        super(props);
        this.state ={
            post: [null]

        }
    }
    componentDidMount() {
        this.fetchPost();
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
                console.log("Looking at data", data);
                this.setState({
                    post: data
                })

              
            })
            .catch((err) => console.log(err));
        } 
      
    }

    myPostHandler = (event: any)=> {
        this.setState({post: event.target.value})
    }
    
    handleDelete = (id: number | undefined) => {
        if (this.props.sessionToken) {
            fetch(`${APIURL}/post/${id}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': this.props.sessionToken
                }),
            })
                .then((res) => {
                    this.fetchPost()
                })
                .catch((err) => alert(err));
        }
    }


    render( ){

        // return(

        //     <Container>
        //         <StyledList>
        //             {
        //                 this.state.post.map((value,index) =>{
        //                    <ListItem style={{ borderBottom: '1px solid #eeeeee' }} key={index} button>
                               
        //                        <ListItemText style={{ width: '50%' }}
        //                                 id={value.id} primary={value.id} />
        //                          <ListItemSecondaryAction >
        //                                 <Button value={value.id} onClick={e => { this.handleDelete(value.id) }}>
        //                                     <DeleteIcon />
        //                                 </Button>
        //                             </ListItemSecondaryAction>
        //                    </ListItem>
        //                 })
        //             }

        //         </StyledList>
        //     </Container>
        // )




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