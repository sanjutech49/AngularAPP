
manageitModule.filter("camelize", function () {
    return function (input, value) {
        if(input) input = input.toLowerCase();
        //if (!value) { return ''; }
        if (!input) {
            return '';
        }
        return input
        .replace(/\s(.)/g, function ($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/[^\w]/gi, '')
        .replace(/^(.)/, function ($1) {
            return $1.toLowerCase();
        });
    }
});
manageitModule.filter('dateLocalize', function () {
    return function (utcDate) {
        return new Date(utcDate + 'Z').getTime();
    }
});
