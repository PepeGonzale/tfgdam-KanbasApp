import supertest from "supertest";
import createServer from "../utils/server";
import dbConnect from "../config/mongo";


const app = createServer();
describe("board", () => {
   
  describe("fetch boards route", () => {
    describe("given the product does not exist", () => {
      it("should return a 404", async () => {
        const response = await supertest(app)
        .get(`/api/boards/boards`)
        .send()
        
      });
      /* it("should return a 404", async () => {
     
        
      }); */
      
      
    });
  });
});   