define([
    "jquery",
    "backbone",
    "collections/todos",
    "common"
], function ($, Backbone, Todos, Common)  {
    var Workspace = Backbone.Router.extend({
        routes: {
            "*filter": "setFilter"
        },
        setFilter: function (param) {
            Common.TodoFilter = param.trim() || "";

            // Trigger a collection filter event, causing hiding/unhiding
            // of the Todo view items
            Todos.trigger("filter");
        }
    });

    return Workspace;
});
