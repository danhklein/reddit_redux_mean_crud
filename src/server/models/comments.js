
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema   = mongoose.Schema;
var CommentSchema = new Schema({
    body: String,
    
    date: Date,
    user: {
        type: Schema.ObjectId,
        ref: 'UserSchema'
    }

})


var Comment = mongoose.model('discussion', CommentSchema);
/**
 * Created by danielklein on 4/17/16.
 */
