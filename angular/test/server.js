var _ = require('lodash'),
    express = require('express'),
    path = require('path'),
    router = express.Router(),
    app = express(),
    bodyParser   = require('body-parser'),
    posts = require('./posts.fixture.json');

app.use(bodyParser.json());
app.use(express["static"](path.join(__dirname, '../build')));

/**
 * find all
 */
router.get('/', function (req, res) {
    res.send(posts);
});

/**
 * create new post
 */
router.post('/', function (req, res) {
    var code = _.words(req.body.title).join('-').toLowerCase();
    var existing = _.find(posts, {code: code});
    if (existing) {
        res.sendStatus(409);
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

        res.status(201).send({code: code});
    }
});

/**
 * find by code
 */
router.get('/:code', function (req, res) {
    var post = _.find(posts, {code: req.params.code});
    if (post) {
        res.send(post);
    } else {
        res.sendStatus(404);
    }
});

/**
 * append comment in a post
 */
router.post('/:code/comments', function (req, res) {
    var post = _.find(posts, {code: req.params.code});
    if (post) {
        post.comments.push({
            createdAt: new Date(),
            author: req.body.author,
            content: req.body.content
        });
        res.status(201).end();
    } else {
        res.sendStatus(404);
    }
});

app.use('/posts', router);
var server = app.listen(3000, function () {
    console.log('Express server listening on port ' + server.address().port);
});