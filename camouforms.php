<?php
if (!defined( 'ABSPATH')) exit; // Exit if accessed directly

/*
    Plugin Name: Camouforms
    Description: A simple drag and drop form builder.
    Version: 1.0.0
    Author: Rashad Russell
    Author URI: rashadrussell.com
    License: GPL2
    License URL: https://www.gnu.org/licenses/gpl-2.0.html
*/

global $wpdb, $forms_table_name, $preview_forms_table_name, $submissions_table_name;
$forms_table_name = $wpdb->prefix . 'camouforms_forms';
$preview_forms_table_name = $wpdb->prefix . 'camouforms_previews';
$submissions_table_name = $wpdb->prefix . 'camouforms_submissions';


function camouforms_plugin_dir_path_join($filePath) {
    return path_join(plugin_dir_url(__FILE__), $filePath);
}

function camouforms_sanitize_html($html) {
    return wp_kses(
        $html,
        array(
            'button' => array(
                'class' => array(),
                'data-field-type' => array(),
                'id' => array(),
                'name' => array(),
                'type' => array()
            ),
            'div' => array(
                'class' => array(),
                'data-field-id' => array(),
                'data-field-type' => array(),
                'data-is-required' => array(),
                'id' => array(),
            ),
            'fieldset' => array(
                'class' => array(),
                'id' => array(),
            ),
            'form' => array(
                'class' => array(),
                'data-form-id' => array(),
                'id' => array(),
            ),
            'input' => array(
                'class' => array(),
                'data-field-type' => array(),
                'data-is-required' => array(),
                'data-min-char' => array(),
                'data-min-max-type' => array(),
                'id' => array(),
                'name' => array(),
                'placeholder' => array(),
                'type' => array()
            ),
            'label' => array(
                'class' => array(),
                'for' => array(),
                'id' => array(),
            ),
            'legend' => array(
                'class' => array(),
                'id' => array(),
            ),
            'option' => array(
                'class' => array(),
                'id' => array(),
                'value' => array()
            ),
            'select' => array(
                'class' => array(),
                'data-field-type' => array(),
                'data-is-required' => array(),
                'id' => array(),
                'name' => array()
            ),
            'span' => array(
                'class' => array(),
                'id' => array(),
                'title' => array()
            ),
            'textarea' => array(
                'class' => array(),
                'data-field-type' => array(),
                'data-is-required' => array(),
                'data-min-char' => array(),
                'data-max-char' => array(),
                'data-min-max-type' => array(),
                'id' => array(),
                'name' => array(),
                'placeholder' => array()
            )
        )
    );
}


function camouforms_install() {
    global $wpdb, $forms_table_name, $submissions_table_name, $preview_forms_table_name;

    $charset_collate = $wpdb->get_charset_collate();

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

    $sql = "CREATE TABLE IF NOT EXISTS $forms_table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        form_name text,
        form_description text,
        form_html text,
        form_meta_data text,
        PRIMARY KEY (id)
    ) $charset_collate;";
    dbDelta($sql);

    $sql = "CREATE TABLE IF NOT EXISTS $preview_forms_table_name (
        form_id mediumint(9) NOT NULL,
        form_html text,
        form_meta_data text,
        PRIMARY KEY (form_id)
    ) $charset_collate;";
    dbDelta($sql);

    $sql = "CREATE TABLE IF NOT EXISTS $submissions_table_name (
        id mediumint(9) NOT NULL AUTO_INCREMENT,
        form_id mediumint(9) NOT NULL,
        received datetime NOT NULL,
        submission text NOT NULL,
        PRIMARY KEY (id)
    ) $charset_collate;";
    dbDelta($sql);
}
register_activation_hook(__FILE__, 'camouforms_install');


