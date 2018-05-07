var CamouformsApp = CamouformsApp || {};

(function() {

    var getURLParam = function(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split('&');

            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');

                if (pair[0] == variable) {
                    return pair[1].toString();
                }
            }

            return null;
        };

    CamouformsApp.utils = {
        getURLParam: getURLParam
    };

})();
