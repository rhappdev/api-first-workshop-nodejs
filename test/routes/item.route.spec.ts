import chaiHttp = require("chai-http");
import app from "../../src/application";
import { ItemDAO } from "../../src/dao/item.dao";
import * as chai from "chai";

const expect = chai.expect;
chai.use(chaiHttp);
describe("ItemRoute - Test ItemRoute endpoints", function () {
    it("getItems - Should retrieve and empty Array", (done: () => void): void => {
        chai.request(app)
            .get("/api/v1/items")
            .set("content-type", "application/json")
            .send({})
            .end((err: Error, res: any): void => {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.length).to.be.equal(0);
                done();
            });
    });
    it("getItems - Should retrieve and Item Array with one Item", (done: () => void): void => {
      const itemDAO = ItemDAO.getInstance();
      itemDAO.addItem({"description": "Description", name: "Name", id: "id"});
      chai.request(app)
          .get("/api/v1/items")
          .set("content-type", "application/json")
          .send({})
          .end((err: Error, res: any): void => {
              expect(res.statusCode).to.be.equal(200);
              expect(res.body.length).to.be.equal(1);
              expect(res.body[0].name).to.be.equal("Name");
              expect(res.body[0].description).to.be.equal("Description");
              itemDAO.deleteItem(res.body[0].id);
              done();
          });
    });

    it("createItem - Should create an item", (done: () => void): void => {
    chai.request(app)
        .post("/api/v1/items")
        .set("content-type", "application/json")
        .send({"description": "Description", name: "Name", id: "id"})
        .end((err: Error, res: any): void => {
            expect(res.statusCode).to.be.equal(201);
            expect(ItemDAO.getInstance().getItems().length).to.be.equal(1);
            done();
        });
    });
    it("updateItem - Should throw an error", (done: () => void): void => {
      const item = ItemDAO.getInstance().getItems()[0];
      chai.request(app)
          .put("/api/v1/items/" + item.id)
          .set("content-type", "application/json")
          .send({"description": "Description2", name: "Name2", id: "id222"})
          .end((err: Error, res: any): void => {
              expect(res.statusCode).to.be.equal(500);
              expect(ItemDAO.getInstance().getItems().length).to.be.equal(1);
              done();
          });
    });
    it("updateItem - Should update an item", (done: () => void): void => {
        const item = ItemDAO.getInstance().getItems()[0];
        chai.request(app)
            .put("/api/v1/items/" + item.id)
            .set("content-type", "application/json")
            .send({"description": "Description2", name: "Name2", id: item.id})
            .end((err: Error, res: any): void => {
                expect(res.statusCode).to.be.equal(202);
                expect(ItemDAO.getInstance().getItems().length).to.be.equal(1);
                expect(ItemDAO.getInstance().getItems()[0].id).to.be.equal(item.id);
                expect(ItemDAO.getInstance().getItems()[0].name).to.be.equal("Name2");
                expect(ItemDAO.getInstance().getItems()[0].description).to.be.equal("Description2");
                done();
            });
      });
    it("deleteItem - Should throw an error if item doesn't exists", (done: () => void): void => {
        chai.request(app)
            .delete("/api/v1/items/324234324-3423432-234324")
            .set("content-type", "application/json")
            .send({})
            .end((err: Error, res: any): void => {
                expect(res.statusCode).to.be.equal(500);
                done();
            });
      });
    it("updateItem - Should update an item", (done: () => void): void => {
        const item = ItemDAO.getInstance().getItems()[0];
        chai.request(app)
            .delete("/api/v1/items/" + item.id)
            .set("content-type", "application/json")
            .send({})
            .end((err: Error, res: any): void => {
                expect(res.statusCode).to.be.equal(204);
                expect(ItemDAO.getInstance().getItems().length).to.be.equal(0);
                done();
            });
      });
});
