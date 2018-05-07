var CamouformsApp = CamouformsApp || {};

(function($) {

    var constants = CamouformsApp.constants,
        utils = CamouformsApp.utils,
        builder = CamouformsApp.builder;

    var formSaveSuccessResponse = function() {
        $('.js-cmfs-form-save-fail').addClass('cmfs-hidden');

        $('.js-cmfs-form-save-success').removeClass('cmfs-hidden');

        setTimeout(function() {
            $('.js-cmfs-form-save-success').addClass('cmfs-hidden');
        }, 5000);
    };

    var formSaveFailResponse = function() {
        $('.js-cmfs-form-save-success').addClass('cmfs-hidden');

        $('.js-cmfs-form-save-fail').removeClass('cmfs-hidden');
    };

    $('.js-cmfs-top-nav').on('click', '.js-save-form-button', function(e) {
        e.preventDefault();

        $('.js-cmfs-canvas input[data-field-type="date"]').removeClass('hasDatepicker');

        var formId = utils.getURLParam('id'),
            formHTML = $('.js-cmfs-canvas').html(),
            formMetaData = JSON.stringify(CamouformsApp.builder.metaData),
            formName = $('.js-form-name').val(),
            formDescription = $('.js-form-description').val();

        $.ajax({
            url: constants.AJAX_URL,
            type: 'post',
            data: {
                action: 'camouforms_save_form_html',
                form_id: formId,
                form_html: formHTML,
                form_meta_data: formMetaData,
                form_name: formName,
                form_description: formDescription
            },
            success: function() {
                formSaveSuccessResponse();
            },
            error: function() {
                formSaveFailResponse();
            }
        });
    });

    $('.js-cmfs-top-nav').on('click', '.js-preview-form', function(e) {
        e.preventDefault();

        $('.js-cmfs-canvas input[data-field-type="date"]').removeClass('hasDatepicker');

        var formId = utils.getURLParam('id'),
            formHTML = $('.js-cmfs-canvas').html(),
            formMetaData = JSON.stringify(CamouformsApp.builder.metaData),
            previewURL = constants.BASE_URL + '/camouform?camou_preview_id=' + utils.getURLParam('id');

        $.ajax({
            url: constants.AJAX_URL,
            type: 'post',
            data: {
                action: 'camouforms_save_preview',
                form_id: formId,
                form_html: formHTML,
                form_meta_data: formMetaData,
            },
            success: function() {
                window.open(previewURL, 'camouformPreviewWindow');
            }
        });
    });

})(jQuery);
