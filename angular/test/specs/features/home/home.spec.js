describe('Index controller', function () {
    var $rootScope;
    var indexCtrl, Post, deferred;

    beforeEach(module('blog'));
    beforeEach(inject(function ($controller, _$rootScope_, $q, _Post_) {
        $rootScope = _$rootScope_;
        Post = _Post_;

        // Mock Post service
        deferred = $q.defer();
        spyOn(Post, 'findAll').and.returnValue(deferred.promise);

        indexCtrl = $controller('IndexController', {Post: Post});
    }));

    it('should create controller', function () {
        deferred.resolve(['POST1', 'POST2']);
        $rootScope.$apply();

        expect(Post.findAll).toHaveBeenCalled();
        expect(indexCtrl).toBeDefined();
        expect(indexCtrl.posts.length).toBe(2);
        expect(indexCtrl.posts).toContain('POST1', 'POST2');
    });
});