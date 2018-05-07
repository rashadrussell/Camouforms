var CamouformsFE = CamouformsFE || {};

(function() {

    var IS_REQUIRED = 'isRequired',
        IS_EMAIL    = 'isEmail',
        MIN_CHAR    = 'minimumCharacters',
        MAX_CHAR    = 'maximumCharacters',
        MIN_WORDS   = 'minimumWords',
        MAX_WORDS   = 'maximumWords',

        AJAX_URL = app_context_data.ajax_url,
        BASE_URL = app_context_data.base_url;

    CamouformsFE.constants = {
        isRequired: IS_REQUIRED,
        isEmail: IS_EMAIL,
        minChar: MIN_CHAR,
        maxChar: MAX_CHAR,
        minWords: MIN_WORDS,
        maxWords: MAX_WORDS,

        AJAX_URL: AJAX_URL,
        BASE_URL: BASE_URL
    };

}());
