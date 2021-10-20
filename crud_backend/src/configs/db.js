const mongoose = require('mongoose')

const connect = () => mongoose.connect("mongodb://localhost:27017/crud_task")

module.exports = connect