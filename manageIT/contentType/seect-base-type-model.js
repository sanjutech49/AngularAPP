
(function () {
    "use strict";
    function selectBaseTypeModel() {
        var model = {},
            text = {};
            

        model.init = function () {
            model.text = text;
           
            return model;
        };

       
        return model.init();
    }
    manageitModule.factory('selectBaseTypeModel', [selectBaseTypeModel]);
}());