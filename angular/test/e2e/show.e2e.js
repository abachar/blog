describe('Show page', function () {
    beforeEach(function (done) {
        browser.url('/#/show/veniam-non-reprehenderit', done);
    });

    it('should have a disabled add comment button', function(done) {
        browser
            .waitForEnabled('button.add-comment', 1000, true)
            .call(done);
    });

    it('should enable add comment button only if author and content are set', function(done) {
        browser
            .setValue('input[name="author"]', 'Abdelhakim Bachar')
            .setValue('textarea[name="content"]', 'Lorem ipsum dolor')
            .waitForEnabled('button.add-comment', 1000)
            .call(done);
    });

    it('should append comment', function(done) {
        var nbrComments;

        browser
            .elements('div[ng-repeat="comment in showCtrl.post.comments"]', function (err, response) {
                nbrComments = response.value.length;
            })
            .setValue('input[name="author"]', 'Abdelhakim Bachar')
            .setValue('textarea[name="content"]', 'Lorem ipsum dolor')
            .waitForEnabled('button.add-comment', 1000)
            .click('button.add-comment')
            .waitUntil(function() {
                return this.elements('div[ng-repeat="comment in showCtrl.post.comments"]', function (err, response) {
                    return response.value.length === nbrComments + 1;
                })
            })
            .getText('div[ng-repeat="comment in showCtrl.post.comments"]:last-of-type', function(err, text) {
                expect(text).toContain('Abdelhakim Bachar');
                expect(text).toContain('Lorem ipsum dolor');
            })
            .call(done);
    });
});