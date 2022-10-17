function loadContacts() {
	const contacts = getAllContactsFromLocalStorage();
	addToTable(contacts);
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
	if(validate() == false) {
		// show errors
		alert('failed validate');
	} else {
		let table = document.getElementById("contactTable");

		let contactName = document.getElementById('contactName').value;
		let mobile = document.getElementById('mobile').value;
		let email = document.getElementById('email').value;
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
    	
  	addToTable(obj);

		console.log(localStorage.getItem("contacts"));
	} 
}

function saveContactsToLocalStorage(obj) {
 	localStorage.setItem("contacts", JSON.stringify(obj));
}

function getAllContactsFromLocalStorage() {
    if(localStorage.getItem("contacts") == null) {
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
  if(/^[A-Za-z\s]*$/.test(name) && name.length < 20 && name !== '') {
  	return true;
  }
}

function checkPhone(inputtxt)
{	
  
  var phoneno = /^\d{10}$/;
  if((inputtxt.match(phoneno)) && inputtxt !== ''){
    return true;
  }
  else {
  	return false;
  }
 
}

function checkEmail(email) {
	if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && email.length < 40 && email !== '') {
		return true;
	} else {
		return false;
	}
}