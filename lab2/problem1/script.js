/*
TODO: 

- show error div when adding new contact - done
- clicking on name should swap between ascending/descending - done
- add search function for mobile number - done
- if there is no match then display div noresult - done
- odd numbered data should have specific color #f2f2f2 - done
*/
let error = "";

function loadContacts() {
	const contacts = getAllContactsFromLocalStorage();
	addToTable(contacts);

}

function search() {
	// every time input changes call this function
	// search contact directory
	// match input field with contacts stored in table
	let input = document.getElementById("searchname");
	let tableName = document.getElementById("contactTable");
	let errorDiv = document.getElementById("noResult");
	let tr = tableName.getElementsByTagName("tr");
	let cellValue;

	for (i = 0; i < tr.length; i++) {
		let td = tr[i].getElementsByTagName("td")[0];
		if(td) {
			cellValue = td.textContent || td.innerText;
			if (cellValue.toUpperCase().indexOf(input.value.toUpperCase()) > -1) {
		        tr[i].style.display = "";

		    } else {
		        tr[i].style.display = "none";
		        
		    }
		}
		if(td) {
			console.log(cellValue)
			if(cellValue.toUpperCase() == input.value.toUpperCase() || input == '') {
				errorDiv.style.visibility = "hidden";
				break;
			} else {
				console.log(cellValue.toUpperCase() + " "+  input.value.toUpperCase())
				errorDiv.style.visibility = "visible";
			}
		}
		

	}


}

function sortList() {
	const contacts = getAllContactsFromLocalStorage();
	let sortedUsers = "[]";
	let num = +localStorage.getItem('sort') 
	if(num%2 !== 0) {
		sortedUsers = sortListAsc(contacts);
		localStorage.setItem('sort', JSON.stringify(2))
	} else {
		sortedUsers = sortListDsc(contacts);
		localStorage.setItem('sort', JSON.stringify(1));
	}

	location.reload();
	saveContactsToLocalStorage(sortedUsers);
	addToTable(sortedUsers);
}

function sortListAsc(contacts) {
	let sortedUsers = contacts.sort(function(a, b) {
	console.log('not zero' + localStorage.getItem('sort') );
	// https://reactgo.com/javascript-sort-objects-alphabetically/ - sort alphabetically

	var nameA = a.name.toUpperCase(); // ignore upper and lowercase
		var nameB = b.name.toUpperCase(); // ignore upper and lowercase
	
		if (nameA < nameB) {
		return -1; //nameA comes first
		}
		if (nameA > nameB) {
		return 1; // nameB comes first
		}
		return 0;  // names must be equal

	});
	return sortedUsers;
}

function sortListDsc(contacts) {
	sortedUsers = contacts.sort(function(a, b) {
		console.log('is zero');
	// https://reactgo.com/javascript-sort-objects-alphabetically/ - sort alphabetically

	var nameA = a.name.toUpperCase(); // ignore upper and lowercase
		var nameB = b.name.toUpperCase(); // ignore upper and lowercase
	
		if (nameA > nameB) {
		return -1; //nameA comes first
		}
		if (nameA < nameB) {
		return 1; // nameB comes first
		}
		return 0;  // names must be equal

	});

	return sortedUsers;
}



function addToTable(contacts) {
	let table = document.getElementById("contactTable");

	contacts.forEach(contact => {
		var row = table.insertRow(-1);
		var cell1 = row.insertCell(-1);
		var cell2 = row.insertCell(-1);
		var cell3 = row.insertCell(-1);
		cell1.innerHTML = contact.name;
		cell2.innerHTML = contact.phone;
		cell3.innerHTML = contact.emailAddr;
	});
}


function addContact() {
	let contactName = document.getElementById('contactName').value;
	let mobile = document.getElementById('mobile').value;
	let email = document.getElementById('email').value;

	if(validate() == false) {
		// show errors
		document.getElementById('error').style.visibility = "visible";
		document.getElementById('error').innerHTML = error;
		
	} else {
		document.getElementById('error').style.visibility = "hidden";
		let table = document.getElementById("contactTable");
		document.getElementById('contactName').value = '';
		document.getElementById('mobile').value = '';
		document.getElementById('email').value = '';

		const obj = {
        id: Math.floor(Math.floor(Date.now() / 1000) ),
        name: contactName,
        phone: mobile,
        emailAddr: email
  	};
		
  	const storedContacts = getAllContactsFromLocalStorage();
  	if(storedContacts != null) {
  		storedContacts.push(obj);
  		saveContactsToLocalStorage(storedContacts);
  	} else {
  		saveContactsToLocalStorage(obj)
  	}
    	
  	var row = table.insertRow(-1);
		var cell1 = row.insertCell(-1);
		var cell2 = row.insertCell(-1);
		var cell3 = row.insertCell(-1);
		cell1.innerHTML = contactName;
		cell2.innerHTML = mobile;
		cell3.innerHTML = email;

		console.log(localStorage.getItem("contacts"));
	} 
}

function saveContactsToLocalStorage(obj) {
 	localStorage.setItem("contacts", JSON.stringify(obj));
}

function getAllContactsFromLocalStorage(){
    if(localStorage.getItem("contacts") == null) {
    	console.log("test");
        return JSON.parse("[]");
    } else {
        console.log(localStorage.getItem("contacts"));
        return JSON.parse(localStorage.getItem("contacts"));
    }
}

function validate() {
	let contactName = document.getElementById('contactName').value;
	let mobile = document.getElementById('mobile').value;
	let email = document.getElementById('email').value;
	let bool = false;

	if(checkName(contactName) && checkPhone(mobile) && checkEmail(email)) {
		bool = true;
		return bool;
	}

	return bool;
}

function checkName(name) {
	// https://codingbeautydev.com/blog/javascript-check-if-string-contains-only-letters-and-spaces/
	// used the regex for validating name 
  if(/^[A-Za-z\s]*$/.test(name) && name.length < 20 && name !== '') {
  	return true;
  } else {
  	error = "name not valid";
  }
}

function checkPhone(inputtxt)
{	
  // https://www.w3resource.com/javascript/form/phone-no-validation.php
  // used for phone number validation
  var phoneno = /^\d{10}$/;
  if((inputtxt.match(phoneno)) && inputtxt !== ''){
    return true;
  }
  else {
  	error = "number not valid";
  	return false;
  }
 
}

function checkEmail(email) {
	// https://www.w3resource.com/javascript/form/email-validation.php
	// used for email validation
	if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && email.length < 40 && email !== '') {
		return true;
	} else {
		error = "email not valid";
		return false;
	}
}