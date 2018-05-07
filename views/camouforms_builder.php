<?php
    if (!defined( 'ABSPATH')) exit; // Exit if accessed directly

    require_once('camouforms_nav_bar.php');
    require_once('camouforms_canvas.php');
    require_once('camouforms_sidebar.php');
?>

<div class="cmfs-form-save-success js-cmfs-form-save-success cmfs-hidden">
    <span class="success-icon">
        <i class="far fa-check-circle fa-lg"></i>
    </span>
    <span class="success-message">Saved form!</span>
</div>

<div class="cmfs-form-save-fail js-cmfs-form-save-fail cmfs-hidden">
    <span class="fail-icon">
        <i class="far fa-times-circle fa-lg"></i>
    </span>
    <span class="fail-message">Form failed to save! Please, try again.</span>
</div>
