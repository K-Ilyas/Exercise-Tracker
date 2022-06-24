const express = require("express");
const router = express.Router();
const { handleAllUsers, handleCreateNewExercise, handleUserLogs, handleNewUser } = require("../middlewares/middleware");


router.post("/exercise", (req, res) => {
    res.redirect(307, "/api/users/" + req.body.id + "/exercises");
});


router.get("/:_id/logs", handleUserLogs, (req, res) => {
    res.json(req.userLogs);
});

router.post("/:_id/exercises", handleCreateNewExercise, (req, res) => {
    res.json(req.exercise);
});

router.route("/").get(handleAllUsers, (req, res) => {
    res.json(req.users);
}).post(handleNewUser, (req, res) => {
    res.json(req.user);
});


module.exports = router;