const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    logs: [{
        _id: false,
        id: false,
        description: {
            type: String, required: true
        },
        duration:
        {
            type: Number, requird: true
        },
        date: {
            type: String, required: true
        }

    }]
});


module.exports = mongoose.model("User_", userSchema);


