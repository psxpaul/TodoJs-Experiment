define([
    "jquery",
    "underscore",
    "backbone",
    "collections/TodoList",
    "views/TodoView",
    "text!stats.html",
    "Common"
], function ($, _, Backbone, TodoList, TodoView, statsTemplate, Common) {
    var TodoApp = Backbone.View.extend({
        el: "#todoapp",
        template: _.template(statsTemplate),
        events: {
            "keypress #new-todo":        "createOnEnter",
            "click #clear-completed":    "clearCompleted",
            "click #toggle-all":        "toggleAllComplete"
        },
        initialize: function () {
            this.allCheckbox = this.$("#toggle-all")[0];
            this.$input = this.$("#new-todo");
            this.$footer = this.$("#footer");
            this.$main = this.$("#main");

            this.listenTo(TodoList, "add", this.addOne);
            this.listenTo(TodoList, "reset", this.addAll);
            this.listenTo(TodoList, "change:completed", this.filterOne);
            this.listenTo(TodoList, "filter", this.filterAll);
            this.listenTo(TodoList, "all", this.render);

            TodoList.fetch();
        },
        render: function () {
            var completed = TodoList.completed().length;
            var remaining = TodoList.remaining().length;

            if (TodoList.length) {
                this.$main.show();
                this.$footer.show();

                this.$footer.html(this.template({
                    completed: completed,
                    remaining: remaining
                }));

                this.$("#filters li a")
                    .removeClass("selected")
                    .filter("[href='#/" + (Common.TodoFilter || "") + "']")
                    .addClass("selected");
            } else {
                this.$main.hide();
                this.$footer.hide();
            }

            this.allCheckbox.checked = !remaining;
        },
        addOne: function (todo) {
            var view = new TodoView({ model: todo });
            $("#todo-list").append(view.render().el);
        },
        addAll: function () {
            this.$("#todo-list").html("");
            TodoList.each(this.addOne, this);
        },
        filterOne: function (todo) {
            todo.trigger("visible");
        },
        filterAll: function () {
            TodoList.each(this.filterOne, this);
        },
        newAttributes: function () {
            return {
                title: this.$input.val().trim(),
                order: TodoList.nextOrder(),
                completed: false
            };
        },
        createOnEnter: function (e) {
            if (e.which !== Common.ENTER_KEY || !this.$input.val().trim()) {
                return;
            }

            TodoList.create(this.newAttributes());
            this.$input.val("");
        },
        clearCompleted: function () {
            _.invoke(TodoList.completed(), "destroy");
            return false;
        },
        toggleAllComplete: function () {
            var completed = this.allCheckbox.checked;

            TodoList.each(function (todo) {
                todo.save({
                    "completed": completed
                });
            });
        }
    });

    return TodoApp;
});
