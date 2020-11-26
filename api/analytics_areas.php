<?php

require_once 'config.php';

$areas = json_decode($_REQUEST['areas']); // [1, 2]
$area_statistics = array();


try {

    $conn = new PDO('mysql:host=localhost;dbname=' . $dbname, $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("
SELECT type, sale_type, :area as area, COUNT(*) as count
FROM cards WHERE category = 'apartments' AND is_archived LIKE 0 AND area REGEXP ('\\b' + :area + '\\b')
GROUP BY `type`, sale_type
");


    foreach ($areas as $area) {
        $stmt->bindParam(':area', $area);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_OBJ);

        $area_statistics = array_merge($area_statistics, $result);
    }

    $area_statistics_json = json_encode($area_statistics);

    die($area_statistics_json);

//    echo '<pre>';
//    print_r($apartments);
//    echo '</pre>';

} catch(PDOException $e) {
    die('ERROR: ' . $e->getMessage());
}

// Array
//(
//    [0] => stdClass Object
//        (
//            [type] => rent
//            [sale_type] => object
//            [area] => 1
//            [count] => 4
//        )
//
//    [1] => stdClass Object
//        (
//            [type] => rent
//            [sale_type] => request
//            [area] => 1
//            [count] => 3
//        )
//
//    [2] => stdClass Object
//        (
//            [type] => sale
//            [sale_type] => object
//            [area] => 1
//            [count] => 10
//        )
//
//    [3] => stdClass Object
//        (
//            [type] => sale
//            [sale_type] => request
//            [area] => 1
//            [count] => 5
//        )
//
//    [4] => stdClass Object
//        (
//            [type] => rent
//            [sale_type] => object
//            [area] => 2
//            [count] => 6
//        )
//
//    [5] => stdClass Object
//        (
//            [type] => rent
//            [sale_type] => request
//            [area] => 2
//            [count] => 3
//        )
//
//    [6] => stdClass Object
//        (
//            [type] => sale
//            [sale_type] => object
//            [area] => 2
//            [count] => 7
//        )
//
//    [7] => stdClass Object
//        (
//            [type] => sale
//            [sale_type] => request
//            [area] => 2
//            [count] => 6
//        )
//
//    [8] => stdClass Object
//        (
//            [type] => rent
//            [sale_type] => object
//            [area] => 3
//            [count] => 1
//        )
//
//    [9] => stdClass Object
//        (
//            [type] => rent
//            [sale_type] => request
//            [area] => 3
//            [count] => 3
//        )
//
//    [10] => stdClass Object
//        (
//            [type] => sale
//            [sale_type] => object
//            [area] => 3
//            [count] => 9
//        )
//
//    [11] => stdClass Object
//        (
//            [type] => sale
//            [sale_type] => request
//            [area] => 3
//            [count] => 7
//        )
//
//    [12] => stdClass Object
//        (
//            [type] => rent
//            [sale_type] => object
//            [area] => 4
//            [count] => 5
//        )
//
//    [13] => stdClass Object
//        (
//            [type] => rent
//            [sale_type] => request
//            [area] => 4
//            [count] => 2
//        )
//
//    [14] => stdClass Object
//        (
//            [type] => sale
//            [sale_type] => object
//            [area] => 4
//            [count] => 2
//        )
//
//    [15] => stdClass Object
//        (
//            [type] => sale
//            [sale_type] => request
//            [area] => 4
//            [count] => 4
//        )
//
//    [16] => stdClass Object
//        (
//            [type] => rent
//            [sale_type] => object
//            [area] => 5
//            [count] => 3
//        )
//
//    [17] => stdClass Object
//        (
//            [type] => rent
//            [sale_type] => request
//            [area] => 5
//            [count] => 2
//        )
//
//    [18] => stdClass Object
//        (
//            [type] => sale
//            [sale_type] => object
//            [area] => 5
//            [count] => 10
//        )
//
//    [19] => stdClass Object
//        (
//            [type] => sale
//            [sale_type] => request
//            [area] => 5
//            [count] => 5
//        )
//
//    [20] => stdClass Object
//        (
//            [type] => rent
//            [sale_type] => object
//            [area] => 6
//            [count] => 2
//        )
//
//    [21] => stdClass Object
//        (
//            [type] => sale
//            [sale_type] => object
//            [area] => 6
//            [count] => 1
//        )
//
//    [22] => stdClass Object
//        (
//            [type] => sale
//            [sale_type] => request
//            [area] => 6
//            [count] => 4
//        )
//
//    [23] => stdClass Object
//        (
//            [type] => rent
//            [sale_type] => object
//            [area] => 7
//            [count] => 7
//        )
//
//    [24] => stdClass Object
//        (
//            [type] => rent
//            [sale_type] => request
//            [area] => 7
//            [count] => 3
//        )
//
//    [25] => stdClass Object
//        (
//            [type] => sale
//            [sale_type] => object
//            [area] => 7
//            [count] => 11
//        )
//
//    [26] => stdClass Object
//        (
//            [type] => sale
//            [sale_type] => request
//            [area] => 7
//            [count] => 3
//        )
//
//)