function camouforms_page_html() {
    wp_enqueue_style('camouforms_form_styles');
    wp_enqueue_style('camouforms_builder_styles');
    wp_enqueue_style('camouforms_dashboard_styles');

    wp_enqueue_style('tooltipster');
    wp_enqueue_style('tooltipster-theme-light');
    wp_enqueue_style('timepicker-css');
    wp_enqueue_style('jquery-ui-css');

    wp_enqueue_script('jquery-ui-sortable');
    wp_enqueue_script('tooltipster');
    wp_enqueue_script('timepicker-js');
    wp_enqueue_script('esimakin-twbs-pagination');
    wp_enqueue_script('momentjs');
    wp_enqueue_script('moment-timezone');

    wp_enqueue_script('camouforms_admin_constants');
    wp_enqueue_script('camouforms_admin_utils');
    wp_enqueue_script('camouforms_dashboard');
    wp_enqueue_script('camouforms_admin_form_canvas');
    wp_enqueue_script('camouforms_admin_nav_bar');
    wp_enqueue_script('camouforms_admin_utility_bar');
    wp_enqueue_script('camouforms_admin_builder_main');

    if (isset($_GET['id'])) {
        require_once('views/camouforms_builder.php');
    } else {
        require_once('views/camouforms_dashboard.php');
    }
}


add_action('admin_menu', 'camouforms_render_admin_app');
function camouforms_render_admin_app() {
    add_menu_page(
        'Camouforms',
        'Camouforms',
        'manage_options',
        'camouforms',
        'camouforms_page_html',
        'none',
        '32'
    );
    add_action('admin_enqueue_scripts', 'camouforms_register_admin_scripts');
}


function camouforms_register_admin_styles() {
    wp_register_style('camouforms_form_styles', camouforms_plugin_dir_path_join('assets/css/form_styles.css'));
    wp_register_style('camouforms_builder_styles', camouforms_plugin_dir_path_join('assets/css/admin/builder.css'));
    wp_register_style('camouforms_dashboard_styles', camouforms_plugin_dir_path_join('assets/css/admin/dashboard.css'));

    wp_register_style('timepicker-css', camouforms_plugin_dir_path_join('assets/lib/timepicker/jquery.timepicker.css'));

    wp_register_style('tooltipster', camouforms_plugin_dir_path_join('assets/lib/tooltipster/tooltipster.bundle.min.css'));
    wp_register_style('tooltipster-theme-light', camouforms_plugin_dir_path_join('assets/lib/tooltipster/themes/tooltipster-sideTip-light.min.css'));

    wp_enqueue_style('camouforms_admin_base_css', camouforms_plugin_dir_path_join('assets/css/camouforms_admin_base.css'));
}


function camouforms_register_admin_js_scripts() {
    wp_register_script('timepicker-js', camouforms_plugin_dir_path_join('assets/lib/timepicker/jquery.timepicker.js'));

    wp_register_script(
        'fontawesome',
        camouforms_plugin_dir_path_join('assets/lib/fontawesome/fontawesome-all.min.js')
    );
    wp_register_script(
        'tooltipster',
        camouforms_plugin_dir_path_join('assets/lib/tooltipster/tooltipster.bundle.min.js'),
        array('jquery')
    );
    wp_register_script(
        'esimakin-twbs-pagination',
        camouforms_plugin_dir_path_join('assets/lib/esimakin-twbs-pagination/jquery.twbsPagination.min.js'),
        array('jquery')
    );
    wp_register_script(
        'momentjs',
        camouforms_plugin_dir_path_join('assets/lib/momentjs/moment.js')
    );
    wp_register_script(
        'moment-timezone',
        camouforms_plugin_dir_path_join('assets/lib/momentjs/moment-timezone.js')
    );


    wp_register_script(
        'camouforms_admin_constants',
        camouforms_plugin_dir_path_join('assets/js/admin/shared/constants.js')
    );
    wp_register_script(
        'camouforms_admin_utils',
        camouforms_plugin_dir_path_join('assets/js/admin/shared/utils.js')
    );
    wp_register_script(
        'camouforms_dashboard',
        camouforms_plugin_dir_path_join('assets/js/admin/dashboard/dashboard.js'),
        array('jquery', 'momentjs', 'moment-timezone', 'camouforms_admin_constants')
    );
    wp_register_script(
        'camouforms_admin_nav_bar',
        camouforms_plugin_dir_path_join('assets/js/admin/builder/nav-bar.js'),
        array('jquery', 'camouforms_admin_constants', 'camouforms_admin_utils')
    );
    wp_register_script(
        'camouforms_admin_form_canvas',
        camouforms_plugin_dir_path_join('assets/js/admin/builder/form-canvas.js'),
        array('jquery', 'jquery-ui-datepicker', 'timepicker-js', 'camouforms_admin_constants', 'camouforms_admin_utils')
    );
    wp_register_script(
        'camouforms_admin_utility_bar',
        camouforms_plugin_dir_path_join('assets/js/admin/builder/utility-bar.js'),
        array('jquery', 'jquery-ui-datepicker', 'timepicker-js', 'fontawesome', 'camouforms_admin_constants', 'camouforms_admin_utils')
    );
    wp_register_script(
        'camouforms_admin_builder_main',
        camouforms_plugin_dir_path_join('assets/js/admin/builder/main.js'),
        array('jquery', 'camouforms_admin_constants', 'camouforms_admin_utils')
    );
    wp_localize_script(
        'camouforms_admin_constants',
        'app_context_data',
        array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'base_url' => get_site_url(),
            'dashboard_url' => admin_url('admin.php?page=camouforms'),
        )
    );
}


