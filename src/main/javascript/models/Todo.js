define([
    "underscore",
    "backbone"
], function (_, Backbone) {
    var Todo = Backbone.Model.extend({
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

    return Todo;
});
