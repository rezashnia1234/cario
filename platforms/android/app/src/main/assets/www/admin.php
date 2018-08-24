<?php

ini_set('display_errors', 0);
header( 'Content-Type: text/html; charset=utf-8' );

 
//11
//# set the database information for getting connected


	$servername = "localhost";

	$username = "carioir_app";

	$password = "DniL9D2EwqW3";

	$dbname = "carioir_app";
        
        
        
        
//        
//        
//	$servername = "localhost";
//
//	$username = "username";
//
//	$password = "password";
//
//	$dbname = "fjixd";
        
   

// Create connection

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection

if ($conn->connect_error) {

    die("Connection failed: " . $conn->connect_error);

}



mysqli_set_charset($conn,"utf8");



$sql = "SELECT * FROM fjixd_orders ORDER BY id";

$result = $conn->query($sql);



if ($result->num_rows > 0) {

    // output data of each row

    
    $final = array();
    while($row = $result->fetch_assoc()) {

        array_push($final, $row);
        $id = $row['id'];

        $token = $row['token'];

        $address = $row['address'];

        $area = $row['area'];

        $phone = $row['phone'];

        $choosenDate = $row['choosen_date'];

        $choosenTime = $row['choosen_time'];

        $extra_info = $row['extra_info'];

        $paymentMethod = $row['payment_method'];

        $serviceIndex = $row['service_index'];

        $services = $row['services'];

        $orderStatus = $row['order_status'];

		$payment_status = $row['payment_status'];
		$transaction_id = $row['transaction_id'];
		$card_number = $row['card_number'];
		$payment_message = $row['payment_message'];


//
//        print_r('ID: ' . $id . '<br>Token: ' . $token . '<br>address: ' . $address . '<br> area: ' . $area . '<br>Phone:' . $phone  . '<br> choosenDate: ' .  $choosenDate  . '<br> choosenTime: ' .  $choosenTime  . '<br> extra_info: ' .  $extra_info  . '<br> paymentMethod: ' .  $paymentMethod  . '<br> serviceIndex: ' .  $serviceIndex  . '<br> services: ' .  $services  . '<br> orderStatus: ' .  $orderStatus);
//		echo '<br>payment_status: ' . $payment_status;
//		echo '<br>transaction_id: ' . $transaction_id;
//		echo '<br>card_number: ' . $card_number;
//		echo '<br>payment_message: ' . $payment_message;
//        echo '<hr>';

    }
    
    echo json_encode($final);

} else {

    echo "0 results";

}

$conn->close();
