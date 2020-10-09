import React, { Component } from 'react';
import APIURL from '../Helpers/environment';
import {ResponseData} from '../Helpers/Interfaces';
import Button from "@material-ui/core/Button";
import CreateResponse from './CreateResponse';
import GetResponse from './GetResponse';
import { Grid } from '@material-ui/core';
import EditResponse from './EditResponse';
import DeleteResponse from './DeleteResponse';

type responseData={
    response: [ResponseData | null];
}

type propsData = {
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
}

export default class ResponsePage extends Component <propsData, responseData>{
    constructor(props: propsData){
        super(props);
        this.state ={
            response: [null]

        }
    }
    componentDidMount() {
        // this.fetchpost();
    }
    fetchResponse = () => {
        const url = `${APIURL}/response/`;
      
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

    myResponseHandler = (event: any)=> {
        this.setState({response: event.target.value})
    }
    


    render( ){
        return(
            <div  className="main" style={{marginTop:"5em"}}>
                <Button onClick={this.fetchResponse}
                size="small"
                variant="outlined"
                type="submit"
                value="Get"
                data-test="submit"
              >
                Get All Responses
              </Button>
              <Grid container direction="row" justify="space-around" alignItems="center" spacing={3}>
                        
                        
                        <Grid container direction="row" justify="space-around" alignItems="center" spacing={3}>
                            {/* <Grid item>
                                <GetResponse sessionToken={this.props.sessionToken} updateToken={this.props.updateToken} />
                            </Grid> */}
                            <Grid item>
                                <CreateResponse sessionToken={this.props.sessionToken} updateToken={this.props.updateToken}/>
                            </Grid> <br /> <br />
                            <Grid item>
                                <EditResponse sessionToken={this.props.sessionToken} updateToken={this.props.updateToken}/>
                            </Grid> <br /> <br />
                            <Grid item>
                                <DeleteResponse sessionToken={this.props.sessionToken} updateToken={this.props.updateToken}/>
                            </Grid>
                        </Grid>
                    </Grid>
                

              {/* <GetResponse sessionToken={this.props.sessionToken} updateToken={this.props.updateToken} />
              <CreateResponse sessionToken={this.props.sessionToken} updateToken={this.props.updateToken}/>
              <EditResponse sessionToken={this.props.sessionToken} updateToken={this.props.updateToken} />
              <DeleteResponse sessionToken={this.props.sessionToken} updateToken={this.props.updateToken } /> */}
            </div>
        )
    }
}