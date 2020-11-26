<?php
header('Content-Type: application/octet-stream');
header('Content-Disposition: attachment; filename='.$_REQUEST['filename']);
readfile($_REQUEST['url']);
exit;