<?php if (!defined( 'ABSPATH')) exit; // Exit if accessed directly ?>

<div class="cmfs-sidebar js-cmfs-sidebar">
    <div class="button-bar">
        <div class="button-bar-button js-button-bar-button-left selected">
            <div class="add-field">
                Add Field
            </div>
        </div>
        <div class="button-bar-button button-bar-button-middle js-button-bar-button-middle">
            <div class="edit-field">
                Edit Field
            </div>
        </div>
        <div class="button-bar-button js-button-bar-button-right">
            <div class="form-settings">
                Form Settings
            </div>
        </div>
    </div>

    <div class="add-field-section field-section js-button-bar-button-left selected">
        <h3 class="section-title">Basic</h3>
        <div class="button-group" data-fieldtype="js-single-line">
            <div class="field-button js-single-line-text-field">
                <div class="button-icon">
                    <i class="fas fa-text-width"></i>
                </div>
                <div class="button-title">
                    Single-line Text
                </div>
            </div>
        </div>
        <div class="button-group" data-fieldtype="js-paragraph-box">
            <div class="field-button js-paragraph-box-field">
                <div class="button-icon">
                    <i class="fas fa-paragraph"></i>
                </div>
                <div class="button-title">
                    Paragraph Box
                </div>
            </div>
        </div>
        <div class="button-group" data-fieldtype="js-checkbox">
            <div class="field-button js-checkbox-field">
                <div class="button-icon">
                    <i class="far fa-check-square"></i>
                </div>
                <div class="button-title">
                    Checkbox
                </div>
            </div>
        </div>
        <div class="button-group" data-fieldtype="js-radio">
            <div class="field-button js-radio-button-field">
                <div class="button-icon">
                    <i class="far fa-dot-circle"></i>
                </div>
                <div class="button-title">
                    Radio
                </div>
            </div>
        </div>
        <div class="button-group" data-fieldtype="js-email">
            <div class="field-button js-email-input-field">
                <div class="button-icon">
                    <i class="far fa-envelope"></i>
                </div>
                <div class="button-title">
                    Email
                </div>
            </div>
        </div>
        <div class="button-group" data-fieldtype="js-date">
            <div class="field-button js-date-input-field">
                <div class="button-icon">
                    <i class="far fa-calendar-alt"></i>
                </div>
                <div class="button-title">
                    Date
                </div>
            </div>
        </div>
        <div class="button-group" data-fieldtype="js-date">
            <div class="field-button js-time-input-field">
                <div class="button-icon">
                    <i class="far fa-clock"></i>
                </div>
                <div class="button-title">
                    Time
                </div>
            </div>
        </div>
        <div class="button-group" data-fieldtype="js-select">
            <div class="field-button js-select-menu-field">
                <div class="button-icon">
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="button-title">
                    Select
                </div>
            </div>
        </div>
        <div class="button-group" data-fieldtype="js-submit">
            <div class="field-button js-submit-button-field">
                <div class="button-icon">
                    <i class="fas fa-play"></i>
                </div>
                <div class="button-title">
                    Submit
                </div>
            </div>
        </div>
    </div>

    <div class="field-section edit-field-section js-button-bar-button-middle">
    </div>

    <div class="field-section form-settings-section js-button-bar-button-right">
        <div class="settings-row">
            <label class="editor-label">Form Name</label>
            <input type="text" class="js-form-name" />
        </div>

        <div class="settings-row">
            <label class="editor-label">Description</label>
            <textarea class="js-form-description"></textarea>
        </div>
    </div>

</div>

<!-- Edit Field Form Templates -->
<div id="js-checkbox-edit-form" class="cmfs-hidden">
    <div class="settings-row">
        <label class="editor-label">Label</label>
        <input type="text" class="js-label-editor" placeholder="Enter label..." />
    </div>

    <div class="settings-row">
        <label class="editor-label">Options</label>
        <textarea class="options-item-editor js-options-item-editor"></textarea>
    </div>

    <div class="settings-row">
        <label class="editor-label">Is Required?</label>
        <input type="checkbox" class="js-required-editor" />
    </div>
</div>

<div id="js-date-edit-form" class="cmfs-hidden">
    <div class="settings-row">
        <label class="editor-label">Label</label>
        <input type="text" class="js-label-editor" placeholder="Enter label..." />
    </div>

    <div class="settings-row">
        <label class="editor-label">Placeholder</label>
        <input type="text" class="js-placeholder-editor" placeholder="Enter a placeholder" />
    </div>

    <div class="settings-row">
        <label class="editor-label">Is Required?</label>
        <input type="checkbox" class="js-required-editor" />
    </div>
</div>

