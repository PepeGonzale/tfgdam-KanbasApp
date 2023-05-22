import supertest from "supertest";
import createServer from "../utils/server";
import dbConnect from "../config/mongo";
import { IBoard } from "../interface/board.interface";
import mongoose from "mongoose";

import Board from "../models/board.model";
const app = createServer()
let token = ''
let boardId = ''
const createBoard = {
    title: "Nuevas",
    description: "hola",
    createdBy: "6415e88d2c1995cf4b150ba7"
}
const createColumn = {
  name: "Todo",
  color: ""
}

let columnId = {}
let columnName = ''

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

        
      })
      describe("Create Board", () => {
        it("create board", async() => {
         const {statusCode, body} = await supertest(app)
         .post("/api/boards/")
         .set('Accept', 'application/json')
         .set('Authorization', `Bearer ${token}`)
         .expect('Content-Type', /json/)
         .send(createBoard)
          boardId = body._id
          
        })
      })
       describe("Create Column", () => {
        it("create column", async() => {
         const response = await supertest(app)
         .post("/api/boards/column/" + boardId)  
         .set('Accept', 'application/json')
         .set('Authorization', `Bearer ${token}`)
         .send(createColumn)
          columnId = response.body.column[0]
          
        })
      }) 
      describe("Create Task", () => {
        it("create task", async() => {
          const createTask = {
  "title": "Tarea 1",
  "description" : "Black",
  "status": columnId
}
         const response = await supertest(app)
         .post("/api/boards/task/" + boardId)  
         .set('Accept', 'application/json')
         .set('Authorization', `Bearer ${token}`)
         .send(createTask)
         .expect("Content-Type", /json/)
         .expect(200)
        expect(response.body.tasks[0].status.name).toBe("todo")
        console.log(response.body.tasks[0].status.name)
        })
      }) 
    })
   
  })