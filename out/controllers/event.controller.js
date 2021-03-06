"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __importDefault(require("../models/events"));
var Events = require('../models/events.js');
var EventRegistration = require('../models/eventRegistration.js');
var Ship = require('../models/ship.js');
var Auth = require('./authentication.controller.js');
var RacePoint = require('../models/racePoint.js');
// Create and Save a new Event
exports.create = function (req, res) {
    //Checking if authorized 
    Auth.Authorize(req, res, "admin", function (err) {
        if (err)
            return err;
        var event = new Event(req.body);
        // Finding next eventId
        Events.findOne({}).sort('-eventId').exec(function (err, lastEvent) {
            if (err)
                return res.status(500).send({ message: err.message || "Some error occurred while retriving events" });
            if (lastEvent)
                event.eventId = lastEvent.eventId + 1;
            else
                event.eventId = 1;
            // Saving the new Event in the DB
            events_1.default.save(function (err) {
                if (err)
                    return res.send(err);
                res.status(201).json(events_1.default);
            });
        });
    });
};
//Checking if event has a route
exports.hasRoute = function (req, res) {
    RacePoint.find({ eventId: req.params.eventId }, { _id: 0, __v: 0 }, function (err, racepoints) {
        if (err)
            return res.status(500).send({ message: "false" });
        if (racepoints && racepoints.length !== 0)
            return res.status(200).send(true);
        else
            return res.status(200).send(false);
    });
};
// Retrieve and return all events from the database.
exports.findAll = function (req, res) {
    Events.find({}, { _id: 0, __v: 0 }, function (err, events) {
        if (err)
            return res.status(500).send({ message: err.message || "Some error occurred while retriving events" });
        res.status(200).json(events);
    });
};
//Get all events that the user is a participant of
var pending = 0;
exports.findFromUsername = function (req, res) {
    // Checking if authorized 
    Auth.Authorize(req, res, "all", function (err, decodedUser) {
        if (err)
            return err;
        // Finding all the ships the user owns
        var events = [];
        Ship.find({ emailUsername: decodedUser.id }, { _id: 0, __v: 0 }, function (err, ships) {
            if (err)
                return res.status(500).send({ message: err.message || "Some error occurred while retriving ships" });
            if (ships.length > 0) {
                //Finding all eventRegistrations with a ship that the user owns 
                ships.forEach(function (ship) {
                    EventRegistration.find({ shipId: ship.shipId }, { _id: 0, __v: 0 }, function (err, eventRegistrations) {
                        if (err)
                            return res.status(500).send({ message: err.message || "Some error occurred while retriving eventRegistrations" });
                        if (eventRegistrations) {
                            eventRegistrations.forEach(function (eventRegistration) {
                                pending++;
                                Ship.findOne({ shipId: eventRegistration.shipId }, { _id: 0, __v: 0 }, function (err, ship) {
                                    if (err)
                                        return res.status(500).send({ message: err.message || "Some error occurred while retriving the ship" });
                                    if (ship) {
                                        Events.findOne({ eventId: eventRegistration.eventId }, { _id: 0, __v: 0 }, function (err, event) {
                                            pending--;
                                            if (err)
                                                return res.status(500).send({ message: err.message || "Some error occurred while retriving the event" });
                                            if (event) {
                                                events.push({ "eventId": event.eventId, "name": event.name, "eventStart": event.eventStart, "eventEnd": event.eventEnd, "city": event.city, "eventRegId": eventRegistration.eventRegId, "shipName": ship.name, "teamName": eventRegistration.teamName, "isLive": event.isLive, "actualEventStart": event.actualEventStart });
                                            }
                                            if (pending == 0) {
                                                res.status(200).send(events);
                                            }
                                        });
                                    }
                                });
                            });
                        }
                    });
                });
            }
            else {
                res.status(200).send(events);
            }
        });
    });
};
// Find a single event with the given eventId
exports.findOne = function (req, res) {
    Events.findOne({ eventId: req.params.eventId }, { _id: 0, __v: 0 }, function (err, event) {
        if (err)
            return res.status(500).send({ message: "Error retrieving event with eventId " + req.params.eventId });
        if (!event)
            return res.status(404).send({ message: "Event not found with eventId " + req.params.eventId });
        res.status(200).send(event);
    });
};
//Finding and updating event with the given eventId
exports.update = function (req, res) {
    // Checking if authorized 
    Auth.Authorize(req, res, "admin", function (err) {
        if (err)
            return err;
        var newEvent = req.body;
        newEvent.eventId = req.params.eventId;
        Events.updateOne({ eventId: req.params.eventId }, newEvent, function (err, event) {
            if (err)
                return res.status(500).send({ message: err.message || "Error updating bikeRackStation with stationId " + req.params.eventId });
            if (!event)
                return res.status(404).send({ message: "BikeRackStation not found with stationId " + req.params.eventId });
            res.status(202).json(newEvent);
        });
    });
};
//Changes event property "isLive" to true
exports.StartEvent = function (req, res) {
    // Checking if authorized 
    Auth.Authorize(req, res, "admin", function (err) {
        if (err)
            return err;
        var updatedEvent = { isLive: true, actualEventStart: req.body.actualEventStart };
        Events.findOneAndUpdate({ eventId: req.params.eventId }, updatedEvent, { new: true }, function (err, event) {
            if (err)
                return res.status(500).send({ message: "Error updating event with eventId " + req.params.eventId });
            if (!event)
                return res.status(404).send({ message: "Event not found with eventId " + req.params.eventId });
            res.status(202).json(event);
        });
    });
};
//Changes event property "isLive" to false
exports.StopEvent = function (req, res) {
    // Checking if authorized 
    Auth.Authorize(req, res, "admin", function (err) {
        if (err)
            return err;
        Events.findOneAndUpdate({ eventId: req.params.eventId }, { isLive: false }, { new: true }, function (err, event) {
            if (err)
                return res.status(500).send({ message: "Error updating event with eventId " + req.params.eventId });
            if (!event)
                return res.status(404).send({ message: "Event not found with eventId " + req.params.eventId });
            else
                res.status(202).json(event);
        });
    });
};
// Delete an event with the specified eventId in the request
exports.delete = function (req, res) {
    // Checking if authorized 
    Auth.Authorize(req, res, "admin", function (err) {
        if (err)
            return err;
        // Finding and the deleting the event with the given eventId
        Events.findOneAndDelete({ eventId: req.params.eventId }, function (err, event) {
            if (err)
                return res.status(500).send({ message: "Error deleting event with eventId " + req.params.eventId });
            if (!event)
                return res.status(404).send({ message: "Event not found with eventId " + req.params.eventId });
            //Finding and deleting every EventRegistration with the given eventId
            EventRegistration.deleteMany({ eventId: req.params.eventId }, { _id: 0, __v: 0 }, function (err, eventRegs) {
                if (err)
                    return res.status(500).send({ message: "Error deleting eventRegistration with eventId " + req.params.eventId });
                //Finding and deleting every RacePoint with the given eventId
                RacePoint.deleteMany({ eventId: req.params.eventId }, { _id: 0, __v: 0 }, function (err, racepoints) {
                    if (err)
                        return res.status(500).send({ message: "Error deleting RacePoints with eventId " + req.params.eventId });
                    res.status(202).json(event);
                });
            });
        });
    });
};
