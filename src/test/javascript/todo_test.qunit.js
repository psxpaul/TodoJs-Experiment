define(["models/todo"], function (Todo) {
    module("Todo Model Test", {
        setup: function () {
            var that = this;
            that.saveCalled = {};
            that.savedTodo = {};

            $.ajax = function (opts) {
                that.saveCalled = opts;
                that.savedTodo = $.parseJSON(opts.data);
            };
        },
        teardown: function () {
        }
    });

    test("This should pass", function () {
        var toodoo = new Todo();
        equal(toodoo.get("completed"), false);
        deepEqual(this.saveCalled, {});

        toodoo.toggle();
        equal(toodoo.get("completed"), true);
        equal(this.saveCalled.dataType, "json");
        equal(this.savedTodo.completed, true);
    });
});
