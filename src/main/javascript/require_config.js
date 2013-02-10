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
        jquery: "http://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min",
        underscore: "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min",
        backbone: "http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.10/backbone-min",
        sinon: "lib/sinon-1.5.2",
        text: "http://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.3/text"
    }
};
