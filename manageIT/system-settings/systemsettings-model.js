(function () {
    "use strict";
    function SystemSettingsModel() {
        var model = {},
            text = { pageTitle: "settings", roleAdd: "System Settings" },
             showErrorMessage = false,
            showSuccessMessage = false,
            instanceId = "",
            successMessage = "",
            error = "";
        model.init = function () {
            model.text = text;
            model.showErrorMessage = showErrorMessage;
            model.showSuccessMessage = showSuccessMessage;
            model.successMessage = successMessage;
            model.error = error;
            return model;
        }

        return model.init();

    }

    systemsettingsModule.factory('SystemSettingsModel', [SystemSettingsModel]);
}());