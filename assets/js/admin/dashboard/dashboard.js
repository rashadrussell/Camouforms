var CamouformsApp = CamouformsApp || {};

jQuery(function($) {
    var loadSubmissionResults = function(submissions) {
        $('.js-cmfs-submissions-listing tbody').html('');


        for (var i = submissions.length-1; i >= 0; i--) {
            var $submissionRow = $('<tr class="form-row js-submission-row" />'),
                $checkbox = $('<td><input class="js-select-submission" type="checkbox" /></td>'),
                $formName = $('<td class="submission-form-name js-cmfs-show-modal" />'),
                $creationDate = $('<td class="submission-creation-date js-cmfs-show-modal" />'),
                submission = submissions[i],
                receivedTimeUTC = submission.received + 'Z',
                timezone = moment.tz.guess();

            $formName.text(submission.form_name || '');
            $creationDate.text(moment(receivedTimeUTC, 'YYYY-MM-DD HH:mm:ssZ', timezone).format('YYYY-MM-DD h:mma'));

            $submissionRow.attr('data-submission-id', submission.id);
            $submissionRow.append($checkbox);
            $submissionRow.append($formName);
            $submissionRow.append($creationDate);

            $('.js-cmfs-submissions-listing tbody').append($submissionRow);
        }
    };

    var initSubmissionsTable = function() {
        $('.submissions-listing-wrapper .loading-screen').css('display', 'block');

        $.ajax({
            url: CamouformsApp.constants.AJAX_URL,
            type: 'post',
            data: {
                action: 'camouforms_load_submissions',
                formId: 'all'
            },
            success: function(res) {
                var data = JSON.parse(res),
                    visiblePages = 7,
                    totalSubmissionsCount = data.totalSubmissionsCount,
                    firstPageSubmissionsCount = data.firstPageSubmissions.length,
                    totalPages;

                if (firstPageSubmissionsCount === 0) {
                    totalPages = 1;
                } else {
                    totalPages = Math.ceil(totalSubmissionsCount / firstPageSubmissionsCount);
                }

                loadSubmissionResults(data.firstPageSubmissions);

                $('.js-cmfs-pagination').twbsPagination({
                    totalPages: totalPages,
                    visiblePages: visiblePages,
                    onPageClick: function(e, selectedPage) {
                        var formSelectorVal = $('.js-cmfs-submission-form-selector').val();

                        $.ajax({
                            url: CamouformsApp.constants.AJAX_URL,
                            type: 'post',
                            data: {
                                action: 'camouforms_navigate_submissions_pagination',
                                selectedPage: selectedPage,
                                formId: formSelectorVal
                            },
                            success: function(res) {
                                var data = JSON.parse(res);

                                $('.js-cmfs-submissions-listing tbody').html('');

                                loadSubmissionResults(data.submissions);

                                $('.submissions-listing-wrapper .loading-screen').css('display', 'none');
                            }
                        });
                    }
                });
            }
        });
    }

    initSubmissionsTable();

    $('.js-cmfs-submission-form-selector').on('change', function() {
        var formId = $(this).val(),
            action = 'camouforms_load_submissions';

        $('.submissions-listing-wrapper .loading-screen').css('display', 'block');

        $.ajax({
            url: CamouformsApp.constants.AJAX_URL,
            type: 'post',
            data: {
                action: 'camouforms_load_submissions',
                formId: formId
            },
            success: function(res) {
                var data = JSON.parse(res),
                    visiblePages = 7,
                    totalSubmissionsCount = data.totalSubmissionsCount,
                    firstPageSubmissionsCount = data.firstPageSubmissions.length,
                    totalPages;

                if (firstPageSubmissionsCount === 0) {
                    totalPages = 1;
                } else {
                    totalPages = Math.ceil(totalSubmissionsCount / firstPageSubmissionsCount);
                }

                loadSubmissionResults(data.firstPageSubmissions);

                $('.submissions-listing-wrapper .loading-screen').css('display', 'none');

                $('.js-cmfs-pagination').html('');
                $('.js-cmfs-pagination').removeData('twbs-pagination');

                $('.js-cmfs-pagination').twbsPagination({
                    totalPages: totalPages,
                    visiblePages: visiblePages,
                    onPageClick: function(e, selectedPage) {
                        var formSelectorVal = $('.js-cmfs-submission-form-selector').val();

                        $('.submissions-listing-wrapper .loading-screen').css('display', 'block');

                        $.ajax({
                            url: CamouformsApp.constants.AJAX_URL,
                            type: 'post',
                            data: {
                                action: 'camouforms_navigate_submissions_pagination',
                                selectedPage: selectedPage,
                                formId: formSelectorVal
                            },
                            success: function(res) {
                                var data = JSON.parse(res);

                                loadSubmissionResults(data.submissions);

                                $('.submissions-listing-wrapper .loading-screen').css('display', 'none');
                            }
                        });
                    }
                });
            }
        });
    });


    $('.js-cmfs-submissions-listing').on('click', '.js-delete-submissions', function(e) {
        var $submissionsTable = $(e.delegateTarget),
            $checkedRows = $submissionsTable.find('.js-select-submission:checked').closest('.js-submission-row'),
            submissionIds = '',
            formId = $('.js-cmfs-submission-form-selector').val();

            if ($checkedRows.length === 0) {
                $('.js-cmfs-submissions-listing .js-select-all-submissions').attr('checked', false);
                return;
            }

            $checkedRows.each(function() {
                submissionIds += ($(this).attr('data-submission-id')) + ',';
            });

            submissionIds = submissionIds.substring(0, submissionIds.length - 1);

            $('.submissions-listing-wrapper .loading-screen').css('display', 'block');

            $.ajax({
                url: CamouformsApp.constants.AJAX_URL,
                type: 'post',
                data: {
                    action: 'camouforms_delete_submissions',
                    formId: formId,
                    submissionIds: submissionIds
                },
                success: function(res) {
                    var data = JSON.parse(res),
                        visiblePages = 7,
                        totalSubmissionsCount = data.totalSubmissionsCount,
                        firstPageSubmissionsCount = data.submissions.length,
                        totalPages;

                    if (firstPageSubmissionsCount === 0) {
                        totalPages = 1;
                    } else {
                        totalPages = Math.ceil(totalSubmissionsCount / firstPageSubmissionsCount);
                    }

                    loadSubmissionResults(data.submissions);

                    $('.js-cmfs-submissions-listing .js-select-all-submissions').attr('checked', false);

                    $('.js-cmfs-pagination').html('');
                    $('.js-cmfs-pagination').removeData('twbs-pagination');

                    $('.js-cmfs-pagination').twbsPagination({
                        totalPages: totalPages,
                        visiblePages: visiblePages,
                        onPageClick: function(e, selectedPage) {
                            var formSelectorVal = $('.js-cmfs-submission-form-selector').val();

                            $('.submissions-listing-wrapper .loading-screen').css('display', 'block');

                            $.ajax({
                                url: CamouformsApp.constants.AJAX_URL,
                                type: 'post',
                                data: {
                                    action: 'camouforms_navigate_submissions_pagination',
                                    selectedPage: selectedPage,
                                    formId: formSelectorVal
                                },
                                success: function(res) {
                                    var data = JSON.parse(res);

                                    loadSubmissionResults(data.submissions);

                                    $('.submissions-listing-wrapper .loading-screen').css('display', 'none');
                                }
                            });
                        }
                    });

                    $('.submissions-listing-wrapper .loading-screen').css('display', 'none');
                }
            });

    });

    $('.js-cmfs-submissions-listing').on('click', '.js-select-all-submissions', function(e) {
        var $submissionsTable = $(e.delegateTarget),
            $checkboxes = $submissionsTable.find('.js-select-submission');

        if ($(this).attr('checked')) {
            $checkboxes.attr('checked', true);
        } else {
            $checkboxes.attr('checked', false);
        }
    });

    $('.camouforms-form-listing').on('click', '.js-listing-form-name', function() {
        var formId = $(this).attr('data-form-id');

        window.location = window.location.href + '&id=' + formId;
    });

    $('.camouforms-form-listing').on('click', ' .js-delete-form', function() {
        var formId    = $(this).attr('data-form-id'),
            constants = CamouformsApp.constants;

        $(this).closest('.form-row').remove();

        $('.submissions-listing-wrapper .loading-screen').css('display', 'block');

        $.ajax({
            url: constants.AJAX_URL,
            type: 'post',
            data: {
                action: 'camouforms_delete_form',
                formId: formId
            },
            success: function() {
                $('.submissions-listing-wrapper .loading-screen').css('display', 'none');
            }
        });
    });

    /**
     * Create Form Modal
     */
     function closeCreateModal() {
        $('.camouforms-modal-transparency').css('display', 'none');
        $('.camouforms-create-modal').css('display', 'none');
        $('.create-form-error').addClass('hidden');
        $('.create-form-name-error').addClass('hidden');
     }

     $('.camouforms-new-form').click(function(e) {
        $('.camouforms-modal-transparency').css('display', 'block');
        $('.camouforms-create-modal').css('display', 'block');

        $(document).keyup(function(e) {
            if (e.keyCode == 27) {
                closeCreateModal();
            }
        });
     });

     $('.camouforms-close-create-modal').click(closeCreateModal);
     $('.camouforms-modal-transparency').click(closeCreateModal);


     $('.camouforms-create-modal .create-form-submit').click(function() {
        var formName = $('.camouforms-create-modal #create-form-name').val().trim(),
            formDescription = $('.camouforms-create-modal #create-form-description').val();

        if (!formName) {
            $('.create-form-name-error').removeClass('hidden');
            return;
        }

        $.ajax({
            url: CamouformsApp.constants.AJAX_URL,
            type: 'POST',
            data: {
                action: 'camouforms_create_new_form',
                form_name: formName,
                form_description: formDescription
            },
            success: function(res) {
                var resData = JSON.parse(res);

                if (resData.error && resData.error === 'NO_FORM_NAME') {
                    $('.create-form-name-error').removeClass('hidden');
                } else if (resData.error && resData.error !== 'NO_FORM_NAME') {
                    $('.create-form-error').removeClass('hidden');
                } else if (!resData.error) {
                    window.location = window.location.href + '&id=' + resData.form_id;
                    $('.create-form-name-error').addClass('hidden');
                    $('.create-form-error').addClass('hidden');
                }
            }
        });
     });

     $('.camouforms-create-modal #create-form-name').on('blur', function() {
        var value = $(this).val();

        if (value === null || value === undefined || value.trim() === '') {
            $('.create-form-name-error').removeClass('hidden');
        } else {
            $('.create-form-name-error').addClass('hidden');
        }
     });


     /**
      * Submissions Modal
      */
    function closeSubmissionsModal() {
        $('.camouforms-modal-transparency').css('display', 'none');
        $('.camouforms-submission-modal').css('display', 'none');
    }

    $('.js-cmfs-submissions-listing').on('click', '.js-cmfs-show-modal', function() {
        var submissionId = $(this).closest('.js-submission-row').attr('data-submission-id');

        $.ajax({
            url: CamouformsApp.constants.AJAX_URL,
            type: 'POST',
            data: {
                action: 'camouforms_get_submission_content',
                submissionId: submissionId
            },
            success: function(res) {
                var data = JSON.parse(res),
                    submission = JSON.parse(data.submission);

                $('.js-submission-form-name').text(data.form_name || '');

                $('.js-submission-results tbody').html('');

                submission.forEach(function(result) {
                    var row = $('<tr />'),
                        fieldEntry = $('<td />'),
                        dataEntry = $('<td />');

                    fieldEntry.text(result.label);
                    dataEntry.text(unescape(result.values.join(', ')));

                    row.append(fieldEntry);
                    row.append(dataEntry);

                    $('.js-submission-results tbody').append(row);
                });
            }
        });

        $('.camouforms-modal-transparency').css('display', 'block');
        $('.camouforms-submission-modal').css('display', 'block');

        $(document).keyup(function(e) {
            if (e.keyCode == 27) {
                closeSubmissionsModal();
            }
        });
    });

    $('.camouforms-close-submission-modal').click(closeSubmissionsModal);
    $('.camouforms-modal-transparency').click(closeSubmissionsModal);

});
