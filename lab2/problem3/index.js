function searchUser() {
	// get username from input

	const userName = document.getElementById('usernameSearch').value;
	fetch('https://api.github.com/users/' + userName)
	.then(response => response.json())
	.then(data => {
	  console.log(data) // Prints result from `response.json()`
	})
	.catch(error => console.error(error))
}