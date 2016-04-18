var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema   = mongoose.Schema;
var DiscussionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    img_url: {
        type: String,
        required: true
    },
    user: {
        type: Schema.ObjectId, ref: 'DiscussionSchema'
    },
    comments: [{
        body: String,
        date: Date,
        user: {
            type: Schema.ObjectId,
            ref: 'DiscussionSchema'
        }
    }],
    created: {
        type: Date,
        default: Date.now
    },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
});
var Discussion = mongoose.model('discussion', DiscussionSchema);