describe('Home page', function () {
    beforeEach(function (done) {
        browser.url('/', done);
    });

    it('should have a Blog[AngularJS] as title', function (done) {
        browser
            .getTitle(function (err, title) {
                expect(title).toBe('Blog[AngularJS]');
            })
            .call(done);
    });

    it('should redirect to create post', function(done) {
        browser
            .click('a.create')
            .getUrl(function(err, url) {
                expect(url).toContain('#/create');
            })
            .call(done);
    });

    it('should redirect back to home', function(done) {
        browser
            .click('a.create')
            .click('a.go-home')
            .getUrl(function(err, url) {
                expect(url).toContain('#/');
            })
            .call(done);
    });
});