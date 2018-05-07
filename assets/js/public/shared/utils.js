var CamouformsFE = CamouformsFE || {};

jQuery(function ($) {
    var constants = CamouformsFE.constants,
        errorMessageMap = {},
        hasError,
        isAlphaNumeric,
        isEmail,
        isInteger,
        isRequired,
        maxCharacters,
        minCharacters,
        maxNumber,
        minNumber,
        validateField,
        validators;

    isNotSet = function(value) {
        return value === undefined || value === '' || value === null;
    };

    isAlphaNumeric = function(value) {
        var re = /^[a-zA-Z0-9]+$/;

        return re.test(value);
    };

    isEmail = function(value) {
        if (value === '') return false;
        // Source: http://emailregex.com/
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(value);
    };

    isInteger = function(value) {
        return !(isFinite(value) && Math.floor(value) === value);
    };

    isRequired = function(value) {
        var isError = false;

        if (value === null || value === undefined || value === '') {
            isError = true;
        }

        return isError;
    };

    maxCharacters = function(value, max) {
        var isError = false;

        if (max > 0 && value.length > max) {
            isError = true;
        }

        if (isNotSet(max)) {
            isError = false;
        }

        return isError;
    };

    minCharacters = function(value, min) {
        var isError = false;

        if (min > 0 && value.length < min) {
            isError = true;
        }

        if (isNotSet(min)) {
            isError = false;
        }

        return isError;
    };

    maxWords = function(value, max) {
        var isError = false,
            words;

        words = value.trim().split(' ');

        if (max > 0 && words.length > max) {
            isError = true;
        }

        if (isNotSet(max)) {
            isError = false;
        }

        return isError;
    };

    minWords = function(value, min) {
        var isError = false,
            words;

        words = value.trim().split(' ');

        if (min > 0 && words.length < min) {
            isError = true;
        }

        if (isNotSet(min)) {
            isError = false;
        }

        return isError;
    };

    maxNumber = function(value, max) {
        var isError = false;

        if (parseInt(value, 10) === NaN) {
            return false;
        }

        if (Number(value) <= max) {
            isError = true;
        }

        return isError;
    };

    minNumber = function(value, min) {
        var isError = false;

        if (parseInt(value, 10) === NaN) {
            return false;
        }

        if (Number(value) > min) {
            isError = true;
        }

        return isError;
    };

    validators = {
        isAlphaNumeric: isAlphaNumeric,
        isEmail: isEmail,
        isInteger: isInteger,
        isRequired: isRequired,
        maxChar: maxCharacters,
        minChar: minCharacters,
        maxWords: maxWords,
        minWords: minWords,
        maxNum: maxNumber,
        minNum: minNumber,
    };

    var isRequiredMessage,
        isEmailMessage,
        minCharMessage,
        maxCharMessage,
        minWordsMessage,
        maxWordsMessage;

    isRequiredMessage =  function() {
        return 'This field is required';
    };

    isEmailMessage = function() {
        return 'This is an invalid email.';
    };

    minCharMessage = function(min) {
        return 'Minimum Characters: ' + min;
    };

    maxCharMessage = function(max) {
        return 'Maximum Characters: ' + max;
    };

    minWordsMessage = function(min) {
        return 'Minimum Words: ' + min;
    };

    maxWordsMessage = function(max) {
        return 'Maximum Words: ' + max;
    };

    errorMessageMap[constants.isRequired] = isRequiredMessage;
    errorMessageMap[constants.isEmail]    = isEmailMessage;
    errorMessageMap[constants.minChar]    = minCharMessage;
    errorMessageMap[constants.maxChar]    = maxCharMessage;
    errorMessageMap[constants.minWords]   = minWordsMessage;
    errorMessageMap[constants.maxWords]   = maxWordsMessage;

    CamouformsFE.utils = {
        validators: validators,
        errorMessageMap: errorMessageMap,
        hasError: hasError
    };

});
