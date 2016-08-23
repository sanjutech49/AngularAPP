(function () {
    "use strict";
    function instanceInfo() {
        var self = this;

        this.set = function (data) {
            self.instances = data;
        };
        
    }
    manageitModule.service('instanceInfo', [instanceInfo]);
}());