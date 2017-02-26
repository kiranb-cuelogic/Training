const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const domain = ['Development', 'Quality Assurance', 'Management'];
const EmployeeSchema = new Schema({
	firstName: String,
	lastName: String,
	empId: Number,
	dob: Date,
	seniorEmp: Boolean,
	domain: {emun: domain},
	emailId: {type: String, required: true, index: { unique: true }, match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
	joiningDate: {type: Date, default: Date.now},
    age: {type: Number, min: 18, max: 50},
    username: {type: String, lowercase: true, required: true, trim: true},
    availableLeaves: {type: Date, default: Date.now, expires: 60 * 60 * 31},
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        }
    }
});

const Employee = mongoose.model('employee', EmployeeSchema);
module.exports = Employee;
