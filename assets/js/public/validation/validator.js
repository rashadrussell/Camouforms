var CamouformsFE = CamouformsFE || {};

(function($) {

    $.fn.camouformsValidateField = function() {
        var $element  = $(this),
            fieldId   = $element.attr('id'),
            value     = $element.val(),
            utils     = CamouformsFE.utils,
            constants = CamouformsFE.constants,
            errors   = [],
            minChar  = $element.attr('data-min-char'),
            maxChar  = $element.attr('data-max-char'),
            minMaxType = $element.attr('data-min-max-type');


        if ($element.attr('data-is-required') === 'true' && utils.validators.isRequired(value)) {
            errors.push({
                type: constants.isRequired,
            });
        }

        if ($element.attr('data-is-required') === 'true' && !utils.validators.isRequired(value)) {
            errors = _.filter(errors, function(error) {
                return error.type !== constants.isRequired;
            });
        }

        if (value && $element.attr('data-field-type') === 'email' && !utils.validators.isEmail(value)) {
            errors.push({
                type: constants.isEmail
            });
        }

        if (value && $element.attr('data-field-type') === 'email' && utils.validators.isEmail(value)) {
            errors = _.filter(errors, function(error) {
                return error.type !== constants.isEmail;
            });
        }

        if (!isNaN(minChar) && minMaxType === 'characters' && utils.validators.minChar(value, minChar)) {
            errors.push({
                type: constants.minChar,
                value: minChar
            });
        }

        if (!isNaN(minChar) && minMaxType === 'characters' && !utils.validators.minChar(value, minChar)) {
            errors = _.filter(errors, function(error) {
                return error.type !== constants.minChar;
            });
        }

        if (!isNaN(maxChar) && minMaxType === 'characters' && utils.validators.maxChar(value, maxChar)) {
            errors.push({
                type: constants.maxChar,
                value: maxChar
            });
        }

        if (!isNaN(maxChar) && minMaxType === 'characters' && !utils.validators.maxChar(value, maxChar)) {
            errors = _.filter(errors, function(error) {
                return error.type !== constants.maxChar;
            });
        }

        if (!isNaN(minChar) && minMaxType === 'words' && utils.validators.minWords(value, minChar)) {
            errors.push({
                type: constants.minWords,
                value: minChar
            });
        }

        if (!isNaN(minChar) && minMaxType === 'words' && !utils.validators.minWords(value, minChar)) {
            errors = _.filter(errors, function(error) {
                return error.type !== constants.minWords;
            });
        }

        if (!isNaN(maxChar) && minMaxType === 'words' && utils.validators.maxWords(value, maxChar)) {
            errors.push({
                type: constants.maxWords,
                value: maxChar
            });
        }

        if (!isNaN(maxChar) && minMaxType === 'words' && !utils.validators.maxWords(value, maxChar)) {
            errors = _.filter(errors, function(error) {
                return error.type !== constants.maxWords;
            });
        }

        CamouformsFE.errors = errors;

        return errors;
    };

    $.fn.camouformsRevealErrors = function(errors) {
        var $element = $(this),
            utils = CamouformsFE.utils,
            errorMessage,
            error;

        if (_.isEmpty(errors)) {
            $element.closest('.js-cmfs-field-wrapper').find('.js-validation-error-section').text('');
            return;
        }

        for (var i = 0; i < errors.length; i++) {
            error = errors[i];
            errorMessage = utils.errorMessageMap[error.type](error.value);

            if (errorMessage) {
                $element.closest('.js-cmfs-field-wrapper').find('.js-validation-error-section').text(errorMessage);
                return;
            }
        }
    };

})(jQuery);