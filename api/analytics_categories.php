<?php

require_once 'config.php';


//$fetch = json_decode($_REQUEST['fetch']);


try {

    $conn = new PDO('mysql:host=localhost;dbname=' . $dbname, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare('SELECT type, sale_type, category, COUNT(*) as count FROM cards WHERE is_archived LIKE 0 GROUP BY type, sale_type, category');

    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_OBJ); // Подходит. Массив объектов
//    $result = $stmt->fetchAll(PDO::FETCH_UNIQUE); // хрень какая-то
//    $result = $stmt->fetchAll(PDO::FETCH_GROUP); // объект-массив, что-то среднее
//    $result = $stmt->fetchAll(PDO::FETCH_ASSOC); //


    $stat_json = json_encode($result);

    die($stat_json);

} catch(PDOException $e) {

    die('ERROR: ' . $e->getMessage());

}

//[
//  {
//    "type": "rent",
//    "sale_type": "object",
//    "category": "apartments",
//    "count": "29"
//  },
//  {
//    "type": "rent",
//    "sale_type": "object",
//    "category": "area",
//    "count": "6"
//  },
//  {
//    "type": "rent",
//    "sale_type": "object",
//    "category": "commercial",
//    "count": "8"
//  },
//  {
//    "type": "rent",
//    "sale_type": "object",
//    "category": "garages",
//    "count": "7"
//  },
//  {
//    "type": "rent",
//    "sale_type": "object",
//    "category": "houses_cottages",
//    "count": "6"
//  },
//  {
//    "type": "rent",
//    "sale_type": "request",
//    "category": "apartments",
//    "count": "15"
//  },
//  {
//    "type": "rent",
//    "sale_type": "request",
//    "category": "area",
//    "count": "3"
//  },
//  {
//    "type": "rent",
//    "sale_type": "request",
//    "category": "commercial",
//    "count": "6"
//  },
//  {
//    "type": "rent",
//    "sale_type": "request",
//    "category": "garages",
//    "count": "5"
//  },
//  {
//    "type": "rent",
//    "sale_type": "request",
//    "category": "houses_cottages",
//    "count": "3"
//  },
//  {
//    "type": "rent",
//    "sale_type": "request",
//    "category": "rooms",
//    "count": "4"
//  },
//  {
//    "type": "sale",
//    "sale_type": "object",
//    "category": "apartments",
//    "count": "60"
//  },
//  {
//    "type": "sale",
//    "sale_type": "object",
//    "category": "area",
//    "count": "23"
//  },
//  {
//    "type": "sale",
//    "sale_type": "object",
//    "category": "commercial",
//    "count": "13"
//  },
//  {
//    "type": "sale",
//    "sale_type": "object",
//    "category": "garages",
//    "count": "14"
//  },
//  {
//    "type": "sale",
//    "sale_type": "object",
//    "category": "houses_cottages",
//    "count": "25"
//  },
//  {
//    "type": "sale",
//    "sale_type": "object",
//    "category": "rooms",
//    "count": "2"
//  },
//  {
//    "type": "sale",
//    "sale_type": "request",
//    "category": "apartments",
//    "count": "22"
//  },
//  {
//    "type": "sale",
//    "sale_type": "request",
//    "category": "area",
//    "count": "5"
//  },
//  {
//    "type": "sale",
//    "sale_type": "request",
//    "category": "commercial",
//    "count": "4"
//  },
//  {
//    "type": "sale",
//    "sale_type": "request",
//    "category": "garages",
//    "count": "4"
//  },
//  {
//    "type": "sale",
//    "sale_type": "request",
//    "category": "houses_cottages",
//    "count": "10"
//  }
//]