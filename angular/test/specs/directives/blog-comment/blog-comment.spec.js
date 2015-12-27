describe('Blog comment directive', function() {
    var $compile,
        scope,
        element,
        commentDate = new Date(2020, 0, 14);

    beforeEach(module('blog'));
    beforeEach(inject(function(_$compile_, $rootScope){
        $compile = _$compile_;
        scope = $rootScope.$new();

        scope.comment = {
            createdAt: commentDate,
            author: 'Abdelhakim Bachar',
            content: 'Lorem ipsum dolor'
        };

        element = $compile('<div blog-comment="comment"></div>')(scope);
        scope.$digest();
    }));

    it('should format createdAt date to DD MMMM YYYY', function() {
        expect(element.isolateScope().createdAt).toBe(moment(commentDate).format("DD MMMM YYYY"));
    });

    it('should contain author, content and formated createdAt', function() {
        var html = element.html();
        expect(html).toContain('Posted on <time class="label label-info ng-binding">' + moment(commentDate).format("DD MMMM YYYY") + '</time>');
        expect(html).toContain('by <strong class="ng-binding">Abdelhakim Bachar</strong>');
        expect(html).toContain('<p ng-bind-html="comment.content | nl2br" class="ng-binding">Lorem ipsum dolor</p>');
    });
});


