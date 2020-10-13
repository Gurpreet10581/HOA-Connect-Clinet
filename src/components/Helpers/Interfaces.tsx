export interface UserData{
    user: UserData,
    message: string,
    sessionToken: string
  }
export interface UserData{
    firstName:string,
    lastName: string,
    email: string,
    userName: string,
    password: string,
    admin: boolean
    
}

export interface Profile{
    id?: number,
    userId?: number,
    address: string,
    about: string
}

export interface PostData{
    id: number,
    userId?: number,
    title?: string,
    description?:string,
    profileId?: number
}
export interface ResponseData{
    id: number,
    userId: number,
    description:string,
    postId: number
}

