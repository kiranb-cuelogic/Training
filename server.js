const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const Employee = require('./models/employee');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {

  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

var employee1 = new Employee({
    firstName: 'Kiran',
    lastName: 'Bangale',
    empId: 123,
    dob: new Date(),
    seniorEmp: false,
    domain: 'Development',
    emailId: 'kiranbangale@gmail.com',
    joiningDate: new Date(),
      age: 25,
      username: 'Kiran',
      availableLeaves: 21,
      phone: 1231213122
    });

  employee1.save((err) => {
    console.log('in save')
    if (err) {
        console.log('err');
    } else {
        console.log('Saved!');
        process.exit();
    }
  });
    console.log(mongoose.connection.collections);



});

http.listen(3000, () => {
  console.log('listening on *:3000');
});