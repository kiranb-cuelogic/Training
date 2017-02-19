const assert = require('assert');
const MarioChar = require('../models/mariochar');

describe('Finding records', () => {
	
	'use strict';

	let character;

	beforeEach((done) => {
		character = new MarioChar({
			name: 'Mario'
		});

		character.save().then(() => {
			done();
		});
	});

	//Create tests

	it('Finds one record from the db', (done) => {
		
		MarioChar.findOne({name: 'Mario'}).then((result) => {
			assert(result.name === 'Mario');
			done();
		});

	});

	it('Finds one record by id from the db', (done) => {
		
		MarioChar.findOne({_id: character._id}).then((result) => {
			assert(result._id.toString() === character._id.toString());
			done();
		});

	});

});