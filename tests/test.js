const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const should = chai.should();
const app = require("../api");

chai.use(chaiHttp);
chai.should();

describe("testing the /api/upload endpoint",() => {
    it("rejects requests with an empty body", (done) => {
            chai.request(app)
                .post("/api/upload")
                .type("form")
                .send({})
                .end((err, res) => {
                    should.not.exist(err);
                    expect(res).to.have.status(400);
                    done();
                });
            });
    it("reject requests with empty values", (done) => {
            chai.request(app)
                .post("/api/upload")
                .type("form")
                .send({
                    cipher: "",
                    text: ""
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
            });
    it("makes sure that the  is the is sanitized", (done) => {
            chai.request(app)
                .post("/api/upload")
                .type("form")
                .send({
                    cipher: "<?php echo $_GET['search'];?>",
                    text: "<?php echo $_GET['search'];?>"
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
            });
    it("makes sure that the input is a string", (done) => {
            chai.request(app)
                .post("/api/upload")
                .type("form")
                .send({
                    cipher: 666,
                    text: 666 
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
            });
    it("makes sure that the input length", (done) => {
            chai.request(app)
                .post("/api/upload")
                .type("form")
                .send({
                    cipher: "simple-substitution",
                    text: "the text that I am writing is way too long to be accepted" 
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
            });
    it("makes sure that the cipher is a correct type", (done) => {
            chai.request(app)
                .post("/api/upload")
                .type("form")
                .send({
                    cipher: "simpe-substitution",
                    text: "the text to be encrypted" 
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
            });
    it("make sure that a valid request has a proper response", (done) => {
            chai.request(app)
                .post("/api/upload")
                .type("form")
                .send({
                    cipher: "simple-substitution",
                    text: "the text to be encrypted" 
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
            });
});
