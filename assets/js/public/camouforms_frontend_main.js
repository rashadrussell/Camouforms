var CamouformsFE = CamouformsFE || {};

jQuery(function($) {
    $('.js-cmfs-form').on('blur change', '.js-cmfs-field', function(e) {
        var errors = $(this).camouformsValidateField();

        $(this).camouformsRevealErrors(errors);
    });

    $('input[data-field-type="date"]').datepicker();
    $('input[data-field-type="time"]').timepicker();

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

    function prepareSubmissionData($form, submissionData) {
        var userInput = {},
            fields = [],
            submissionFieldValuePairs = [],
            fieldType,
            label;

        submissionData.forEach(function(fieldValue) {
            var field = fieldValue.name,
                value = fieldValue.value;

            if (!userInput[field]) {
                userInput[field] = {values: []};
                userInput[field].values.push(value);
                fields.push(field);
            } else {
                userInput[field].values.push(value);
            }
        });

        for (var fieldName in userInput) {
            fieldType = $form.find('.js-cmfs-field-wrapper[data-field-id='+fieldName+']').attr('data-field-type');

            if (fieldType === 'checkbox' || fieldType === 'radio') {
                label = $form.find('.js-cmfs-field-wrapper[data-field-id='+fieldName+'] .js-cmfs-main-label').text();
                userInput[fieldName].label = label;
            } else {
                label = $form.find('label[for="'+fieldName+'"] .js-cmfs-main-label').text();
                userInput[fieldName].label = label;
            }
        }

        fields.forEach(function(field) {
            var group = userInput[field];
            group.field = field;

            submissionFieldValuePairs.push(group);
        });

        return submissionFieldValuePairs;
    }

    var _validateNonOptionFields = function($field) {
        var errors = $field.camouformsValidateField(),
            isInvalidForm = !_.isEmpty(errors);

        if (isInvalidForm) {
            $field.camouformsRevealErrors(errors);
        }

        return isInvalidForm;
    };

    var _validateOptionFields = function($fieldWrapper) {
        var isRequired = $fieldWrapper.attr('data-is-required') === 'true',
            noItemsChecked = $fieldWrapper.find('input:checked').length === 0,
            isInvalidForm = false;

        if (isRequired && noItemsChecked) {
            isInvalidForm = true;
            $fieldWrapper.camouformsRevealErrors([{
                type: CamouformsFE.constants.isRequired
            }]);
        }

        return isInvalidForm;
    };

    var validateForm = function($form) {
        var isInvalidForm = false;

        $form.find('.js-cmfs-field-wrapper').each(function(index, fieldWrapper) {
            var $fieldWrapper = $(fieldWrapper),
                fieldType = $fieldWrapper.attr('data-field-type');

            if (!isInvalidForm) {
                if (fieldType === 'checkbox' || fieldType === 'radio') {
                    isInvalidForm = _validateOptionFields($fieldWrapper);
                } else {
                    isInvalidForm = _validateNonOptionFields(
                        $fieldWrapper.find('.js-cmfs-field')
                    );
                }
            } else {
                if (fieldType === 'checkbox' || fieldType === 'radio') {
                    _validateOptionFields($fieldWrapper);
                } else {
                    _validateNonOptionFields(
                        $fieldWrapper.find('.js-cmfs-field')
                    );
                }
            }

        });

        return isInvalidForm;
    };

    var submissionSuccessResponse = function($form) {
        $form.find('.js-fail-submission-response').addClass('cmfs-hidden');

        $form.find('.js-success-submission-response').removeClass('cmfs-hidden');

        setTimeout(function() {
            $form.find('.js-success-submission-response').addClass('cmfs-hidden');
        }, 5000);
    };

    var submissionFailResponse = function($form, message) {
        $form.find('.js-success-submission-response').addClass('cmfs-hidden');

        $form.find('.js-fail-submission-response-message').text(message);

        $form.find('.js-fail-submission-response').removeClass('cmfs-hidden');
    };

    var gatherFields = function($form) {
        var submissionData = [],
            fieldValues,
            fieldType,
            labelText,
            mainLabel;

        $form.find('.cmfs-field-wrapper:not([data-field-type="submit"])').each(function(idx, element) {
            fieldType = $(element).attr('data-field-type');
            fieldValues = {
                field: $(element).attr('data-field-id'),
                label: '',
                values: []
            };

            if (fieldType === 'radio' || fieldType === 'checkbox') {
                fieldValues.label = $form.find('.js-cmfs-field-wrapper[data-field-id='+fieldValues.field+'] .js-cmfs-main-label').text();
                $form.find('.cmfs-field-wrapper[data-field-type="'+fieldType+'"] .js-cmfs-field:checked').each(function(idx, input) {
                    labelText = $(input).closest('.js-option-item-section').find('.js-cmfs-option-label span').text();
                    fieldValues.values.push(labelText);
                });
            } else {
                fieldValues.label = $form.find('label[for="'+fieldValues.field+'"] .js-cmfs-main-label').text();
                fieldValues.values.push($(element).find('.js-cmfs-field').val());

            }

            submissionData.push(fieldValues);
        });

        return submissionData;
    };

    $('body').on('submit', '.js-cmfs-form', function(e) {
        e.preventDefault();

        var $form = $(this),
            isInvalidForm = validateForm($form),
            constants = CamouformsFE.constants,
            previewId = getURLParam('camou_preview_id'),
            formId,
            submissionData,
            preparedData;

        $form.find('.js-cmfs-field[data-field-type=submit]').attr('disabled', true);

        if (isInvalidForm) {
            submissionFailResponse(
                $form,
                'Form failed to submit. Please correct any errors and try again.'
            );

            $form.find('.js-cmfs-field[data-field-type=submit]').attr('disabled', false);

            return;
        }

        formId = $form.attr('data-form-id');
        preparedData = gatherFields($form);

        $.ajax({
            url: constants.AJAX_URL,
            type: 'POST',
            data: {
                action: 'camouforms_form_submit',
                form_id: formId,
                preview_id: previewId,
                submit_data: JSON.stringify(preparedData),
            },
            success: function(res) {
                var fieldErrors = JSON.parse(res)['field_errors'];

                if (!fieldErrors) {
                    submissionSuccessResponse($form);
                    $form[0].reset();
                }
            },
            error: function() {
                submissionFailResponse(
                    $form,
                    'Something went wrong. Please try again.'
                );
            },
            complete: function() {
                $form.find('.js-cmfs-field[data-field-type=submit]').attr('disabled', false);
            }
        });

    });

});
