const {Schema, model} = require('mongoose');

const taskSchema = new Schema({
    name: String,
    description: String
},{
    timestamps: true
});

module.exports = model("Task", taskSchema);