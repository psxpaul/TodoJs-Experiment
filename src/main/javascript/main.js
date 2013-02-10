require([
    "views/app",
    "routers/router"
], function (AppView, Workspace) {
    // Initialize routing and start Backbone.history()
    new Workspace();
    Backbone.history.start();

    // Initialize the application view
    new AppView();
});
