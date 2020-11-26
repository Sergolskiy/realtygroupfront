<?php

// dev
if ($_SERVER['SERVER_NAME'] === 'opana.prokachu.com') {
    $username = 'user333';
    $password = 'ftp456852ftp';
    $dbname = 'user333_crmdev';
}

// prod
if ($_SERVER['SERVER_NAME'] === 'crm.realtygroup.biz') {
    $dbname = 'u72573_crm';
    $username = 'u72573_crm';
    $password = 'u72573_crm';
}