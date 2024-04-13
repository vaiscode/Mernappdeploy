const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name:String,
    designation:String,
    location:String,
    salary:Number
})

const employeeModel = mongoose.model('employee',schema);
module.exports = employeeModel;