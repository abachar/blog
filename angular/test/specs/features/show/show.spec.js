describe('Show controller', function () {
    var $rootScope;
    var showCtrl, Post, findByCodeDeferred, addCommentDeferred;

    beforeEach(module('blog'));
    beforeEach(inject(function ($controller, _$rootScope_, $q, _Post_) {
        $rootScope = _$rootScope_;
        Post = _Post_;

        // Mock Post service
        findByCodeDeferred = $q.defer();
        spyOn(Post, 'findByCode').and.returnValue(findByCodeDeferred.promise);
        addCommentDeferred = $q.defer();
        spyOn(Post, 'addComment').and.returnValue(addCommentDeferred.promise);

        showCtrl = $controller('ShowController', {
            $routeParams: {code: 'CODE'},
            Post: Post
        });
    }));

    it('should create controller with empty form', function () {
        expect(showCtrl).toBeDefined();
        expect(showCtrl.formComment).toBeDefined();
        expect(showCtrl.formComment.author).toBe('');
        expect(showCtrl.formComment.content).toBe('');
    });

    it('should load requested post', function () {
        findByCodeDeferred.resolve('POST');
        $rootScope.$apply();

        expect(Post.findByCode).toHaveBeenCalledWith('CODE');
        expect(showCtrl.post).toBe('POST');
    });

    describe('when manage comments', function () {
        beforeEach(function () {
            findByCodeDeferred.resolve({comments: []});
            $rootScope.$apply();

            showCtrl.formComment.author = 'Abdelhakim Bachar';
            showCtrl.formComment.content = 'Lorem ipsum dolor';
        });

        it('should create comment', function () {
            showCtrl.send();
            $rootScope.$apply();

            expect(Post.addComment).toHaveBeenCalledWith('CODE', {author: 'Abdelhakim Bachar', content: 'Lorem ipsum dolor'});
        });

        it('should add comment to comments list and reset form', function () {
            addCommentDeferred.resolve('COMMENT');
            showCtrl.send();
            $rootScope.$apply();

            expect(showCtrl.post.comments.length).toBe(1);
            expect(showCtrl.post.comments[0].author).toBe('Abdelhakim Bachar');
            expect(showCtrl.post.comments[0].content).toBe('Lorem ipsum dolor');

            expect(showCtrl.formComment.author).toBe('');
            expect(showCtrl.formComment.content).toBe('');
        });
    });
});