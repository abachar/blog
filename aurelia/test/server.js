var _ = require('lodash'),
    express = require('express'),
    router = express.Router(),
    posts = require('./posts.fixture.json');


/**
 * find all
 */
router.get('/posts', function (req, res) {
    res.end(JSON.stringify(posts));
});

/**
 * create new post
 */
router.post('/posts', function (req, res) {
    var code = _.words(req.body.title).join('-').toLowerCase();
    var existing = _.find(posts, {code: code});
    if (existing) {
        res.statusCode = 409;
        res.end();
    } else {
        posts.push({
            code: code,
            title: req.body.title,
            createdAt: new Date(),
            author: req.body.author,
            content: req.body.content,
            tags: _.chain(req.body.tags.toLowerCase()).words().uniq().value(),
            comments: []
        });

        res.statusCode = 201;
        res.end(JSON.stringify({code: code}));
    }
});

/**
 * find by code
 */
router.get('/posts/:code', function (req, res) {
    var post = _.find(posts, {code: req.params.code});
    if (post) {
        res.end(JSON.stringify(post));
    } else {
        res.statusCode = 404;
        res.end();
    }
});

/**
 * append comment in a post
 */
router.post('/posts/:code/comments', function (req, res) {
    var post = _.find(posts, {code: req.params.code});
    if (post) {
        post.comments.push({
            createdAt: new Date(),
            author: req.body.author,
            content: req.body.content
        });
        res.statusCode = 201;
    } else {
        res.statusCode = 404;
    }
    res.end();
});

module.exports = router;