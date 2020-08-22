const mongoose = require('mongoose');

const Schema = mongoose.Schema
const bobSchema = new Schema({
    company: String,
    bobAutoCollect: String,
    bobAutoEmails: String,
    location: String,
    jobType: String,
    excludedCompanies: Array, 
    fromEmail: String,
    emailContent: String,

}, {collection: 'bob'}) 

module.exports = mongoose.model('bob', bobSchema)