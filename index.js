let currentUser = {user_id : 0,};
let userIsNew;
let seats;

window.onload = function () { 
    getSeatsInfo();  
}

//Update seat colors, seat count and seat numbers in UI
function updateSeatColors() {
    let seatNumbersMessage = '';
    let seatNumbersCount = 0;
    for(let i=0; i<seats.length; i++) {
        if(Number(seats[i].booked) == 1) {
             if(Number(seats[i].user_id) == currentUser.user_id) {
                const element = document.getElementById(seats[i].seat_number);
                element.style.backgroundColor = '#0081cb';
                
                let comma = '';
                if(seatNumbersMessage != '') {
                    comma = ', ';
                }
                seatNumbersMessage = seatNumbersMessage + comma + seats[i].seat_number;
                seatNumbersCount = seatNumbersCount + 1;
            } else {
                const element = document.getElementById(seats[i].seat_number);
                element.style.backgroundColor = '#fff';
            }
        } else {
                const element = document.getElementById(seats[i].seat_number);
                element.style.backgroundColor = '#444451';
        }
	}
	const seatCount = document.getElementById('seat-count');
    seatCount.innerText = seatNumbersCount;
    
    const seatNumbers = document.getElementById('seat-numbers');
    seatNumbers.innerText = seatNumbersMessage;
}

function saveUser() {
    //get form data
    var data = new FormData();
    data.append("name", document.getElementById("name").value);
    data.append("email", document.getElementById("email").value);

    //ajax call
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "user.php");
    
    xhr.onload = function() {
        getSeatsInfo();
        let res = JSON.parse(this.response);
        if(res.status == 'success') {
            currentUser = JSON.parse(this.response).user;
            if(res.message == 'User added successfully') {
                userIsNew = true;
            } else {
                userIsNew = false;
            }
            document.getElementById('book-seat-message').innerHTML = "Hi " + currentUser.user_name + ", please proceed to book your seats.</br>";
        } else {
            alert('Something unexpected occurred. Please try again.')
        };
    };
    
    xhr.send(data);
    
    //prevent page reload on submit
    return false;
}

function bookSeats() {
    
    var data = new FormData();
    data.append("userId", currentUser.user_id);
    
    let lastBookedSeatNo = 0;
    let i = 0;
    while (i<80 && seats[i].booked == 1 ) {
        lastBookedSeatNo = Number(seats[i].seat_number);
        i++;
    }
        
    let noOfSeatsToBeBooked = Number(document.getElementById("no-of-seats").value);
    let seatNumbersToBeBooked = new Array();
	for(let i=0; i<noOfSeatsToBeBooked; i++) {
		  seatNumbersToBeBooked[i] = Number(lastBookedSeatNo) + i + 1;
	}
    let seatNumbersToBeBookedString = seatNumbersToBeBooked.join(',');
    data.append("seatNumbers", seatNumbersToBeBookedString);
    
    if(currentUser.user_id > 0) {
        //ajax call
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "book-seats.php");
        
        xhr.onload = function() {
            let res = JSON.parse(this.response);
            if(res.status == 'success') {
            getSeatsInfo();
            } else {
                alert('Something unexpected occurred. Please try again.');
            }
        };
        
        xhr.send(data);
    } else {
        alert("Please enter your email id before booking.");
    }
    
    //prevent page reload on submit
    return false;
}

function getSeatsInfo() {
    //ajax call
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "seats-info.php");
    
    xhr.onload = function() {
        let res = JSON.parse(this.response);
        if(res.status == 'success') {
            seats = JSON.parse(this.response).seats;
            
            // document.getElementById("book-now").disabled = false;
           updateSeatColors();
        } else {
            alert('Something unexpected occurred. Please try again.');
        }
    };
    
    xhr.send();
    
    //prevent page reload on submit
    return false;
}

function resetAllData() {
    
    if (confirm("This will delete all the users and their booking data.")) {
        //ajax call
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "reset-all-data.php");
        xhr.onload = function() {
            let res = JSON.parse(this.response);
            if(res.status == 'success') {
                getSeatsInfo();
            } else {
                alert('Something unexpected occurred. Please try again.');
            }
        };
        xhr.send();
    }
    
    //prevent page reload on submit
    return false;
}
