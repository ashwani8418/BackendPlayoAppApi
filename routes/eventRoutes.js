const express = require("express");
const router = express.Router();

const {getAllUpcomingEvents, createEvent, getAnEvent, updateEvent, deleteAnEvent} =  require("../controllers/eventHandler");

router.route("/").get(getAllUpcomingEvents).post(createEvent);

router.route("/:id").get(getAnEvent).put(updateEvent).delete(deleteAnEvent);

module.exports = router;