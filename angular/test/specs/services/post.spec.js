describe('Post service', function () {
    var Post, httpBackend;
    var LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.';
    var TEST_POST = {
        title: 'POST 1',
        author: 'Abdelhakim Bachar',
        content: LOREM_IPSUM,
        tags: ['T1', 'T2']
    };
    var TEST_COMMENT = {
        author: 'Abdelhakim Bachar',
        content: LOREM_IPSUM
    };

    beforeEach(module('blog'));
    beforeEach(inject(function (_Post_, $httpBackend) {
        Post = _Post_;
        httpBackend = $httpBackend;
    }));

    it('should be defined', function () {
        expect(Post).toBeDefined();
    });

    it('should load all posts', function (done) {
        httpBackend.expectGET('/posts').respond(200, ['POST1', 'POST2']);

        Post.findAll()
            .then(function (posts) {
                expect(posts.length).toBe(2);
                expect(posts).toContain('POST1', 'POST2');
                done();
            });

        httpBackend.flush();
    });

    it('should load post with code POST1', function (done) {
        httpBackend.expectGET('/posts/POST1').respond(200, 'POST1');

        Post.findByCode('POST1')
            .then(function (post) {
                expect(post).toBeDefined();
                expect(post).toBe('POST1');
                done();
            });

        httpBackend.flush();
    });

    it('should create a new post', function (done) {
        httpBackend.expectPOST('/posts', TEST_POST).respond(201, {code: 1234});

        Post.create(TEST_POST)
            .then(function (code) {
                expect(code).toBe(1234);
                done();
            });

        httpBackend.flush();
    });

    it('should add a new comment to post POST1', function () {
        httpBackend.expectPOST('/posts/POST1/comments', TEST_COMMENT).respond(201);

        Post.addComment('POST1', TEST_COMMENT);

        httpBackend.flush();
    });
});