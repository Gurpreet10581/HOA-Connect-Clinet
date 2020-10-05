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

export interface Profile{
    userId: number,
    address: string,
    about: string
}

export interface Post{
    userId: number,
    title: string,
    description:string,
    profileId: number
}
export interface Response{
    userId: number,
    description:string,
    postId: number
}

