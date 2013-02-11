var require = {
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: [
                "underscore",
                "jquery"
            ],
            exports: "Backbone"
        },
        sinon: {
            exports: "sinon"
        }
    },
    paths: {
        jquery: "lib/jquery-1.8.3.min",
        underscore: "lib/underscore-1.4.4.min",
        backbone: "lib/backbone-0.9.10.min",
        sinon: "lib/sinon-1.5.2",
        text: "lib/text-2.0.5"
    }
};
