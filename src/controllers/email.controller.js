const Event = require("../models/event")
var async = require("async");
//require
var express = require("express"), 
    router = express.Router(),   
    smtpTransport = require('nodemailer-smtp-transport');
//setup nodemailer
const nodemailer = require('nodemailer');
var mailOptions = {
  from: "tregattaeasvd19@gmail.com",
  to: "",                   // from req.body.to
  subject: "Confirmation",         //from req.body.subject
  html: ""      //from req.body.message
};

//get route to send mail, from form
 function sendConfirmation (emailDetails) {
  
  console.log("send confirmation run in backend");
  mailOptions.to = emailDetails.emailUsername;
  let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com', 
    auth: {        
         user: 'tregattaeasvd19@gmail.com',        
         pass: '123abc?.'    
    }
}));
  findEvent(emailDetails.eventId, sendMail);

  
 function sendMail(event){
   mailOptions.html = event.name;
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);  
    } else {     
      console.log('Email sent: ' + info.response);  
    }   
  
     })
 }

 


   
//options

//delivery



};
async function findEvent (eventId , callback) {
  console.log(eventId + " event id")
  Event.findOne({ eventId: eventId }, { _id: 0, __v: 0 }, function (err, event) {
      if (err)
          return res.status(500).send({ message: "Error retrieving event with eventId " + req.params.eventId });
      if (!event)
          return res.status(404).send({ message: "Event not found with eventId " + req.params.eventId });
      
          mailOptions.html = event.name;
     callback(event);
     return  Promise.resolve(event)
  });
};


module.exports = {sendConfirmation};
     