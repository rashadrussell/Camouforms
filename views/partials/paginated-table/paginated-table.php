<?php if (!defined( 'ABSPATH')) exit; // Exit if accessed directly ?>

<div class="submissions-listing-wrapper">
    <table class="camouforms-submissions-listing js-cmfs-submissions-listing">
        <thead>
            <tr class="form-selector-row js-form-selector-row">
                <th class="js-delete-submissions">
                    <i class="fas fa-trash"></i>
                </th>
                <th>
                    <select class="js-cmfs-submission-form-selector">
                        <option value="all">All Forms</option>
                        <?php
                            foreach($forms as $key => $formData) {
                        ?>
                            <option value=<?php echo $formData->id; ?>>
                                <?php echo $formData->form_name; ?>
                            </option>
                        <?php
                            }
                        ?>
                    </select>
                </th>
            </tr>
            <tr class="label-row">
                <th><input class="js-select-all-submissions" type="checkbox" /></th>
                <th>Form</th>
                <th>Received</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
    <div class="js-cmfs-pagination"></div>
    <div class="loading-screen">
        <div class="loading-screen-spinner">
            <i class="fas fa-spinner fa-2x fa-spin"></i>
        </div>
        <div class="transparency"></div>
    </div>
</div>