function camouforms_register_admin_scripts() {
    camouforms_register_admin_styles();
    camouforms_register_admin_js_scripts();
}


function camouforms_register_frontend_js() {
    /* Libraries & Frameworks */
    wp_register_script('timepicker-js', camouforms_plugin_dir_path_join('assets/lib/timepicker/jquery.timepicker.js'));

    wp_register_script(
        'fontawesome',
        camouforms_plugin_dir_path_join('assets/lib/fontawesome/fontawesome-all.min.js')
    );

    wp_register_script(
        'underscorejs',
        camouforms_plugin_dir_path_join('assets/lib/underscore/underscore-min.js')
    );

    /* Source Code */
    wp_register_script(
        'camouforms_validation_constants',
        camouforms_plugin_dir_path_join('assets/js/public/shared/constants.js')
    );
    wp_register_script(
        'camouforms_validation_utils',
        camouforms_plugin_dir_path_join('assets/js/public/shared/utils.js'),
        array(
            'jquery',
            'underscorejs'
        )
    );
    wp_register_script(
        'camouforms_validation_validator',
        camouforms_plugin_dir_path_join('assets/js/public/validation/validator.js'),
        array(
            'jquery',
            'underscorejs'
        )
    );
    wp_register_script(
        'camouforms_frontend_main',
        camouforms_plugin_dir_path_join('assets/js/public/camouforms_frontend_main.js'),
        array(
            'jquery',
            'jquery-ui-datepicker',
            'timepicker-js',
            'fontawesome',
            'camouforms_validation_constants',
            'camouforms_validation_utils',
            'camouforms_validation_validator'
        )
    );

    wp_localize_script(
        'camouforms_validation_constants',
        'app_context_data',
        array(
            'ajax_url' => admin_url('admin-ajax.php'),
        )
    );
}


add_action('init', 'camouforms_register_frontend_scripts');
function camouforms_register_frontend_scripts() {
    wp_register_style('jquery-ui-css', camouforms_plugin_dir_path_join('assets/lib/jquery/jquery-ui/jquery-ui.min.css'));
    wp_register_style('timepicker-css', camouforms_plugin_dir_path_join('assets/lib/timepicker/jquery.timepicker.css'));
    wp_register_style('camouforms_form_styles', camouforms_plugin_dir_path_join('assets/css/form_styles.css'));

    camouforms_register_frontend_js();
}


