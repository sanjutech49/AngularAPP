(function () {
  "use strict";
  function environmentModel() {
    var model = {};

    model.init = function () {
      //if environemnt is development please add string "development" all smalla alphabets
        model.environment = "development";

      return model;
    };

    return model.init();

  }
  app.factory('environmentModel', [environmentModel]);
}());