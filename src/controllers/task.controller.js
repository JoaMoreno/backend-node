const Task = require('../models/Task.model');
const jwt = require('jsonwebtoken');
const taskCtrl = {};

taskCtrl.getTask = async (req, res, next) => {
    const data = await Task.find();
    res.json(data)
}

taskCtrl.createTask = async (req, res, next) => {

    const { name, description } = req.body;
    const newTask = new Task({ name, description });
    await newTask.save();

    //const token = await jwt.sign({_id: newTask._id}, process.env.SECRET_KEY);

    res.status(200).json({
        message:"Task Created"
    });
};

module.exports = taskCtrl;