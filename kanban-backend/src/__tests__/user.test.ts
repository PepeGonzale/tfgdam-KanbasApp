import supertest from "supertest";
import createServer from "../utils/server";
import dbConnect from "../config/mongo";
import UserModel from "../models/user.model";
import * as UserService from "../services/user.service"
import * as BoardService from "../services/board.service"
import { IBoard } from "../interface/board.interface";
import mongoose from "mongoose";
import Board from "../models/board.model";
const userId = new mongoose.Types.ObjectId().toString()
const UserPayload = {
  "status": "OK",
 
      "user": {
          "email": "martaeglezdevega@gmail.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDE5YjhkN2VlZTJlYzAzYWYwOTEyMjUiLCJlbWFpbCI6Im1hcnRhZWdsZXpkZXZlZ2FAZ21haWwuY29tIiwiaWF0IjoxNjc5NDA3MzE5LCJleHAiOjE5Mzg2MDczMTl9.yxxYWLtnEHuSROqKNf7jm2x-AOL3jXvFr36s64FpxOI"
  
}
const userInput = {
  "email": "johndoe@example.com",
  "password": "12345678"
}
beforeAll(async () => {
  dbConnect()
})
const app = createServer();
describe("user", () => {
  afterAll(async() => {
    return await UserModel.findOneAndDelete({ email: UserPayload.user.email })
      .then((user) => {
        console.log('User deleted:', user);
      })
      .catch((error) => {
        console.log('Error deleting user:', error);
      });
  });
  
   
  describe("login route", () => {
    describe("given the product does not exist", () => {
     
      it("register route", async () => {
        const createUserServiceMock = jest.spyOn(UserService, "registerUser")
        // @ts-ignore
        .mockReturnValueOnce(UserPayload)
        const {body, statusCode} = await supertest(app)
        .post(`/api/auth/register`)
        .send(userInput)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        expect(statusCode).toBe(200)
      expect(body).toEqual(UserPayload)
      expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
    }); 
   
      
    });
  });
});   