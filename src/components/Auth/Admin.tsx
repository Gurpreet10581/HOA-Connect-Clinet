import React, { FunctionComponent } from 'react';
import Signin from './Signin';


type AcceptedProps = {
    admin: boolean;
    updateToken: string;
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