add_shortcode('camouforms', 'camouforms_basic_shortcode');
function camouforms_basic_shortcode($atts) {
    global $wpdb, $forms_table_name;

    extract( shortcode_atts( array(
        'id' => '1',
        ), $atts ) );

    if ( !ctype_digit($id) )
    {
        return '';
    }

    $html = $wpdb->get_var("SELECT form_html FROM $forms_table_name WHERE id='$id'");

    wp_enqueue_style('jquery-ui-css');
    wp_enqueue_style('timepicker-css');

    wp_enqueue_style('camouforms_form_styles');
    wp_enqueue_script('camouforms_frontend_main');

    return "<div class='camouform-css'>" . stripcslashes(html_entity_decode($html)) . "</div>";
}


function camouforms_preview_head() {
    echo '<title>Camouforms Preview</title>';
}


add_action('template_redirect', 'camouforms_redirect_to_form_preview_page', 1);
function camouforms_redirect_to_form_preview_page() {
    if (!(is_user_logged_in() && isset($_GET['camou_preview_id']))) return '';

    global $wpdb, $forms_table_name, $preview_forms_table_name;

    $url_path = explode('?', $_SERVER["REQUEST_URI"])[0];
    $path_parts = explode('/', $url_path);
    $path = $path_parts[ count($path_parts) - 1 ];
    $form_id = $_GET['camou_preview_id'];

    if ($path == 'camouform' && ctype_digit($form_id)) {
        $form_html = $wpdb->get_var( "SELECT form_html FROM $preview_forms_table_name WHERE form_id='$form_id'" );
        $form_name = $wpdb->get_var( "SELECT form_name FROM $forms_table_name WHERE id='$form_id'" );

        wp_enqueue_style('jquery-ui-css');
        wp_enqueue_style('timepicker-css');

        wp_enqueue_style('camouforms_form_styles');
        wp_enqueue_script('camouforms_frontend_main');

        remove_action('wp_head', '_wp_render_title_tag', 1);
        add_action('wp_head', 'camouforms_preview_head');
        wp_head();

        echo '<span class="camouforms-preview-icon">Preview</span>';
        echo '<h2 class="camouforms-preview-form-name">' . $form_name . '</h2>';
        echo '<div class="camouforms-preview-form">';
        echo stripcslashes($form_html);
        echo '</div>';

        die();
    }
}


add_action('wp_ajax_camouforms_save_preview', 'camouforms_save_preview');
function camouforms_save_preview() {
    global $wpdb, $preview_forms_table_name;

    $form_id = sanitize_text_field($_POST['form_id']);
    $form_html = camouforms_sanitize_html(stripslashes($_POST['form_html']));
    $form_meta_data = stripslashes($_POST['form_meta_data']);

    if (!ctype_digit($form_id))
    {
        wp_die(json_encode(array(
            'failed' => __('Invalid Form ID'),
            'form_id' => $form_id
        )));
    }

    $wpdb->query("REPLACE INTO $preview_forms_table_name (form_id, form_html, form_meta_data) VALUES ('$form_id', '$form_html', '$form_meta_data')");

    wp_die('Success!');
}


add_action('wp_ajax_camouforms_create_new_form', 'camouforms_create_new_form');
function camouforms_create_new_form() {
    global $wpdb, $forms_table_name;

    $form_name = sanitize_text_field($_POST['form_name']);
    $form_description = sanitize_text_field($_POST['form_description']);
    $error = null;

    if (empty(trim($form_name))) {
        $error = 'NO_FORM_NAME';
    } else {
        $wpdb->insert(
            $forms_table_name,
            array(
                'form_name' => $form_name,
                'form_description' => $form_description
            )
        );
    }

    $response = array(
        'form_id' => $wpdb->insert_id,
        'error' => $error
    );

    wp_die(json_encode($response));
}


add_action('wp_ajax_camouforms_load_form_meta_data', 'camouforms_load_form_meta_data');
function camouforms_load_form_meta_data() {
    global $wpdb, $forms_table_name;

    $form_id = $_POST['formId'];

    if (!ctype_digit($form_id))
    {
        wp_die(json_encode(array('failed'=>__('Invalid Form ID'))));
    }

    $form_data = $wpdb->get_row("SELECT id, form_name, form_description, form_meta_data FROM $forms_table_name WHERE id=$form_id");

    wp_die(json_encode(array(
        'form_name' => $form_data->form_name,
        'form_description' => $form_data->form_description,
        'form_meta_data' => stripcslashes($form_data->form_meta_data)
    )));
}


