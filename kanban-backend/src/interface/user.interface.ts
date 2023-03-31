export interface Photo {
    title: string,
    description:string,
    filePath: string
}


export interface User {
    
    _id: string,
    email: string,
    username: string,
    mobile: string,
    refreshToken: string,
    role: string;
    image: string,
    password: string, 
    dateSignUp: Date
}