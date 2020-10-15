import React, { Component } from 'react';
import APIURL from '../Helpers/environment';
import {PostData} from '../Helpers/Interfaces';
import Button from "@material-ui/core/Button";
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import DeletePost from './DeletePost';
import { Grid } from '@material-ui/core';
import { DataGrid, RowParams } from '@material-ui/data-grid';
import { Link } from 'react-router-dom'

type postData={
    post: Array<PostData>;
    selectedRow: any | null
}

type RowData = {
    data: PostData
}

type propsData = {
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
}

export default class PostPage extends Component <propsData, postData>{
    constructor(props: propsData){
        super(props);
        this.state ={
            post: [],
            selectedRow: null
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

    onRowClick = (data : RowParams) => {
        this.setState({selectedRow: data.data});
    }

    cancelEditing = () => {
        this.setState({selectedRow: null});
    }

    onUpdated = () => {
        this.cancelEditing();
        this.fetchPost();
    }

    render( ){

        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'title', headerName: 'Title', width: 230 },
            { field: 'description', headerName: 'Description', width: 230 },
            { field: 'userId', headerName: 'UserID', width: 130 },
            { field: 'profileId', headerName: 'ProfileID', width: 100},    
            { field: 'createdAt', headerName: 'Created', width: 230 }
          ];


        return(
            <div  className="main" style={{marginTop:"5em"}}>
                <Grid container direction="row" justify="space-around" alignItems="center" spacing={3}>
                        
                        
                        <Grid container direction="row" justify="space-around" alignItems="center" spacing={3}>
                            
                            {this.state.selectedRow ? (
                                <>
                                    <Grid item>
                                        <EditPost onDone={this.onUpdated} data={this.state.selectedRow} updateToken={this.props.updateToken} sessionToken={this.props.sessionToken}/>
                                    </Grid>
                                    <Grid item>
                                        <DeletePost onDone={this.onUpdated} data={this.state.selectedRow} updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} />
                                    </Grid>
                                    <Button onClick={this.cancelEditing} style={{ textDecoration: 'none', fontSize:"small", color:"black", border:"solid black 2px", borderRadius:"5px",fontWeight:"bold",backgroundColor:"white" }}>Cancel Editing</Button>
                                    <Link to={'/responsePage/' + this.state.selectedRow.id} style={{ textDecoration: 'none', fontSize:"large", color:"black", border:"solid black 2px", borderRadius:"5px", padding:"5px",backgroundColor:"white"}}>Show Responses</Link>
                                </>)
                            : 
                            <Grid item>
                                <CreatePost updateToken={this.props.updateToken} sessionToken={this.props.sessionToken}  />
                            </Grid> }
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
                
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={this.state.post} onRowClick={this.onRowClick} columns={columns} pageSize={5} />
                </div>
            </div>
        )
    }
}