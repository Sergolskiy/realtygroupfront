<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="viewport" content="height=device-height, initial-scale=1, shrink-to-fit=no">
    <meta name="mobile-web-app-capable" content="yes">
    <meta property="og:image" content="/images/logo.png" />


    <?php
    $arr = array('share_cards' => 'Подходящие варианты');
    $section = explode("/", $_SERVER['REQUEST_URI'])[1];
    $title = isset($arr[$section]) ? $arr[$section] : 'Главная страница';
    ?>
    <title><?php echo $title ?></title>




    <!--Смешаный контент http и https-->
<!--    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">-->

    <link rel="shortcut icon" href="/images/favicon.png"/>


    <!-- Fonts -->
    <link rel="stylesheet" href="/library/fontawesome/css/all.min.css"/>
    <link rel="stylesheet" href="/library/MaterialDesign_v4.4.95/css/materialdesignicons.min.css"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans"/>


    <!-- Library scripts -->
    <script type="text/javascript" src="/library/jquery/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="/library/js/jquery.cookie.js"></script>
    <script type="text/javascript" src="/library/js/hammer.min.js"></script>
    <script type="text/javascript" src="/library/js/device.js"></script>
    <script type="text/javascript" src="/library/js/Sortable.js"></script>


    <!-- moment -->
    <script type="text/javascript" src="/library/moment_v2.24.0/moment.min.js"></script>
    <script type="text/javascript" src="/library/moment_v2.24.0/locale/ru.js"></script>


    <!-- Bootstrap -->
    <link rel="stylesheet" href="/library/bootstrap-4.2.1/css/bootstrap.min.css"/>
    <script type="text/javascript" src="/library/bootstrap-4.2.1/js/bootstrap.bundle.min.js"></script>


    <!-- Ripple -->
    <link rel="stylesheet" href="/library/ripple/ripple.min.css"/>
    <script type="text/javascript" src="/library/ripple/ripple.min.js"></script>


    <!-- Slider Pro -->
    <link rel="stylesheet" href="/library/slider-pro-master/css/slider-pro.min.css"/>
    <script type="text/javascript" src="/library/slider-pro-master/js/jquery.sliderPro.min.js"></script>


    <!-- Lazy Load XT -->
    <link rel="stylesheet" href="/library/lazy-load-xt/jquery.lazyloadxt.fadein.min.css"/>
    <script type="text/javascript" src="/library/lazy-load-xt/jquery.lazyloadxt.min.js"></script>


    <!-- DateTimePicker -->
    <link rel="stylesheet" href="/library/bootstrap-datetimepicker/datetimepicker.css"/>
    <script type="text/javascript" src="/library/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js"></script>
    <script type="text/javascript" src="/library/bootstrap-datetimepicker/locales/bootstrap-datetimepicker.ru.js" charset="UTF-8"></script>


    <!-- International telephone input -->
    <link rel="stylesheet" href="/library/intlTelInput/css/intlTelInput.min.css"/>
    <script type="text/javascript" src="/library/intlTelInput/js/intlTelInput.min.js"></script>
<!--    <script type="text/javascript" src="/library/intlTelInput/js/utils.js"></script>-->

    <!-- jquery-ajax-localstorage-cache -->
    <script type="text/javascript" src="/library/jquery-ajax-localstorage-cache/jalc.min.js"></script>

    <!-- React Toastify -->
    <link rel="stylesheet" href="/library/react-toastify-master/dist/ReactToastify.min.css"/>

    <!-- checkboxes -->
    <link rel="stylesheet" href="/library/css/checkboxes.css"/>

    <!-- google-loader -->
    <link rel="stylesheet" href="/library/css/google-loader.css"/>

    <!-- undefsafe -->
    <script type="text/javascript" src="/library/js/undefsafe.js"></script>

    <!-- jQuery Mask Plugin -->
    <script type="text/javascript" src="/library/jQuery-Mask-Plugin_v1.7.7/jquery.mask.js"></script>

    <!-- RobinHerbots-Inputmask -->
    <script type="text/javascript" src="/library/RobinHerbots-Inputmask/dist/min/jquery.inputmask.bundle.min.js"></script>
    <script type="text/javascript" src="/library/RobinHerbots-Inputmask/dist/inputmask/phone-codes/phone.js"></script>

    <!-- JavaScript-Load-Image -->
    <script type="text/javascript" src="/library/JavaScript-Load-Image-master/js/load-image.all.min.js"></script>

    <!-- md5 -->
    <script type="text/javascript" src="/library/js/md5.min.js"></script>






    <!-- Project -->
    <link rel="stylesheet" href="/css/style.css?<?= filemtime($_SERVER['DOCUMENT_ROOT'].'/css/style.css')?>"/>
    <link rel="stylesheet" href="/css/newStyle.css?<?= filemtime($_SERVER['DOCUMENT_ROOT'].'/css/newStyle.css')?>"/>
<!--    <link rel="stylesheet" href="/node_modules/react-virtualized-select/styles.css?--><?//= filemtime($_SERVER['DOCUMENT_ROOT'].'/node_modules/react-virtualized-select/styles.css')?><!--"/>-->
    <script type="text/javascript" src="/js/data.js?<?= filemtime($_SERVER['DOCUMENT_ROOT'].'/js/data.js')?>"></script>
    <script type="text/javascript" src="/js/functions.js?<?= filemtime($_SERVER['DOCUMENT_ROOT'].'/js/functions.js')?>"></script>
    <script defer type="text/javascript" src="/js/ajax.js?<?= filemtime($_SERVER['DOCUMENT_ROOT'].'/js/ajax.js')?>"></script>
    <script defer type="text/javascript" src="/dist/bundle.js?<?= filemtime($_SERVER['DOCUMENT_ROOT'].'/dist/bundle.js')?>"></script>
    <script defer type="text/javascript" src="/js/initialization.js?<?= filemtime($_SERVER['DOCUMENT_ROOT'].'/js/initialization.js')?>"></script>

    <!-- Data -->



</head>
<body>

<div id="root"></div>
<div id="ToastContainer"></div>

</body>
</html>
