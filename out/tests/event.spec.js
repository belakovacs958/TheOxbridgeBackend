var mongoose = require("mongoose");
var Event = require('../models/events.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js'); // our server.js
var should = chai.should();
chai.use(chaiHttp);
var pathToEvents = ('/events');
var numberOfEvents = 4;
describe('GET ALL events', function () {
    it('TEST # 1 - it should GET all the events', function (done) {
        chai.request('http://192.168.1.104:3000')
            .get(pathToEvents)
            .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(numberOfEvents);
            done();
        });
    });
});
