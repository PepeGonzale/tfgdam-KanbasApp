export interface Photo {
    title: string,
    description:string,
    filePath: string
}


export interface User {
    _id: string,
    email: string,
    refreshToken: string,
    image: string,
    password: string, 
    dateSignUp: Date
}