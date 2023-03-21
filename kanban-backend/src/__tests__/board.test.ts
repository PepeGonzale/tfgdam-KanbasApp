import supertest from "supertest";
import createServer from "../utils/server";
import dbConnect from "../config/mongo";
import { IBoard } from "../interface/board.interface";
import mongoose from "mongoose";
import Board from "../models/board.model";
const app = createServer()
let token = ''
const createBoard = {
    title: "Nuevas",
    description: "hola",
    createdBy: "6415e88d2c1995cf4b150ba7"
}
describe("Boards routes", () => {
    beforeAll(async () => {
        dbConnect()

        const response = await supertest(app)
        .get("/api/auth/authenticate/user")
        token = response.body.token
    })
    afterAll(async()=> {
       return  await Board.findOneAndDelete({ title: createBoard.title });

    })
    describe("Fetching boards", () => {
      it("fetch boards", async() => {
       const {statusCode, body} = await supertest(app)
       .get("/api/boards/boards")
       .set('Accept', 'application/json')
       .set('Authorization', `Bearer ${token}`)
       .expect('Content-Type', /json/)

        console.log(body);
        
      })
      describe("Fetching boards", () => {
        it("create board", async() => {
         const {statusCode, body} = await supertest(app)
         .post("/api/boards/")
         .set('Accept', 'application/json')
         .set('Authorization', `Bearer ${token}`)
         .expect('Content-Type', /json/)
         .send(createBoard)
  
          console.log(body);
          
        })
      })
    })
   
  })