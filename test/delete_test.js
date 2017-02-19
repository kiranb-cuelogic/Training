const assert = require('assert');
const MarioChar = require('../models/mariochar');

describe('Deleting records', () => {
	
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

	it('Deletes one record from the db', (done) => {
		
		MarioChar.findOneAndRemove({name: 'Mario'}).then((result) => {
			MarioChar.findOne({name: 'Mario'}).then((result) => {
				assert(result === null);
				done();
			});
		});

	});

});