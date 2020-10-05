export interface UserData{
    user: User,
    message: string,
    sessionToken: string
  }
export interface User{
    firstName:string,
    lastName: string,
    email: string,
    userName: string,
    password: string,
    admin: boolean
    
  }