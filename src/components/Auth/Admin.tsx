import React, { Component } from 'react';
import APIURL from '../Helpers/environment';
import {UserDetail} from '../Helpers/Interfaces'
import Button from "@material-ui/core/Button";
import EditUser from '../User/EditUser';
import DeleteUser from '../User/DeleteUser';
import { Grid } from '@material-ui/core';
import { DataGrid, RowParams } from '@material-ui/data-grid';



type userData={
    // user?: UserDetail | null;
    user: Array<UserDetail>;
    selectedRow: any | null

}
type RowData = {
    data: UserDetail
}
type AcceptedProps = {
    // admin: boolean;
    // updateToken: string;
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
}
export default class ProfilePage extends Component <AcceptedProps, userData> {
    constructor(props: AcceptedProps){
        super(props);
        this.state ={
            user: [],
            selectedRow: null


        }
    }
    componentDidMount() {
        this.fetchUser();
    }
    fetchUser = () => {
        const url = `${APIURL}/user/`
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
                // console.log(data);
                // if (data == null){
                //     console.log('no results')
                //     this.setState({user: null});
                // } else {
                //     this.setState({user: { firstName: data.firstName, lastName: data.lastName,email: data.email, password: data.password,userName: data.userName,admin: data.admin}})
                // }
                console.log("Looking at data", data);
                this.setState({
                    user: data
                })
            })
            .catch((err) => console.log(err));
        }

    }

    myUserHandler = (event: any)=> {
        this.setState({user: event.target.value})
    }

    handleDelete = (id: number | undefined) => {
        if (this.props.sessionToken) {
            fetch(`${APIURL}/user/${id}`, {
                method: "DELETE",
                headers: new Headers({
                    "Content-Type": "application/json",
                    'Authorization': this.props.sessionToken
                }),
            })
                .then((res) => {
                    this.fetchUser()
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
    onUpdate =() => {
        this.fetchUser();
        this.cancelEditing();

    }
    render(){

        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'firstName', headerName: 'First Name', width: 230 },
            { field: 'lastName', headerName: 'Last Name', width: 230 },
            { field: 'email', headerName: 'Email', width: 230 },
            { field: 'userName', headerName: 'User Name', width: 230 },
            { field: 'createdAt', headerName: 'Created', width: 230 }
          ];

        return (
            <div >
            <div className="main" style={{marginTop:"5em"}}>
              
                <h1>Admin Page</h1>
                <Grid container direction="row" justify="space-around" alignItems="center" spacing={3}>

                    {this.state.selectedRow ? (
                        <>
                        <Grid container direction="row" justify="space-around" alignItems="center" spacing={3}> 
                        
                            <Grid item>
                                <EditUser onDone={this.onUpdate} data={this.state.selectedRow}  updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} />
                            </Grid>
                            <Grid item>
                            <DeleteUser onDone={this.onUpdate} data={this.state.selectedRow}  updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} />
                            </Grid> 
                         
                        </Grid>
                        <Button onClick={this.cancelEditing} style={{ textDecoration: 'none', fontSize:"small", color:"black", border:"solid black 2px", borderRadius:"5px",fontWeight:"bold",backgroundColor:"white" }}>Cancel Editing</Button>
                        </>)
                        :
                        <div></div>
                    }
                        </Grid>
                    <br /> <br />  <hr />
                    <div style={{textAlign:"center"}}>
                <form>
                    <Button onClick={this.fetchUser}
                    size="small"
                    variant="outlined"
                    type="submit"
                    value="Get"
                    data-test="submit"
                    >
                    Get All user
                     </Button>
                     </form>
                    </div>
                    <hr />
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={this.state.user} onRowClick={this.onRowClick} columns={columns} pageSize={5} />
                </div>
                  
            </div>
        </div>
    )
}
}
