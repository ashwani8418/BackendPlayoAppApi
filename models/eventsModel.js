const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    
    orgName: {
        type : String,
        required: [true, "Please add the Organiser Name"],
    },
    eventName: {
        type : String,
        required: [true, "Please add the Event Name"],
    },
    cityName: {
        type : String,
        required: [true, "Please add your City Name"],
    },
    descrp: {
        type : String,
        required: [true, "Please add the event description"],
    },
    startDate: {
        type : String,
        required: [true, "Please add event start Date"],
    },
    startTime: {
        type : String,
        required: [true, "Please add the event start time"],
    },
    endDate: {
        type : String,
        required: [true, "Please add event end Date"],
    },
    endTime: {
        type : String,
        required: [true, "Please add the event end time"],
    },
    maxPlayer: {
        "type" : "number",
        required: [true, "Please add maximum player number"],
    }, 
}, {
    timestamps: true,  
});

module.exports = mongoose.model("EventDB", eventSchema);