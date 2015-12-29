describe('Create page', function () {
    beforeEach(function (done) {
        browser.url('/#/create', done);
    });

    it('should have a disabled create button', function(done) {
        browser
            .waitForEnabled('button.btn-create', 1000, true)
            .call(done);
    });

    it('should enable create button only if title, author and content are set', function(done) {
        browser
            .setValue('input[name="title"]', 'Introduction to Angular JS')
            .setValue('input[name="author"]', 'Abdelhakim Bachar')
            .setValue('textarea[name="content"]', 'Lorem ipsum dolor')
            .waitForEnabled('button.btn-create', 1000)
            .call(done);
    });

    it('should redirect to show after creation', function(done) {
        browser
            .setValue('input[name="title"]', 'Introduction to Angular JS')
            .setValue('input[name="author"]', 'Abdelhakim Bachar')
            .setValue('textarea[name="content"]', 'Lorem ipsum dolor')
            .waitForEnabled('button.btn-create', 1000)
            .click('button.btn-create')
            .waitUntil(function() {
                return this.getUrl(function(err, url) {
                    return url.indexOf('#/show/introduction-to-angular-js');
                })
            })
            .call(done);
    });
});