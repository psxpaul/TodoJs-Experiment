require([
    "views/TodoApp",
    "routers/Workspace"
], function (TodoApp, Workspace) {
    // Initialize routing and start Backbone.history()
    new Workspace();
    Backbone.history.start();

    // Initialize the application view
    new TodoApp();
});
