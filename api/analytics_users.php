<?php

require_once 'config.php';


$users_id = json_decode($_POST['users_id']); // [24, 47]
$stages = json_decode($_POST['stages']); // ['1', '2', 'poorly']

$stat = array();


try {
    $conn = new PDO('mysql:host=localhost;dbname='.$dbname, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//    $stmt = $conn->prepare('SELECT  FROM cards WHERE user_id = :user_id and stage_transaction = :stage_transaction');
    $stmt = $conn->prepare('SELECT COUNT(*) AS count, AVG(complete_percent) as percent FROM cards WHERE user_id = :user_id and stage_transaction = :stage_transaction');

    // SELECT AVG(complete_percent) FROM cards WHERE user_id = 24
    // SELECT COUNT(*) FROM cards WHERE user_id = 24

//    $stmt->execute(array('user_id' => $user_id));

    foreach ($users_id as $key => $user_id) {
//        $stat[] = ['user_id' => $user_id];
        foreach ($stages as $stage_transaction) {

            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':stage_transaction', $stage_transaction);

//            $user_id = 24;
//            $stage_transaction = '1';
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_OBJ);

            $stat[$user_id][$stage_transaction] = $result;

        }
    }


    $stat_json = json_encode($stat);
    die($stat_json);


} catch(PDOException $e) {
    die('ERROR: ' . $e->getMessage());
}



//[
//  {
//    "user_id": 24,
//    "1": {
//      "count": "45",
//      "percent": "90.000000"
//    },
//    "2": {
//      "count": "3",
//      "percent": null
//    }
//  },
//  {
//    "user_id": 47,
//    "1": {
//      "count": "46",
//      "percent": null
//    },
//    "2": {
//      "count": "9",
//      "percent": null
//    }
//  }
//]