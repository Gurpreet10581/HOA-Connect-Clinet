import React, { FunctionComponent } from 'react';
// import SignUp from './Signup';
import Signin from './Signin';

type AcceptedProps = {
    admin: boolean;
    updateToken: any;
}
export const Admin: FunctionComponent<AcceptedProps> = (props) => {
    return (
        <div >
            <div>
                <Signin admin={props.admin} updateToken={props.updateToken} />
            </div>
        </div>
    )
}

export default Admin;