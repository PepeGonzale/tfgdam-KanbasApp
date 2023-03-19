import supertest from "supertest";
import createServer from "../utils/server";
import dbConnect from "../config/mongo";
import UserModel from "../models/user.model";


const app = createServer();
describe("user", () => {
    beforeAll(async () => {
      dbConnect()
    })
    
  describe("login route", () => {
    describe("given the product does not exist", () => {
      it("should return a 404", async () => {
        const user = new UserModel()
        const response = await supertest(app)
        .post(`/api/auth/login`)
        .send({
          "email": "pepeglezdevega@gmail.com",
          "password": "12345678"
      })
        
      });
      it("register route", async () => {
        const response = await supertest(app)
        .post(`/api/auth/register`)
        .send({
            "email": "peppglezdevega@gmail.com",
            "password": "12345678"
        })
        
      });
      
      
    });
  });
});   