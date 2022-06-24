const { createUser, getAllUsers, insertNewExercise, getUserLogs } = require("./crud");


const handleNewUser = (req, res, next) => {
    createUser(req.body.username, (err, user) => {
        if (err) {
            next();
            return;
        }
        if (user) {
            user = user.toObject();
            delete user.logs;
            delete user.__v;
            req.user = user;
            next();
        }
    })
}

const handleAllUsers = (req, res, next) => {

    getAllUsers((err, data) => {
        if (err) {
            next();
            return;
        }
        if (data) {
            req.users = data.map((e, index) => {
                e = e.toObject();
                delete e.logs;
                return e;
            });
            next();
        }
    })

}

const handleCreateNewExercise = (req, res, next) => {
    insertNewExercise(req.body, (err, data) => {
        if (err) {
            next();
            return;
        }
        if (data) {
            req.exercise = {
                "_id": data._id,
                "username": data.username,
                "date": (req.body.date != "" ? new Date(req.body.date) : new Date()).toDateString(),
                "duration": req.body.duration,
                "description": req.body.description
            }
            next();
        }
    })
}


const handleUserLogs = (req, res, next) => {
    getUserLogs(req.params._id, (err, data) => {
        if (err) {
            res.json({ error: "something went wrong" })
        }
        if (data) {
            data = data.toObject();
            if (req.query.from) {
                data.logs = data.logs.filter((e, index) => (new Date(e.date) >= new Date(req.query.from)))
            }
            if (req.query.to) {

                data.logs = data.logs.filter((e, index) => (new Date(e.date) <= new Date(req.query.to)))
            }
            data.logs = data.logs.sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            }).map((e, index) => {
                e = {
                    "description": e.description,
                    "duration": parseInt(e.duration),
                    "date": new Date(e.date).toDateString()
                };
                return e;
            });
            const limitCondition = req.query.limit && (req.query.limit >= 0 && req.query.limit <= data.logs.length);

            req.userLogs = Object.assign({}, { _id: data._id }, { username: data.username }, { count: parseInt(limitCondition ? req.query.limit : data.logs.length) }, { log: limitCondition ? data.logs.slice(0, req.query.limit) : data.logs });;
            req.userLogs = {
                _id: data._id
                , username: data.username,
                count: limitCondition ? req.query.limit : data.logs.length,
                log: limitCondition ? data.logs.slice(data.logs.length - req.query.limit, data.logs.length) : data.logs
            };
            next();
        }
    })
}


exports.handleNewUser = handleNewUser;
exports.handleAllUsers = handleAllUsers;
exports.handleCreateNewExercise = handleCreateNewExercise;
exports.handleUserLogs = handleUserLogs;
