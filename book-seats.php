<?php
		header('Content-Type: text/plain; charset=utf-8');
		require_once('config.php');
		
		$userId = $_REQUEST['userId'];
		$seatNumbers = $_REQUEST['seatNumbers'];
        $seatNumbers = explode(',', $seatNumbers);
        
        $count=sizeof($seatNumbers);
        
        for($i=0;$i<$count;$i++){
           $seatNumber =  $seatNumbers[$i];
           $sql="UPDATE `seat` SET `user_id`='".$userId."', `booked`='1' WHERE `seat_number`='".$seatNumber."'";
           // Performing insert query execution
           $res = mysqli_query($conn, $sql);
        }
    
		$response["status"] ='success';
		$response["message"] ='Tickets booked successfully';
		echo json_encode($response);
	
	// Close connection
	mysqli_close($conn);
	?>