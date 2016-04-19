/**
 * Created by danielklein on 4/17/16.
 */
var Discussions = require('../discussion');

var data = [
    {
        title: 'How to make reddit',
        body: 'In order to make Reddit, you need low self-esteem and a winning smile.',
        img_url: 'http://thefederalistpapers.integratedmarket.netdna-cdn.com/wp-content/uploads/2011/03/5.jpg',
        comments: [
            {
            body: 'Thanks for a great post!'
        },
            {
            body:'I didn\'t think it was so great.'
        }
        ],
        meta: {
            votes: 2,
            favs: 3
        }
    }

]



function runSeed(done) {
    var discussions = new Discussions(data[0]);
    discussions.save(function(err, res) {
        done();
    })
}

module.exports = {
    runSeed: runSeed
};