(function () {
    "use strict";
    function configUrlModel() {
        var model = {};

        model.init = function () {

            model.idpUrl = "http://183.82.112.186:5000";
            model.manageITUrl = "http://localhost:3050";
            model.jobITUrl = "http://localhost:4050";
           return model;
        };

        return model.init();

    }
    app.factory('configUrlModel', [configUrlModel]);
}());