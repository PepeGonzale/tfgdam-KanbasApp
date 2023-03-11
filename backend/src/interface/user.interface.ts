export interface IUserType {
    email: string;
    password: string;
    dateSignUp: Date
  }
  
  export interface IUserReturnType {
    _id: string;
    email: string;
    token: string;
  }
  
  export interface IUserSchema extends IUserType {
    _id: string;
  }