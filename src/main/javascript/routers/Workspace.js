define([
    "jquery",
    "backbone",
    "collections/TodoList",
    "Common"
], function ($, Backbone, TodoList, Common)  {
    var Workspace = Backbone.Router.extend({
        routes: {
            "*filter": "setFilter"
        },
        setFilter: function (param) {
            Common.TodoFilter = param.trim() || "";

            // Trigger a collection filter event, causing hiding/unhiding
            // of the Todo view items
            TodoList.trigger("filter");
        }
    });

    return Workspace;
});
