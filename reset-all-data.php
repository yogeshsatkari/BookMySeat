<?php
		header('Content-Type: text/plain; charset=utf-8');
		require_once('config.php');
		
        // Performing update query on seat table
        $sql="UPDATE `seat` SET user_id = null, booked = 0 WHERE `seat`.`seat_number` != 0";
        $res = mysqli_query($conn, $sql);
        
        // Performing delete query on user table
        $sql="DELETE FROM `user` WHERE `user`.`user_id` != 0";
        $res = mysqli_query($conn, $sql);
        
		$response["status"] ='success';
		$response["message"] ='Data reset successfully';
		echo json_encode($response);
	
	// Close connection
	mysqli_close($conn);
	?>