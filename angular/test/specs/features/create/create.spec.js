describe('Create controller', function () {
    var $rootScope, $location;
    var createCtrl, Post, deferred;

    beforeEach(module('blog'));
    beforeEach(inject(function ($controller, _$rootScope_, _$location_, $q, _Post_) {
        $rootScope = _$rootScope_;
        $location = _$location_;
        Post = _Post_;

        // Mock Post service
        deferred = $q.defer();
        spyOn(Post, 'create').and.returnValue(deferred.promise);
        spyOn($location, 'path');

        createCtrl = $controller('CreateController', {Post: Post});
    }));

    it('should create controller with empty form', function () {
        expect(createCtrl).toBeDefined();
        expect(createCtrl.formPost).toBeDefined();
        expect(createCtrl.formPost.title).toBe('');
        expect(createCtrl.formPost.author).toBe('');
        expect(createCtrl.formPost.content).toBe('');
        expect(createCtrl.formPost.tags).toBe('');
    });

    it('should create post and redirect to show page', function () {
        deferred.resolve('CODE');
        createCtrl.formPost = 'FORM';
        createCtrl.create();
        $rootScope.$apply();

        expect(Post.create).toHaveBeenCalledWith('FORM');
        expect($location.path).toHaveBeenCalledWith('/show/CODE');
    });
});