import React from 'react'

const SignOut = (props:any) => {
    return (
        <div>
                <h3 className='signout' onClick={() => {props.setSessionToken(''); localStorage.clear()}}>Sign Out</h3>
        </div>
    )
}

export default SignOut;