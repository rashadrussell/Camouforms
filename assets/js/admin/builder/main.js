var CamouformsApp = CamouformsApp || {};

jQuery(function($) {
    var utils = CamouformsApp.utils,
        constants = CamouformsApp.constants,
        formId = utils.getURLParam('id');

        loadBuilder = function(formId) {
            if (!formId) return;

            $.ajax({
                url: constants.AJAX_URL,
                type: 'post',
                data: {
                    action: 'camouforms_load_builder',
                    formId: formId
                },
                success: function(res) {
                    var data = JSON.parse(res);

                    if (!data.form_exists) {
                        return window.location.href = constants.DASHBOARD_URL;
                    }
                }
            });
        };

    loadBuilder(formId);
});