add_action('wp_ajax_camouforms_save_form_html', 'camouforms_save_form_html');
function camouforms_save_form_html() {
    global $wpdb, $forms_table_name, $preview_forms_table_name;

    $form_id = $_POST['form_id'];
    $form_html = camouforms_sanitize_html(stripslashes($_POST['form_html']));
    $form_meta_data = $_POST['form_meta_data'];
    $form_name = sanitize_text_field($_POST['form_name']);
    $form_description = sanitize_textarea_field($_POST['form_description']);

    if (!ctype_digit($form_id))
    {
        wp_die(json_encode(array('failed'=>__('Invalid Form ID'))));
    }

    $was_updated = $wpdb->update(
        $forms_table_name,
        array(
            'form_html' => $form_html,
            'form_meta_data' => $form_meta_data,
            'form_name' => $form_name,
            'form_description' => $form_description
        ),
        array('id' => $form_id)
    );

    $wpdb->query("REPLACE INTO $preview_forms_table_name (form_id, form_html) VALUES ('$form_id', '$form_html')");

    if ($was_updated == false) {
        wp_die('Saved Form, Complete!. Form was updated: false');
    } else if ($was_updated == 0) {
        wp_die('Saved Form, Complete!. Form was updated: 0');
    } else {
        wp_die('Saved Form, Complete!. Form was updated: true');
    }
}


add_action('wp_ajax_camouforms_load_builder', 'camouforms_load_builder');
function camouforms_load_builder() {
    global $wpdb, $forms_table_name;

    $form_id = $_POST['formId'];

    if (!ctype_digit($form_id))
    {
        wp_die(json_encode(array('failed'=>__('Invalid Form ID'))));
    }

    $form_data = $wpdb->get_row("SELECT id FROM $forms_table_name WHERE id=$form_id");

    if (isset($form_data)) {
        $result = json_encode(array(
            'form_exists' => true
        ));
    } else {
        $result = json_encode(array(
            'form_exists' => false
        ));
    }

    return wp_die($result);
}

function camouforms_empty_string_filter($str) {
    return !empty(trim($str));
}

function camouforms_validate_form_submission($submission, $validationRules) {
    $field_errors = array();
    $form_has_error = false;

    foreach ($submission as $field_data) {
        $field_rules = $validationRules[$field_data['field']];
        $field_errors[$field_data['field']] = array();

        if ($field_rules['isRequired'] && empty(array_filter($field_data['values'], 'camouforms_empty_string_filter'))) {
            array_push($field_errors[$field_data['field']], 'isRequired');
            $form_has_error = true;
        }

        if (!empty($field_data['values'][0]) &&
            $field_rules['fieldType'] == 'email' &&
            !filter_var($field_data['values'][0], FILTER_VALIDATE_EMAIL)
        ) {
            array_push($field_errors[$field_data['field']], 'email');
            $form_has_error = true;
        }

        $min_max_type = $field_rules['minMaxType'];
        $min_char = $field_rules['minChar'];
        if ($min_max_type == 'characters' && $min_char != "" && strlen($field_data['values'][0]) < intval($min_char)) {
            array_push($field_errors[$field_data['field']], 'minChar');
            $form_has_error = true;
        }

        $max_char = $field_rules['maxChar'];
        if ($min_max_type == 'characters' && $max_char != "" && strlen($field_data['values'][0]) > intval($max_char)) {
            array_push($field_errors[$field_data['field']], 'maxChar');
            $form_has_error = true;
        }

        if ($min_max_type == 'words' && $min_char != "" && count(
                array_filter(
                    explode(' ', trim($field_data['values'][0])),
                    'camouforms_empty_string_filter'
                )
            ) < intval($min_char)) {
            array_push($field_errors[$field_data['field']], 'minWords');
            $form_has_error = true;
        }

        if ($min_max_type == 'words' && $max_char != "" &&
            count(
                array_filter(
                    explode(' ', trim($field_data['values'][0])),
                    'camouforms_empty_string_filter'
                )
            ) > intval($max_char)) {
            array_push($field_errors[$field_data['field']], 'maxWords');
            $form_has_error = true;
        }
    }

    if ($form_has_error) {
        return $field_errors;
    }
    return null;
}


