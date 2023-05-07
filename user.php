<?php
		header('Content-Type: text/plain; charset=utf-8');
		require_once('config.php');
		
		// Taking both values from the form data(input)
		$name = $_REQUEST['name'];
		$email = $_REQUEST['email'];
		
		// Performing select query execution
		$sql = "SELECT * FROM user WHERE email = '$email'";
		$res = mysqli_query($conn, $sql);
		$users = mysqli_fetch_array($res);
		if($res->num_rows == 0) {
    		// Performing insert query execution
    		$sql = "INSERT INTO user (user_name, email) VALUES ('$name','$email')";
    		$res = mysqli_query($conn, $sql);
    		if($res){
    			$user["user_id"] = mysqli_insert_id($conn);
    			$user["user_name"] = $name;
    			$user["email"] = $email;
    			
    			$response["status"] ='success';
    			$response["message"] ='User added successfully';
    			$response["user"] =$user;
    			echo json_encode($response);
    
    		} else{
        		$response["status"] = 'failed';
    		    $response["message"] = 'Error in query';
    		    echo json_encode($response);
    		}
		    
		} else {
		    $user["user_id"] = $users['user_id'];
    		$user["user_name"] = $users['user_name'];
    		$user["email"] = $users['email'];
    			
		    $response["status"] = 'success';
		    $response["message"] = 'User already exists';
		    $response["user"] =$user;
		    echo json_encode($response);
		}
		
		// Close connection
		mysqli_close($conn);
		?>