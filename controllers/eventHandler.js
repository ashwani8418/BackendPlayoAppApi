const asyncHandler = require("express-async-handler");

const EventDB = require("../models/eventsModel");
// @desc Get All the event in ascending Order 
// @route GET/api/events
//@paccess private

const getAllUpcomingEvents = asyncHandler (async (req, res) =>{
    const events = await EventDB.find ().sort ( { startDate : 1  });
    res.status(200).json({message : "Get All the upcoming events"});
});

// @desc create a new event
// @route POST/api/events
//@paccess private

const createEvent = asyncHandler ( async(req, res) =>{
    console.log("The resquest body is :", req.body);
    if(!orgName || !eventName|| !cityName || !descrp || !startDate || !startTime || !endDate || !endTime || !maxPlayer){
        res.status(400);
        throw new Error("All the fields are mandatory !");
    }
    const eventDetails =  EventDB.create({
        orgName,
        eventName,
        cityName,
        descrp,
        startDate,
        startTime,
        endDate,
        endTime,
        maxPlayer,
    });

    res.status(201).json(eventDetails);
});


// @desc Get an individual events
// @route GET/api/events/:id
//@paccess private

const getAnEvent = asyncHandler (async (req, res) =>{
    const eventDetails = await EventDB.findById(req.params.id);
    if(eventDetails){
        res.status(404);
        throw new Error("Event not found");
    }
    res.status(200).json(eventDetails);
});


// @desc Update an events
// @route PUT/api/events/:id
//@paccess private

const updateEvent = asyncHandler (async (req, res) =>{

    const eventDetails = await EventDB.findById(req.params.id);
    if(eventDetails){
        res.status(404);
        throw new Error("Event not found");
    }

    const updatedEventDetails = await EventDB.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
        )
    res.status(200).json(updatedEventDetails);
});

// @desc delete an event 
// @route DELETE/api/events/:id
//@paccess private

const deleteAnEvent = asyncHandler (async(req, res) =>{
    const eventDetails = await EventDB.findById(req.params.id);
    if(!eventDetails){
        res.status(404);
        throw new Error("Contact Not Found");
    }
    if(!eventDetails){
        res.status(400);
        throw new Error("Contact Not Found");
    }
    if(eventDetails.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User don't have authorization to delete the contacts");
    }
    await EventDB.deleteOne({_id : req.params.id});
    res.status(200).json(eventDetails);
});



module.exports =  {getAllUpcomingEvents, createEvent, getAnEvent, updateEvent, deleteAnEvent};