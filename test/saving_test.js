const assert = require('assert');
const MarioChar = require('../models/mariochar');

describe('Saving records', () => {
	
	it('Saves a record to the db', (done) => {
	
		const character = new MarioChar({
			name: 'Mario'
		});

		character.save().then(() => {
			assert(character.isNew === false);
			done();
		});

	});

});