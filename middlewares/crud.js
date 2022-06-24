const userModel = require("../models/userModel");



const createUser = (username, done) => {
    let newUser = new userModel({ username: username });
    newUser.save((err, data) => {
        if (err)
            return console.log(err);
        done(null, data);
    });
}

const getAllUsers = (done) => {

    userModel.find({}, (err, data) => {
        if (err)
            return console.log(err);
        done(null, data);
    });
}


const insertNewExercise = (id, exercise, done) => {

    userModel.findById(id, (err, user) => {
        if (err)
            done(err);
        if (user) {
            let date = exercise.date && exercise.date !== "" ? new Date(exercise.date) : new Date();
            if (date !== "") {
                let newExercise = Object.assign({}, { date: date }, { duration: parseInt(exercise.duration) }, { description: exercise.description });
                user.logs.push(newExercise);
                user.save((err, data) => {
                    if (err)
                        return console.log(err);
                    done(null, data);
                })
            } else
                done(null, user);
        }
    })

}


const getUserLogs = (id, done) => {
    userModel.findById(id, (err, data) => {
        if (err)
            done(err);
        if (data)
            done(null, data);
    })
}
exports.createUser = createUser;
exports.getAllUsers = getAllUsers;
exports.insertNewExercise = insertNewExercise;
exports.getUserLogs = getUserLogs;