add_action('wp_ajax_camouforms_form_submit', 'camouforms_form_submit');
function camouforms_form_submit() {
    global $wpdb, $forms_table_name, $preview_forms_table_name, $submissions_table_name;

    $form_id = $_POST['form_id'];
    $preview_id = $_POST['preview_id'];

    if (!ctype_digit($form_id))
    {
        wp_die(json_encode(array('failed'=>__('Invalid Form ID'))));
    }

    if ($preview_id) {
        $form_meta_data = $wpdb->get_var("SELECT form_meta_data FROM $preview_forms_table_name WHERE form_id=$form_id");
    } else {
        $form_meta_data = $wpdb->get_var("SELECT form_meta_data FROM $forms_table_name WHERE id=$form_id");
    }


    $form_meta_data = json_decode($form_meta_data, true);
    $submit_data = json_decode(stripslashes_deep($_POST['submit_data']), true);

    $field_errors = camouforms_validate_form_submission($submit_data, $form_meta_data['fieldSettings']);

    if (!$field_errors) {

        $wpdb->insert(
            $submissions_table_name,
            array(
                'form_id' => $form_id,
                'submission' => stripslashes_deep($_POST['submit_data']),
                'received' => current_time('mysql')
            )
        );

    }

    wp_die(json_encode(array(
        'field_errors' => $field_errors
    )));
}


add_action('wp_ajax_camouforms_get_submission_content', 'camouforms_get_submission_content');
function camouforms_get_submission_content() {
    global $wpdb, $submissions_table_name, $forms_table_name;

    $submission_id = $_POST['submissionId'];

    if (!ctype_digit($submission_id))
    {
        wp_die(json_encode(array('failed'=>__('Invalid ID'))));
    }

    $submission_data = $wpdb->get_row(
        "SELECT {$submissions_table_name}.id, {$submissions_table_name}.submission, {$submissions_table_name}.received, {$forms_table_name}.form_name FROM $submissions_table_name LEFT JOIN $forms_table_name ON {$submissions_table_name}.form_id = {$forms_table_name}.id WHERE {$submissions_table_name}.id=$submission_id"
    );

    wp_die(json_encode(array(
        'form_name' => $submission_data->form_name,
        'submission' => $submission_data->submission,
        'received' => $submission_data->received,
    )));
}


add_action('wp_ajax_camouforms_delete_form', 'camouforms_delete_form');
function camouforms_delete_form() {
    global $wpdb, $forms_table_name;

    $form_id = $_POST['formId'];

    if (!ctype_digit($form_id))
    {
        wp_die(json_encode(array('failed'=>__('Invalid Form ID'))));
    }

    $wpdb->delete($forms_table_name, array('id' => $form_id));

    wp_die(json_encode(array(
        'status' => 'success'
    )));
}


