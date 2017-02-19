const assert = require('assert');
const MarioChar = require('../models/mariochar');

describe('Updating records', () => {
	
	'use strict';

	let character;

	beforeEach((done) => {
		character = new MarioChar({
			name: 'Mario',
			weight: 50
		});

		character.save().then(() => {
			done();
		});
	});

	//Create tests

	it('Updates one record from the db', (done) => {
		
		MarioChar.findOneAndUpdate({name: 'Mario'}, {name: 'Luigi'}).then((result) => {
			MarioChar.findOne({_id: character._id}).then((result) => {
				assert(result.name === 'Luigi');
				done();
			});
		});

	});

	it('Increments the weight by 1', (done) => {
		
		MarioChar.update({}, {$inc: {weight: 1}}).then((result) => {
			MarioChar.findOne({name: 'Mario'}).then((record) => {
				assert(record.weight === 51);
				done();
			});
		});

	});

});