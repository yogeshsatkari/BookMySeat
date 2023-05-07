<?php
		header('Content-Type: text/plain; charset=utf-8');
		require_once('config.php');
		
		// Performing select query execution
		$sql = "SELECT * FROM seat";
		$res = mysqli_query($conn, $sql);
		$seats = mysqli_fetch_all($res, MYSQLI_ASSOC);

	    $response["status"] = 'success';
	    $response["seats"] = $seats;
	    echo json_encode($response);
		
		// Close connection
		mysqli_close($conn);
?>