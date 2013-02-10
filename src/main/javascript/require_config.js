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
        }
    },
    paths: {
        jquery: "http://cdnjs.cloudflare.com/ajax/libs/jquery/1.9.1/jquery.min",
        underscore: "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min",
        backbone: "http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.10/backbone-min",
        //backbone: "http://backbonejs.org/backbone",
        text: "http://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.3/text"
    }
};
