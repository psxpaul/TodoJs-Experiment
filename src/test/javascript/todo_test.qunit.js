define([
    "models/Todo",
    "sinon"
], function (Todo, sinon) {
    module("Todo Model Test", {
        setup: function () {
            this.server = sinon.fakeServer.create();
        },
        teardown: function () {
            this.server.restore();
        }
    });

    test("This should pass", function () {
        var server = this.server,
            requestedTodo,
            toodoo;

        this.server.respondWith("POST", "/todo",
            [200, { "Content-Type": "application/json" }, '{ "id": 1, "title": "", "completed": false}']);

        toodoo = new Todo();
        equal(toodoo.get("completed"), false);
        equal(server.requests.length, 0);

        toodoo.toggle();
        equal(toodoo.get("completed"), true);
        equal(server.requests.length, 1);

        equal(server.requests[0].async, true);
        equal(server.requests[0].requestHeaders["Content-Type"], "application/json;charset=utf-8");

        requestedTodo = $.parseJSON(server.requests[0].requestBody);
        equal(requestedTodo.title, "");
        equal(requestedTodo.completed, true);
    });
});
