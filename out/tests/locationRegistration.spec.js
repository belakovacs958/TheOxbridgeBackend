var mongoose = require("mongoose");
var LocationRegistration = require('../models/locationRegistration.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js'); // our server.js
var should = chai.should();
chai.use(chaiHttp);
var pathToReplayLocations = ('/locationRegistrations/getreplay/');
var eventId = 2;
var numberOfLocations = 4;
describe('GET ALL locationRegistrations on event ' + eventId, function () {
    it('TEST # 1 - it should GET all the locationRegistrations on event ' + eventId, function (done) {
        chai.request('http://192.168.1.104:3000')
            .get(pathToReplayLocations + eventId)
            .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(numberOfLocations);
            done();
        });
    });
});
