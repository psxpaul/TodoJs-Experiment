define([
    "underscore",
    "backbone",
    "models/Todo"
], function (_, Backbone, Todo) {
    var TodosCollection = Backbone.Collection.extend({
        model: Todo,
        url: "/todos",
        completed: function () {
            return this.filter(function (todo) {
                return todo.get("completed");
            });
        },
        remaining: function () {
            return this.without.apply(this, this.completed());
        },
        // We keep the Todos in sequential order, despite being saved by unordered
        // GUID in the database. This generates the next order number for new items.
        nextOrder: function () {
            if (!this.length) {
                return 1;
            }
            return this.last().get("order") + 1;
        },

        // Todos are sorted by their original insertion order.
        comparator: function (todo) {
            return todo.get("order");
        }
    });

    return new TodosCollection();
});
