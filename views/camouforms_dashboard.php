<?php
    if (!defined( 'ABSPATH')) exit; // Exit if accessed directly

    global $wpdb;
    $forms_table_name = $wpdb->prefix . 'camouforms_' . 'forms';
    $forms = $wpdb->get_results("SELECT id, form_name FROM $forms_table_name");
?>

<div class="camouforms-dashboard">
    <div class="header">
        <h1 class="camouforms-logo">
            <span class="main-text">Camouforms</span>
            <span class="secondary-text">Basic</span>
        </h1>

        <div class="camouforms-new-form">
            <div>Create New Form</div>
        </div>
    </div>

    <div class="content">
        <div class="left-column">
            <h3 class="submissions-title">Submissions</h3>
            <?php require_once('partials/paginated-table/paginated-table.php'); ?>
        </div>
        <div class="right-column">
        <h3 class="forms-listing-title">Your Forms</h3>
            <table class="camouforms-form-listing">
                <thead>
                    <tr class="label-row">
                        <th class="form-name">Form</th>
                        <th class="shortcode-label">Shortcode</th>
                        <th class="delete-form"></th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        foreach($forms as $key => $formData) {
                    ?>
                        <tr class="form-row js-form-row">
                            <td
                                class="form-name js-listing-form-name"
                                data-form-id=<?php echo $formData->id; ?>
                            >
                                <?php echo $formData->form_name; ?>
                            </td>
                            <td class="form-shortcode">[camouforms id='<?php echo $formData->id; ?>']</td>
                            <td class="delete-form js-delete-form" data-form-id=<?php echo $formData->id; ?>>
                                <i class="fas fa-trash"></i>
                            </td>
                        </tr>
                    <?php
                        }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<div class="camouforms-modal-transparency"></div>
<div class="camouforms-create-modal">
    <span class="camouforms-close-create-modal"><i class="fas fa-times"></i></span>
    <div class="create-form-name-wrapper">
        <label for="create-form-name">
            <span class="title">Form Name</span>
            <span class="required">*</span>
        </label>
        <input id="create-form-name" />
        <div class="create-form-name-error hidden">Name field required.</div>
    </div>
    <div class="create-form-description-wrapper">
        <label for="create-form-description">
            <span class="title">Description</span>
        </label>
        <textarea id="create-form-description"></textarea>
    </div>
    <div class="create-form-submit">Create Form</div>
    <div class="create-form-error hidden">Something went wrong. Please try again.</div>
</div>

<div class="camouforms-submission-modal">
    <div class="inner-wrapper">
        <span class="camouforms-close-submission-modal"><i class="fas fa-times"></i></span>
        <h2 class="js-submission-form-name"></h2>
        <table class="submission-results js-submission-results">
            <thead>
                <tr>
                    <th class="field-name">Field</th>
                    <th class="user-input">User Input</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>

