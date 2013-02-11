define([
    "views/TodoApp",
    "sinon",
    "Common",
    "text!index.html"
], function (TodoApp, sinon, Common, index) {
    module("End-to-end Test", {
        setup: function () {
            this.server = sinon.fakeServer.create();
            this.testHtml = index.replace(/(\r|\n)*/g, "").replace(/^.*?body>/, "").replace(/<\/body.*$/, "");
            this.testView = $("<div>" + this.testHtml + "</div>").appendTo("body");
        },
        teardown: function () {
            this.server.restore();
            this.testView.remove();
        }
    });

    test("Start a new TodoList", function () {
        var server = this.server,
            fakeKeypress = $.Event("keypress");

        fakeKeypress.which = Common.ENTER_KEY;
        fakeKeypress.keyCode = Common.ENTER_KEY;

        server.respondWith("GET", "/todos",
            [200, { "Content-Type": "application/json" }, '[]']);
        server.respondWith("POST", "/todo",
            [200, { "Content-Type": "application/json" }, '{ "id": 1, "title": "", "completed": false}']);

        equal(server.requests.length, 0);

        new TodoApp();
        equal(server.requests.length, 1);

        equal($("#new-todo").length, 1);
        $("#new-todo").val("asdf").trigger(fakeKeypress);
        equal(server.requests.length, 2);

        //complete the todo
        //$(".toggle").click();
        //equal(server.requests.length, 3);

        //uncomplete the todo
        //$(".toggle").click();
        //equal(server.requests.length, 4);

        //delete the todo
        //$(".destroy").click();
        //equal(server.requests.length, 5);

        equal(server.requests[0].method, "GET");
        equal(server.requests[0].url, "/todos");
        equal(server.requests[0].async, true);

        equal(server.requests[1].method, "POST");
        equal(server.requests[1].url, "/todo");
        equal(server.requests[1].requestHeaders["Content-Type"], "application/json;charset=utf-8");
        equal($.parseJSON(server.requests[1].requestBody).title, "asdf");
        equal($.parseJSON(server.requests[1].requestBody).completed, false);

        //equal(server.requests[2].method, "PUT");
        //equal(server.requests[2].url, "/todo");
        //equal(server.requests[2].requestHeaders["Content-Type"], "application/json;charset=utf-8");
        //equal($.parseJSON(server.requests[2].requestBody).title, "asdf");
        //equal($.parseJSON(server.requests[2].requestBody).completed, true);
    });
});
