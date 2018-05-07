var CamouformsApp = CamouformsApp || {};

(function($) {

    var builder,
        chosenField,

        constants = CamouformsApp.constants,
        utils = CamouformsApp.utils,

        $formElementWrapperTemplate = $('<div class="cmfs-field-wrapper js-cmfs-field-wrapper" />'),
        $removeFieldTemplate = $('<div class="js-cmfs-remove-field cmfs-hidden">X</div>');

        checkboxEditForm   = $('#js-checkbox-edit-form').html(),
        dateEditForm       = $('#js-date-edit-form').html(),
        emailEditForm      = $('#js-email-edit-form').html(),
        radioEditForm      = $('#js-radio-edit-form').html(),
        selectEditForm     = $('#js-select-edit-form').html(),
        singleLineEditForm = $('#js-single-line-edit-form').html(),
        submitEditForm     = $('#js-submit-edit-form').html(),
        paragraphEditForm  = $('#js-paragraph-edit-form').html(),
        timeEditForm  = $('#js-time-edit-form').html(),

        middleTabSection   = $('.field-section.js-button-bar-button-middle'),

        metaData = {
            fieldElementId: 0,
            fieldSettings: {},
            formSettings: {}
        };

    CamouformsApp.builder = {
        metaData: metaData,
        chosenField: chosenField
    };

    builder = CamouformsApp.builder;

    var addField = function(fieldTemplateName, $formElementWrapper) {
            var metaDataFieldKey = 'fieldId' + builder.metaData.fieldElementId,
                $formField;

            $formElementWrapper.attr({
                'data-field-id': metaDataFieldKey,
                'data-field-type': fieldTemplateName
            });

            $formElementWrapper.find('label').attr('for', metaDataFieldKey);

            $formField = $formElementWrapper.find('.js-cmfs-field');

            $formElementWrapper.append($removeFieldTemplate.clone());

            $formField.attr({
                id: metaDataFieldKey,
                name: metaDataFieldKey,
                'data-field-type': fieldTemplateName
            });

            builder.metaData.fieldSettings[metaDataFieldKey]['fieldType'] = fieldTemplateName;

            $('.js-cmfs-form').append($formElementWrapper);

            if (fieldTemplateName === 'date') {
                $formElementWrapper.find('.js-cmfs-field').datepicker();
            }

            switchEditField(fieldTemplateName, metaDataFieldKey);

            builder.metaData.fieldElementId++;
        },

        switchEditField = function(fieldType, fieldId) {
            var metaDataFieldKey = fieldId,
                fieldEditForm;

            if (fieldType === 'checkbox') {
                fieldEditForm = $(checkboxEditForm);
            } else if (fieldType === 'date') {
                fieldEditForm = $(dateEditForm);
            } else if (fieldType === 'email') {
                fieldEditForm = $(emailEditForm);
            } else if (fieldType === 'single-line') {
                fieldEditForm = $(singleLineEditForm);
            } else if (fieldType === 'radio') {
                fieldEditForm = $(radioEditForm);
            } else if (fieldType === 'select') {
                fieldEditForm = $(selectEditForm);
            } else if (fieldType === 'submit') {
                fieldEditForm = $(submitEditForm);
            } else if (fieldType === 'paragraph') {
                fieldEditForm = $(paragraphEditForm);
            } else if (fieldType === 'time') {
                fieldEditForm = $(timeEditForm);
            }

            middleTabSection.html(fieldEditForm);

            if (fieldType === 'checkbox' || fieldType === 'radio') {
                builder.chosenField = $('.js-cmfs-field-wrapper[data-field-id=' + fieldId + ']');
            } else {
                builder.chosenField = $('#' + fieldId + '.js-cmfs-field');
            }

            $('.js-label-editor').val(builder.metaData.fieldSettings[metaDataFieldKey].label);
            $('.js-placeholder-editor').val(builder.metaData.fieldSettings[metaDataFieldKey].placeholder);
            $('.js-button-text-editor').val(builder.metaData.fieldSettings[metaDataFieldKey].buttonText);
            $('.js-required-editor').prop('checked', builder.metaData.fieldSettings[metaDataFieldKey].isRequired);
            $('.js-options-item-editor').val(builder.metaData.fieldSettings[metaDataFieldKey].options);
            $('.js-min-char-editor').val(builder.metaData.fieldSettings[metaDataFieldKey].minChar);
            $('.js-max-char-editor').val(builder.metaData.fieldSettings[metaDataFieldKey].maxChar);
            $('.js-min-max-type-selector').val(builder.metaData.fieldSettings[metaDataFieldKey].minMaxType);
        },

        loadData = function() {
            var formId = utils.getURLParam('id');

            if (formId === null) {
                return;
            }

            $.ajax({
                url: app_context_data.ajax_url,
                type: 'POST',
                data: {
                    action: 'camouforms_load_form_meta_data',
                    formId: formId
                },
                success: function(metaData) {
                    if (metaData) {
                        var parsedData = JSON.parse(metaData);

                        if (parsedData.form_meta_data) {
                            builder.metaData = JSON.parse(parsedData.form_meta_data);
                        }

                        $('.js-cmfs-canvas .js-cmfs-field-wrapper').first().trigger('click');

                        $('.js-form-name').val(parsedData.form_name);
                        $('.js-form-description').val(parsedData.form_description);
                    }
                }
            });
        };

    loadData();

    CamouformsApp.builder.switchEditField = switchEditField;

    $('.js-checkbox-field').click(function() {
        var $formElementWrapper = $formElementWrapperTemplate.clone(),
            fieldTemplate = $('.js-checkbox-field-template').html(),
            metaDataFieldKey = 'fieldId' + builder.metaData.fieldElementId,
            label,
            options = [];

        $formElementWrapper.html(fieldTemplate);

        label = $formElementWrapper.find('.js-cmfs-main-label').text();

        $formElementWrapper.find('.js-cmfs-option-label span').each(function() {
            options.push($(this).text());
        });

        builder.metaData.fieldSettings[metaDataFieldKey] = {
            label: label,
            options: options.join('\n')
        };

        addField('checkbox', $formElementWrapper);
    });

    $('.js-date-input-field').click(function() {
        var $formElementWrapper = $formElementWrapperTemplate.clone(),
            fieldTemplate = $('.js-date-field-template').html(),
            metaDataFieldKey = 'fieldId' + builder.metaData.fieldElementId,
            label,
            placeholder;

        $formElementWrapper.html(fieldTemplate);

        //$formElementWrapper.find('.js-cmfs-field').datepicker();

        label = $formElementWrapper.find('.js-cmfs-main-label').text();
        placeholder = $formElementWrapper.find('.js-cmfs-field').attr('placeholder');

        builder.metaData.fieldSettings[metaDataFieldKey] = {
            label: label,
            placeholder: placeholder
        };

        addField('date', $formElementWrapper);
    });

    $('.js-email-input-field').click(function() {
        var $formElementWrapper = $formElementWrapperTemplate.clone(),
            fieldTemplate = $('.js-email-field-template').html(),
            metaDataFieldKey = 'fieldId' + builder.metaData.fieldElementId,
            label,
            placeholder;

        $formElementWrapper.html(fieldTemplate);

        label = $formElementWrapper.find('.js-cmfs-main-label').text();
        placeholder = $formElementWrapper.find('.js-cmfs-field').attr('placeholder');

        builder.metaData.fieldSettings[metaDataFieldKey] = {
            label: label,
            placeholder: placeholder
        };

        addField('email', $formElementWrapper);
    });

    $('.js-paragraph-box-field').click(function() {
        var $formElementWrapper = $formElementWrapperTemplate.clone(),
            fieldTemplate = $('.js-paragraph-field-template').html(),
            metaDataFieldKey = 'fieldId' + builder.metaData.fieldElementId,
            label,
            placeholder,
            minMaxType;

        $formElementWrapper.html(fieldTemplate);

        label = $formElementWrapper.find('.js-cmfs-main-label').text();
        placeholder = $formElementWrapper.find('.js-cmfs-field').attr('placeholder');
        minMaxType = $formElementWrapper.find('.js-cmfs-field').attr('data-min-max-type');

        builder.metaData.fieldSettings[metaDataFieldKey] = {
            label: label,
            placeholder: placeholder,
            minMaxType: minMaxType
        };

        addField('paragraph', $formElementWrapper);
    });

    $('.js-radio-button-field').click(function() {
        var $formElementWrapper = $formElementWrapperTemplate.clone(),
            fieldTemplate = $('.js-radio-field-template').html(),
            metaDataFieldKey = 'fieldId' + builder.metaData.fieldElementId,
            label,
            options = [];

        $formElementWrapper.html(fieldTemplate);

        label = $formElementWrapper.find('.js-cmfs-main-label').text();

        $formElementWrapper.find('.js-cmfs-option-label span').each(function() {
            options.push($(this).text());
        });

        builder.metaData.fieldSettings[metaDataFieldKey] = {
            label: label,
            options: options.join('\n')
        };

        addField('radio', $formElementWrapper);
    });

    $('.js-select-menu-field').click(function() {
        var $formElementWrapper = $formElementWrapperTemplate.clone(),
            fieldTemplate = $('.js-select-field-template').html(),
            metaDataFieldKey = 'fieldId' + builder.metaData.fieldElementId,
            label,
            options = [];

        $formElementWrapper.html(fieldTemplate);

        label = $formElementWrapper.find('.js-cmfs-main-label').text();

        $formElementWrapper.find('.js-cmfs-field option').each(function() {
            options.push($(this).text());
        });

        builder.metaData.fieldSettings[metaDataFieldKey] = {
            label: label,
            options: options.join('\n')
        };

        addField('select', $formElementWrapper);
    });

    $('.js-single-line-text-field').click(function() {
        var $formElementWrapper = $formElementWrapperTemplate.clone(),
            fieldTemplate = $('.js-single-line-field-template').html(),
            metaDataFieldKey = 'fieldId' + builder.metaData.fieldElementId,
            label,
            placeholder,
            minMaxType;

        $formElementWrapper.html(fieldTemplate);

        label = $formElementWrapper.find('.js-cmfs-main-label').text();
        placeholder = $formElementWrapper.find('.js-cmfs-field').attr('placeholder');
        minMaxType = $formElementWrapper.find('.js-cmfs-field').attr('data-min-max-type');

        builder.metaData.fieldSettings[metaDataFieldKey] = {
            label: label,
            placeholder: placeholder,
            minMaxType: minMaxType
        };

        addField('single-line', $formElementWrapper);
    });

    $('.js-submit-button-field').click(function() {
        var $formElementWrapper = $formElementWrapperTemplate.clone(),
            fieldTemplate = $('.js-submit-field-template').html(),
            metaDataFieldKey = 'fieldId' + builder.metaData.fieldElementId,
            label,
            buttonText;

        $formElementWrapper.html(fieldTemplate);

        label = $formElementWrapper.find('.js-cmfs-main-label').text();
        buttonText = $formElementWrapper.find('.js-cmfs-field').text();

        builder.metaData.fieldSettings[metaDataFieldKey] = {
            label: label,
            buttonText: buttonText
        };

        addField('submit', $formElementWrapper);
    });

    $('.js-time-input-field').click(function() {
        var $formElementWrapper = $formElementWrapperTemplate.clone(),
            fieldTemplate = $('.js-time-field-template').html(),
            metaDataFieldKey = 'fieldId' + builder.metaData.fieldElementId,
            label,
            placeholder;

        $formElementWrapper.html(fieldTemplate);

        $formElementWrapper.find('.js-cmfs-field').timepicker();

        label = $formElementWrapper.find('.js-cmfs-main-label').text();
        placeholder = $formElementWrapper.find('.js-cmfs-field').attr('placeholder');

        builder.metaData.fieldSettings[metaDataFieldKey] = {
            label: label,
            placeholder: placeholder
        };

        addField('time', $formElementWrapper);
    });

    $('.js-cmfs-sidebar').on('input', '.js-label-editor', function(e) {
        var labelValue = $(this).val(),
            dataFieldType = builder.chosenField.attr('data-field-type'),
            metaDataFieldKey;

        if(dataFieldType === 'checkbox' || dataFieldType === 'radio') {
            metaDataFieldKey = builder.chosenField.attr('data-field-id');
        } else {
            metaDataFieldKey = builder.chosenField.attr('id');
        }

        builder.chosenField
            .closest('.js-cmfs-field-wrapper')
            .find('.js-cmfs-main-label')
            .text(labelValue);

        builder.metaData.fieldSettings[metaDataFieldKey]['label'] = labelValue;
    });

    $('.js-cmfs-sidebar').on('input', '.js-button-text-editor', function(e) {
        var buttonTextValue = $(this).val(),
            metaDataFieldKey = builder.chosenField.attr('id');

        builder.chosenField.text(buttonTextValue);

        builder.metaData.fieldSettings[metaDataFieldKey]['buttonText'] = buttonTextValue;
    });

    $('.js-cmfs-sidebar').on('input', '.js-placeholder-editor', function(e) {
        var placeholderValue = $(this).val(),
            metaDataFieldKey = builder.chosenField.attr('id');

        builder.chosenField.attr('placeholder', placeholderValue);

        builder.metaData.fieldSettings[metaDataFieldKey]['placeholder'] = placeholderValue;
    });

    $('.js-cmfs-sidebar').on('change', '.js-required-editor', function(e) {
        var dataFieldType = builder.chosenField.attr('data-field-type'),
            metaDataFieldKey;

            if (dataFieldType === 'checkbox' || dataFieldType === 'radio') {
                metaDataFieldKey = builder.chosenField.attr('data-field-id');
            } else {
                metaDataFieldKey = builder.chosenField.attr('id');
            }

        if ($(this).is(':checked')) {
            builder.chosenField
                .attr('data-is-required', true)
                .closest('.js-cmfs-field-wrapper')
                .find('.cmfs-required-icon')
                .removeClass('cmfs-hidden');
            builder.metaData.fieldSettings[metaDataFieldKey]['isRequired'] = true;
        } else {
            builder.chosenField
                .attr('data-is-required', false)
                .closest('.js-cmfs-field-wrapper')
                .find('.cmfs-required-icon')
                .addClass('cmfs-hidden');
            builder.metaData.fieldSettings[metaDataFieldKey]['isRequired'] = false;
        }
    });

    _processCheckboxRadioOptions = function(value) {
        var metaDataFieldKey = builder.chosenField.attr('data-field-id'),
            fieldType = builder.chosenField.attr('data-field-type'),
            templateSelector = '.js-' + fieldType + '-field-template',
            optionItemElements = [],
            optionItems;

            optionItems = value.split('\n').filter(function(item) {
                return item !== '';
            });

            if (optionItems.length === 0) {
                builder.chosenField.find('.option-items').html('');
                return;
            }

            optionItems.forEach(function(item) {
                var $template = $(templateSelector).find('.js-option-item-section').clone(),
                    $optionItem = $template.find('.js-cmfs-field'),
                    $optionItemLabel = $template.find('.js-cmfs-option-label'),
                    id = metaDataFieldKey + '-' + item;

                $optionItem
                    .attr({
                        id: id,
                        name: metaDataFieldKey,
                        value: item
                    });

                $optionItemLabel
                    .attr('for', id)
                    .html('<span>' + item + '</span>');

                optionItemElements.push($template);
            });

            builder.chosenField.find('.option-items').html('');

            optionItemElements.forEach(function(itemElement) {
                builder.chosenField.find('.option-items').append(itemElement);
            });

            builder.metaData.fieldSettings[metaDataFieldKey].options = optionItems.join('\n');
    };

    _processSelectOptions = function(value) {
        var metaDataFieldKey = builder.chosenField.attr('id'),
            fieldType = builder.chosenField.attr('data-field-type'),
            templateSelector = '.js-' + fieldType + '-field-template',
            optionItemElements = [],
            optionItems;

        optionItems = value.split('\n').filter(function(item) {
            return item !== '';
        });

        if (optionItems.length === 0) {
            builder.chosenField.html('');
            return;
        }

        builder.chosenField.html('');

        optionItems.forEach(function(item) {
            var $optionItem = $('<option>' + item + '</option>');

            $optionItem.attr('value', item);

            builder.chosenField.append($optionItem);
        });

        builder.metaData.fieldSettings[metaDataFieldKey].options = optionItems.join('\n');
    };

    $('.js-cmfs-sidebar').on('input', '.js-options-item-editor', function() {
        var dataFieldType = builder.chosenField.attr('data-field-type');

        if (dataFieldType === 'checkbox' || dataFieldType === 'radio') {
            _processCheckboxRadioOptions($(this).val());
        } else {
            _processSelectOptions($(this).val());
        }
    });

    $('.js-cmfs-sidebar').on('input', '.js-min-char-editor', function(e) {
        var minValue = $(this).val(),
            metaDataFieldKey = builder.chosenField.attr('id'),
            minMaxType = builder.metaData.fieldSettings[metaDataFieldKey].minMaxType || 'characters';

        builder.metaData.fieldSettings[metaDataFieldKey].minMaxType = minMaxType || 'characters';

        builder.chosenField.attr('data-min-char', minValue);
        builder.chosenField.attr('data-min-max-type', minMaxType);
        builder.metaData.fieldSettings[metaDataFieldKey]['minChar'] = minValue;
    });

    $('.js-cmfs-sidebar').on('input', '.js-max-char-editor', function(e) {
        var maxValue = $(this).val(),
            metaDataFieldKey = builder.chosenField.attr('id'),
            minMaxType = builder.metaData.fieldSettings[metaDataFieldKey].minMaxType || 'characters';

        builder.metaData.fieldSettings[metaDataFieldKey].minMaxType =  minMaxType;

        builder.chosenField.attr('data-max-char', maxValue);
        builder.chosenField.attr('data-min-max-type', minMaxType);
        builder.metaData.fieldSettings[metaDataFieldKey]['maxChar'] = maxValue;
    });

    $('.js-cmfs-sidebar').on('change', '.js-min-max-type-selector', function(e) {
        var minMaxType = $(this).val(),
            metaDataFieldKey = builder.chosenField.attr('id');

        builder.chosenField.attr('data-min-max-type', minMaxType);
        builder.metaData.fieldSettings[metaDataFieldKey]['minMaxType'] = minMaxType;
    });

    $('.button-bar-button').click(function(e) {
        $('.button-bar-button').removeClass('selected');
        $('.field-section').removeClass('selected');

        if ($(this).hasClass('js-button-bar-button-left')) {

            $('.js-button-bar-button-left').addClass('selected');

        } else if ($(this).hasClass('js-button-bar-button-middle')) {

            $('.js-button-bar-button-middle').addClass('selected');

        } else if ($(this).hasClass('js-button-bar-button-right')) {

            $('.js-button-bar-button-right').addClass('selected');

        }
    });

    $('input[data-field-type="date"]').datepicker();
    $('input[data-field-type="time"]').timepicker();

})(jQuery);
