import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import APIURL from '../Helpers/environment';


type AcceptedProps = {
    // updateToken:string | null;
    updateToken: (newToken: string) => void,
    sessionToken: string | null,
}

type userState ={
    user: any,
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    admin: boolean ;
    userName: string;
}


class GetUser extends Component <AcceptedProps, userState>{
    constructor(props: AcceptedProps){
        super(props);
        this.state= {
            user: {},
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            admin: false,
            userName: 'Enter an User Name'
        }
    }


    componentDidMount(){
      this.fetchUser();
    }

    fetchUser = () => {
      if (this.props.sessionToken){
        fetch(`${APIURL}/user/`,{
          method:"Get",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": this.props.sessionToken
          }),
        })
        .then((res) => {
          if (res.status !== 200) {
              throw new Error("Error");
          } else return res.json();
        })
        .then((data) => {
          console.log("user", data.user)
          this.setState({
            firstName: data.state.firstName, lastName: data.state.lastName, email: data.state.email,
            password: data.state.password,admin: data.state.admin, userName: data.state.userName
          })
        })
        .catch((err) => console.log(err));
      }
    }

    userByID = (id: number | undefined) => {
      if (this.props.sessionToken){
        fetch(`${APIURL}/user/${id}`,{
          method:"Get",
          headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": this.props.sessionToken
          }),
        })
        .then((res) => {
          this.fetchUser()
        })
        .catch((err) => console.log(err));
      }
    }

      render() {
        return (
          <div>
             <Button onClick={this.fetchUser}
                size="small"
                variant="outlined"
                type="submit"
                value="Get"
                data-test="submit"
              >
                Get  User
              </Button>
          </div>
        );
      }
}
export default GetUser;