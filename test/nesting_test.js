const assert = require('assert');
const mongoose = require('mongoose');
const Author = require('../models/author');

describe('Nesting records', () => {
	
	'use strict';

	// let character;

	beforeEach((done) => {
		mongoose.connection.collections.authors.drop(() => {
			done();
		})
	});


	it('Creates an author with sub-document', (done) => {
		
		let pat = new Author({
			name: 'Patrick Rothfuss',
			books: [{title: 'Name of the wind', pages: 400}]
		})


		pat.save().then(() => {
			Author.findOne({name: 'Patrick Rothfuss'}).then((record) => {
				assert(record.books.length === 1);
				done();
			});
		});

	});


	it('Adds a book to an auther', (done) => {
		
		let pat = new Author({
			name: 'Patrick Rothfuss',
			books: [{title: 'Name of the wind', pages: 400}]
		})


		pat.save().then(() => {
			Author.findOne({name: 'Patrick Rothfuss'}).then((record) => {
				record.books.push({title: 'Wise Man\'s Fear', pages: 500});
				record.save().then(() => {
					Author.findOne({name: 'Patrick Rothfuss'}).then((record) => {					
					assert(record.books.length === 2);
					done();
					});
				});
			});
		});

	});

});