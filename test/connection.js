const mongoose = require('mongoose');

//ES6 promises
mongoose.Promise = global.Promise;

//Connect to the db before test runs
before((done) => {

	//Connect to db
	mongoose.connect('mongodb://localhost/testaroo');

	mongoose.connection
	.once('open', () => {
		console.log('Connected!');
		done();
	})
	.on('error', (err) => {
		console.log('Connection error: '+err);
	});

});



//Drop character collection before each test
beforeEach((done) => {
	
	//Drop the collection
	mongoose.connection.collections.mariochars.drop(() => {
		done();
	});

});