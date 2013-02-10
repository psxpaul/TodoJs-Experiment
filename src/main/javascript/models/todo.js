define([
    "underscore",
    "backbone"
], function (_, Backbone) {
    var TodoModel = Backbone.Model.extend({
        defaults: {
            title: "",
            completed: false
        },
        url: function () {
            if (typeof this.id === "undefined") {
                return "/todo";
            }

            return "/todo/" + this.id;
        },
        toggle: function () {
            this.save({
                completed: !this.get("completed")
            });
        }
    });

    return TodoModel;
});
