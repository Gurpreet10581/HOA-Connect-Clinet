import React, { Component } from 'react'

export default class Landing extends Component {
    render() {
        return (
            <div >
                <h1 style={{textDecoration:"underline"}}>About</h1>
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
        )
    }
}
