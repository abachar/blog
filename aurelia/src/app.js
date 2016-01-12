export class App {
    configureRouter(config, router) {
        config.title = 'Blog';
        config.map([
            { route: ''          , name: 'home'  , moduleId: 'features/home/home'    , nav: true, title: 'All posts' },
            { route: 'create'    , name: 'create', moduleId: 'features/create/create', nav: true, title: 'Create' },
            { route: 'show/:code', name: 'show'  , moduleId: 'features/show/show'    , nav: false }
        ]);

        this.router = router;
    }
}