add_action('wp_ajax_camouforms_load_submissions', 'camouforms_load_submissions');
function camouforms_load_submissions() {
    global $wpdb, $submissions_table_name, $forms_table_name;

    $form_id = $_POST['formId'];

    if ($form_id == 'all') {
        $total_submissions_count = $wpdb->get_var("SELECT COUNT(*) from $submissions_table_name");
        $first_page_submissions = $wpdb->get_results(
            "SELECT {$submissions_table_name}.id, {$submissions_table_name}.received, {$forms_table_name}.form_name FROM $submissions_table_name LEFT JOIN $forms_table_name ON {$submissions_table_name}.form_id = {$forms_table_name}.id LIMIT 15"
        );
    } else if (!ctype_digit($form_id)) {

        wp_die(json_encode(array('failed'=>__('Invalid Form ID'))));

    } else {
        $total_submissions_count = $wpdb->get_var("SELECT COUNT(*) from $submissions_table_name WHERE form_id=$form_id");
        $first_page_submissions = $wpdb->get_results("SELECT {$submissions_table_name}.id, {$submissions_table_name}.received, {$forms_table_name}.form_name FROM $submissions_table_name LEFT JOIN $forms_table_name ON {$submissions_table_name}.form_id = {$forms_table_name}.id WHERE form_id=$form_id LIMIT 15");
    }


    wp_die(json_encode(array(
        'totalSubmissionsCount' => $total_submissions_count,
        'firstPageSubmissions'  => $first_page_submissions
    )));
}


add_action('wp_ajax_camouforms_navigate_submissions_pagination', 'camouforms_navigate_submissions_pagination');
function camouforms_navigate_submissions_pagination() {
    global $wpdb, $submissions_table_name, $forms_table_name;

    $form_id = $_POST['formId'];
    $selected_page = $_POST['selectedPage'];

    if (!ctype_digit($selected_page)) {

        wp_die(json_encode(array('failed'=>__('Invalid page number.'))));

    }

    $selected_page = (int)$selected_page;

    $offset_end = 15 * $selected_page;
    $offset_start = $offset_end - 15;

    if ($form_id == 'all') {
        $page_results = $wpdb->get_results(
            "SELECT {$submissions_table_name}.id, {$submissions_table_name}.received, {$forms_table_name}.form_name FROM $submissions_table_name LEFT JOIN $forms_table_name ON {$submissions_table_name}.form_id = {$forms_table_name}.id LIMIT ${offset_start}, ${offset_end}"
        );
    } else if (!ctype_digit($form_id)) {

        wp_die(json_encode(array('failed'=>__('Invalid Form ID'))));

    } else {
        $page_results = $wpdb->get_results(
            "SELECT {$submissions_table_name}.id, {$submissions_table_name}.received, {$forms_table_name}.form_name FROM $submissions_table_name LEFT JOIN $forms_table_name ON {$submissions_table_name}.form_id = {$forms_table_name}.id WHERE ${submissions_table_name}.form_id = $form_id LIMIT ${offset_start}, ${offset_end}"
        );
    }


    wp_die(json_encode(array(
        'submissions' => $page_results
    )));
}


add_action('wp_ajax_camouforms_delete_submissions', 'camouforms_delete_submissions');
function camouforms_delete_submissions() {
    global $wpdb, $submissions_table_name, $forms_table_name;

    $form_id = $_POST['formId'];
    $submission_ids = esc_sql($_POST['submissionIds']);

    $wpdb->query("DELETE FROM $submissions_table_name WHERE id IN ({$submission_ids})");
    $total_submissions_count = $wpdb->get_var("SELECT COUNT(*) from $submissions_table_name");

    if ($form_id == 'all') {
        $page_results = $wpdb->get_results(
            "SELECT {$submissions_table_name}.id, {$submissions_table_name}.received, {$forms_table_name}.form_name FROM $submissions_table_name LEFT JOIN $forms_table_name ON {$submissions_table_name}.form_id = {$forms_table_name}.id LIMIT 15"
        );
    } elseif (!ctype_digit($form_id)) {

        wp_die(json_encode(array('failed'=>__('Invalid Form ID'))));

    } else {
        $page_results = $wpdb->get_results("SELECT {$submissions_table_name}.id, {$submissions_table_name}.received, {$forms_table_name}.form_name FROM $submissions_table_name LEFT JOIN $forms_table_name ON {$submissions_table_name}.form_id = {$forms_table_name}.id WHERE form_id=$form_id LIMIT 15");
    }

    wp_die(json_encode(array(
        'submissions' => $page_results,
        'totalSubmissionsCount' => $total_submissions_count
    )));
}

?>
