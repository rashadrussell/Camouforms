var CamouformsApp = CamouformsApp || {};

(function($) {
    $( "#sortable" ).sortable({
        placeholder: "sortable-placeholder-ghost"
    });

    $( "#sortable" ).disableSelection();

    $('.js-cmfs-form').on('click', '.js-cmfs-field-wrapper', function(e) {
        var fieldType = $(e.currentTarget).attr('data-field-type'),
            fieldId = $(e.currentTarget).attr('data-field-id');

        if (fieldType) {
            CamouformsApp.builder.switchEditField(fieldType, fieldId);
            $('.js-button-bar-button-middle').trigger('click');
        }
    });

    $('.js-cmfs-form').on('mouseover', '.js-cmfs-field-wrapper', function(e) {
        var $wrapper = $(this),
            $removeField = $wrapper.find('.js-cmfs-remove-field');

        $removeField.removeClass('cmfs-hidden')
                    .click(function() {
                        $wrapper.remove();
                    });
    });

    $('.js-cmfs-form').on('mouseout', '.js-cmfs-field-wrapper', function(e) {
        var $wrapper = $(this);

        $wrapper.find('.js-cmfs-remove-field')
                .addClass('cmfs-hidden');
    });

})(jQuery);
