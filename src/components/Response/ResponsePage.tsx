import React, { Component } from 'react';
import APIURL from '../Helpers/environment';
import {ResponseData} from '../Helpers/Interfaces';
import Button from "@material-ui/core/Button";
import CreateResponse from './CreateResponse';
import GetResponse from './GetResponse';
import { Grid } from '@material-ui/core';
import { DataGrid, RowParams } from '@material-ui/data-grid';
import EditResponse from './EditResponse';
import DeleteResponse from './DeleteResponse';
import { Route, BrowserRouter as Router, Link, match } from 'react-router-dom';

type responseData={
    response: Array<ResponseData>,
    selectedRow: any | null
}

interface DetailParams {
    id: string;
}

type propsData = {
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
    match?: match<DetailParams>
}


export default class ResponsePage extends Component <propsData, responseData>{
    constructor(props: propsData){
        
        super(props);
        this.state ={
            response: [],
            selectedRow: null
        }
    }
    componentDidMount() {
        this.fetchResponse();
    }
    fetchResponse = () => {
        const url = `${APIURL}/response/all/${this.props.match?.params.id}`;
      
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
                this.setState({response: data})
            })
            .catch((err) => console.log(err));
        } 
      
    }

    myResponseHandler = (event: any)=> {
        this.setState({response: event.target.value})
    }
    handleDelete = (id: number | undefined) => {
        if (this.props.sessionToken) {
            fetch(`${APIURL}/response/${id}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': this.props.sessionToken
                }),
            })
                .then((res) => {
                    this.fetchResponse()
                })
                .catch((err) => alert(err));
        }
    }

    onUpdated = () => {
        this.cancelEditing();
        this.fetchResponse();
    }

    onRowClick = (data : RowParams) => {
        this.setState({selectedRow: data.data});
    }

    cancelEditing = () => {
        this.setState({selectedRow: null});
    }

    render( ){

        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'description', headerName: 'Description', width: 130 },
            { field: 'userId', headerName: 'UserID', width: 100 },
            { field: 'postId', headerName: 'PostID', width: 100 },
            { field: 'createdAt', headerName: 'Created', width: 230 }
          ];
        
        return(
            <div  className="main" style={{marginTop:"5em",textAlign:"center"}}>
                
              <Grid container direction="row" justify="space-around" alignItems="center" spacing={3}>
                        <Grid container direction="row" justify="space-around" alignItems="center" spacing={3}>

                        {this.state.selectedRow ? (
                                <>
                                    <Grid item>
                                        <EditResponse onDone={this.onUpdated} data={this.state.selectedRow} sessionToken={this.props.sessionToken} updateToken={this.props.updateToken}/>
                                    </Grid> <br /> <br />
                                    <Grid item>
                                        <DeleteResponse onDone={this.onUpdated} data={this.state.selectedRow} sessionToken={this.props.sessionToken} updateToken={this.props.updateToken}/>
                                    </Grid>
                                    <Button onClick={this.cancelEditing}>Cancel Editing</Button>
                                </>)
                            : 
                            <Grid item>
                                <CreateResponse onDone={this.onUpdated} id={this.props.match?.params.id} sessionToken={this.props.sessionToken} updateToken={this.props.updateToken}/>
                            </Grid>} <br /> <br />
                            
                        </Grid>
                </Grid><br /> <br />  <hr />
                <div style={{textAlign:"center"}}>
                <Button onClick={this.fetchResponse}
                size="small"
                variant="outlined"
                type="submit"
                value="Get"
                data-test="submit"
                >
                Get All Responses
              </Button>
                </div>
              <hr />

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={this.state.response} onRowClick={this.onRowClick} columns={columns} pageSize={5} />
                </div>

            </div>
        )
    }
}