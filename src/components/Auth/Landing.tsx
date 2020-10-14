import React, { Component } from 'react'
import Admin from './Admin'
import {UserData} from '../Helpers/Interfaces'

type profileData={
    user?: UserData | null;
}

type propsData = {
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
}

export default class Landing extends Component <propsData, profileData>{
    render() {
        return (
            <div>
                {
                    localStorage.getItem("admin") === "true" ?
                    <Admin updateToken={this.props.updateToken} sessionToken={this.props.sessionToken} /> :
            <div >
                <h1 style={{textDecoration:"underline"}}>About</h1>
                <h2 style={{textAlign:"center"}}>User Must create/have a profile to fully enjoy this application.</h2>
                <br/><br/>
                <div style={{fontFamily:"monospace", color:"ButtonHighlight", textAlign: "center"}}>
                <p style={{fontSize:"xx-large"}}>Here is what you should know about your HOA Connect</p>

                <ul style={{listStyle:"none", fontWeight:"bold",fontSize:"large"}}>
                    <li>
                    -- This Platform allows HOA Members and Residents to stay connected at all time
                    </li><br/>
                    <li>
                    -- Gets instant response from HOA members and other residents
                    </li><br/>
                    <li>
                    -- Keep track of your and other approved requests/projects
                    </li><br/>
                    <li>
                    -- Reduces the wait time
                    </li><br/>
                </ul>
                </div>
            </div>
                }
            </div>
        )
    }
}
