var mongoose = require('mongoose');

// drop database

function dropDatabase (done) {
    mongoose.connection.db.dropDatabase();
    if (done) {
        done();
    }
    //sometimes will need callback
}

module.exports = {
    dropDatabase: dropDatabase
}