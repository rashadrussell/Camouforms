<?php
    if (!defined( 'ABSPATH')) exit; // Exit if accessed directly

    global $wpdb, $forms_table_name;
    $formId = $_GET['id'];
    $formData = $wpdb->get_row("SELECT id, form_html FROM $forms_table_name WHERE id=$formId");

    if (is_null($formData)) {
        return '';
    }
?>

<div class="cmfs-canvas js-cmfs-canvas">
    <form
        id="sortable"
        class="camouforms-form js-cmfs-form"
        data-form-id=<?php echo($formId); ?>
    >
        <?php echo(stripcslashes($formData->form_html)); ?>
    </form>
</div>

<div class="cmfs-hidden js-checkbox-field-template">
    <fieldset>
        <legend class="fieldset-legend">
            <span class="js-cmfs-main-label cmfs-main-label">Check all that apply</span>
            <span title="Field is required." class="cmfs-required-icon cmfs-hidden">*</span>
        </legend>
        <div class="option-items">
            <div class="option-item-section js-option-item-section">
                <input
                    id="checkbox-1"
                    type="checkbox"
                    name="camou-checkbox"
                    class="js-cmfs-field form-element-checkbox"
                />
                <label class="js-cmfs-option-label" for="checkbox-1">
                    <span>Item 1</span>
                </label>
            </div>
        </div>
        <div class="validation-error-section js-validation-error-section"></div>
    </fieldset>
</div>

<div class="cmfs-hidden js-date-field-template">
    <label for="date-field">
        <span class="label-inner-wrapper">
            <span class="js-cmfs-main-label cmfs-main-label">Date</span>
            <span title="Field is required." class="cmfs-required-icon cmfs-hidden">*</span>
        </span>
    </label>
    <input type="text" placeholder="YYYY-MM-DD" class="js-cmfs-field form-element-date" />
    <div class="validation-error-section js-validation-error-section"></div>
</div>

<div class="cmfs-hidden js-email-field-template">
    <label for="email-field">
        <span class="label-inner-wrapper">
            <span class="js-cmfs-main-label cmfs-main-label">Email Address</span>
            <span title="Field is required." class="cmfs-required-icon cmfs-hidden">*</span>
        </span>
    </label>
    <input id="email-field" placeholder="Enter email" class="js-cmfs-field form-element-email" />
    <div class="validation-error-section js-validation-error-section"></div>
</div>

<div class="cmfs-hidden js-paragraph-field-template">
    <label for="paragraph-field">
        <span class="label-inner-wrapper">
            <span class="js-cmfs-main-label cmfs-main-label">Comment</span>
            <span title="Field is required." class="cmfs-required-icon cmfs-hidden">*</span>
        </span>
    </label>
    <textarea
        id="paragraph-field"
        class="js-cmfs-field form-element-paragraph"
        placeholder="Enter some text..."
        data-min-max-type="characters"
    ></textarea>
    <div class="validation-error-section js-validation-error-section">
    </div>
</div>

<div class="cmfs-hidden js-radio-field-template">
    <fieldset>
        <legend class="fieldset-legend">
            <span class="js-cmfs-main-label cmfs-main-label">Check an option</span>
            <span title="Field is required." class="cmfs-required-icon cmfs-hidden">*</span>
        </legend>
        <div class="option-items">
            <div class="option-item-section js-option-item-section">
                <input
                    id="radio-1"
                    type="radio"
                    name="camou-radio"
                    class="js-cmfs-field form-element-radio"
                />
                <label class="js-cmfs-option-label" for="radio-1">
                    <span>Item 1</span>
                </label>
            </div>
        </div>
        <div class="validation-error-section js-validation-error-section"></div>
    </fieldset>
</div>

<div class="cmfs-hidden js-select-field-template">
    <label for="select-field">
        <span class="label-inner-wrapper">
            <span class="js-cmfs-main-label cmfs-main-label">Select an item</span>
            <span title="Field is required." class="cmfs-required-icon cmfs-hidden">*</span>
        </span>
    </label>
    <select id="select-field" class="js-cmfs-field form-element-select">
        <option value="Apple">Apple</option>
        <option value="Banana">Banana</option>
        <option value="Pear">Pear</option>
    </select>
    <div class="validation-error-section js-validation-error-section"></div>
</div>

<div class="cmfs-hidden js-single-line-field-template">
    <label for="single-line-text">
        <span class="label-inner-wrapper">
            <span class="js-cmfs-main-label cmfs-main-label">Enter text</span>
            <span title="Field is required." class="cmfs-required-icon cmfs-hidden">*</span>
        </span>
    </label>
    <input
        id="single-line-text"
        class="js-cmfs-field form-element-one-line-text"
        placeholder="Enter some text..."
        data-min-max-type="characters"
    />
    <div class="validation-error-section js-validation-error-section"></div>
</div>

<div class="cmfs-hidden js-submit-field-template">
    <label for="submit-field">
        <span class="label-inner-wrapper">
            <span class="js-cmfs-main-label cmfs-main-label"></span>
        </span>
    </label>
    <button id="submit-field" type="submit" class="js-cmfs-field form-element-button">Submit</button>
    <div class="js-submission-response-section">
        <div class="fail-submission-response js-fail-submission-response cmfs-hidden">
            <div class="fail-submission-response-message js-fail-submission-response-message"></div>
        </div>
        <div class="success-submission-response js-success-submission-response cmfs-hidden">
            <div class="success-submission-response-message">Message Sent!</div>
        </div>
    </div>
</div>

<div class="cmfs-hidden js-time-field-template">
    <label for="time-field">
        <span class="label-inner-wrapper">
            <span class="js-cmfs-main-label cmfs-main-label">Time</span>
            <span title="Field is required." class="cmfs-required-icon cmfs-hidden">*</span>
        </span>
    </label>
    <input type="text" class="js-cmfs-field form-element-time" placeholder="8:00am" />
    <div class="validation-error-section js-validation-error-section"></div>
</div>