<div id="js-email-edit-form" class="cmfs-hidden">
    <div class="settings-row">
        <label class="editor-label">Label</label>
        <input type="text" class="js-label-editor" placeholder="Enter label..." />
    </div>

    <div class="settings-row">
        <label class="editor-label">Placeholder</label>
        <input type="text" class="js-placeholder-editor" placeholder="Enter a placeholder" />
    </div>

    <div class="settings-row">
        <label class="editor-label">Is Required?</label>
        <input type="checkbox" class="js-required-editor" />
    </div>
</div>

<div id="js-paragraph-edit-form" class="cmfs-hidden">
    <div class="settings-row">
        <label class="editor-label">Label</label>
        <input type="text" class="js-label-editor" placeholder="Enter label..." />
    </div>

    <div class="settings-row">
        <label class="editor-label">Placeholder</label>
        <input type="text" class="js-placeholder-editor" placeholder="Enter a placeholder" />
    </div>

    <div class="settings-row">
        <label class="editor-label">Is required?</label>
        <input type="checkbox" class="js-required-editor" />
    </div>

    <div class="settings-row">
        <div class="min-column">
            <label class="editor-label">Min</label>
            <input type="number" min="0" placeholder="0" class="js-min-char-editor" />
        </div>
        <div class="max-column">
            <label class="editor-label">Max</label>
            <input type="number" min="0" placeholder="100" class="js-max-char-editor" />
        </div>
    </div>

    <div class="settings-row">
        <select name="min-max-type" class="js-min-max-type-selector">
            <option value="characters" selected="selected">Characters</option>
            <option value="words">Words</option>
        </select>
    </div>
</div>

<div id="js-radio-edit-form" class="cmfs-hidden">
    <div class="settings-row">
        <label class="editor-label">Label</label>
        <input type="text" class="js-label-editor" placeholder="Enter label..." />
    </div>

    <div class="settings-row">
        <label class="editor-label">Options</label>
        <textarea class="js-options-item-editor"></textarea>
    </div>

    <div class="settings-row">
        <label class="editor-label">Is Required?</label>
        <input type="checkbox" class="js-required-editor" />
    </div>
</div>

<div id="js-select-edit-form" class="cmfs-hidden">
    <div class="settings-row">
        <label class="editor-label">Label</label>
        <input type="text" class="js-label-editor" placeholder="Enter label..." />
    </div>

    <div class="settings-row">
        <label class="editor-label">Options</label>
        <textarea class="js-options-item-editor"></textarea>
    </div>

    <div class="settings-row">
        <label class="editor-label">Is Required?</label>
        <input type="checkbox" class="js-required-editor" />
    </div>
</div>

<div id="js-single-line-edit-form" class="cmfs-hidden">
    <div class="settings-row">
        <label class="editor-label">Label</label>
        <input type="text" class="js-label-editor" placeholder="Enter label..." />
    </div>

    <div class="settings-row">
        <label class="editor-label">Placeholder</label>
        <input type="text" class="js-placeholder-editor" placeholder="Enter a placeholder" />
    </div>

    <div class="settings-row">
        <label class="editor-label">Is required?</label>
        <input type="checkbox" class="js-required-editor" />
    </div>

    <div class="settings-row">
        <div class="min-column">
            <label class="editor-label">Min</label>
            <input type="number" min="0" placeholder="0" class="js-min-char-editor" />
        </div>
        <div class="max-column">
            <label class="editor-label">Max</label>
            <input type="number" min="0" placeholder="100" class="js-max-char-editor" />
        </div>
    </div>

    <div class="settings-row">
        <select name="min-max-type" class="js-min-max-type-selector">
            <option value="characters" selected>Characters</option>
            <option value="words">Words</option>
        </select>
    </div>
</div>

<div id="js-submit-edit-form" class="cmfs-hidden">
    <div class="settings-row">
        <label class="editor-label">Label</label>
        <input type="text" class="js-label-editor" placeholder="Enter label..." />
    </div>

    <div class="settings-row">
        <label class="editor-label">Button Text</label>
        <input type="text" class="js-button-text-editor" />
    </div>
</div>

<div id="js-time-edit-form" class="cmfs-hidden">
    <div class="settings-row">
        <label class="editor-label">Label</label>
        <input type="text" class="js-label-editor" placeholder="Enter label..." />
    </div>

    <div class="settings-row">
        <label class="editor-label">Placeholder</label>
        <input type="text" class="js-placeholder-editor" placeholder="Enter a placeholder" />
    </div>

    <div class="settings-row">
        <label class="editor-label">Is Required?</label>
        <input type="checkbox" class="js-required-editor" />
    </div>
</div>
