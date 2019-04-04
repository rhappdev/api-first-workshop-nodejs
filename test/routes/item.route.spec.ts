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
});
