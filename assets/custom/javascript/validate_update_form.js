/*
Creation date: 6-6-2017
Purpose:  validating and updating(update/delete) the HTML page student_registration_form.html
File Path: studentDemo/assets/custom/javascript/validate_update_form.js
Created By : Anushree.
*/

alert('Hello Student, register yourself here.');
var usersArray = [];
var flag = 0;

/**
* Functionality: update student table to update the details of the students who have registered successfully
* @params: null
* @return: null
*/
function updateStudentTable()
{
	studentsNumber = usersArray.length;
	
	//checking if the username already exists
	if(studentsNumber != 0)
	{
		for(var loopIterator = 0;loopIterator < studentsNumber;loopIterator++)
		{
			if(usersArray[loopIterator].username === document.getElementById("userName").value)
			{
				if(flag == 0)
					return alert("This Username is already taken.");
				else
				{
					//resetting global update flag to false
					flag = 0;
					
					return alert("Updating existing user!");
				}
			}
		}
	}
	
	//catching form data in an array, userObj and pushing it in an array of objects, usersArray
	var userObj = {}
	var formCollection = document.getElementById("form").elements;
	var totalFields = formCollection.length;
	$.each(formCollection, function(index, item){
		userObj[formCollection[index].name] = formCollection[index].value;
	});	
	usersArray.push(userObj);
	
	//adding a row to the table
	addRow();
	
}

/**
* Functionality: to add a row to the table
* @params: null 
* @return: null
*/
function addRow()
{
	var table = document.getElementById("studentTable");

	var rowCount = table.rows.length;
	var row = table.insertRow(rowCount);
	
	//adding a row to the table
	row.insertCell(0).innerHTML = usersArray[studentsNumber].username;;
	row.insertCell(1).innerHTML = usersArray[studentsNumber].fName;
	row.insertCell(2).innerHTML = usersArray[studentsNumber].lName;
	row.insertCell(3).innerHTML = usersArray[studentsNumber].dob;;
	row.insertCell(4).innerHTML = '<input type="button" name="update" id="updateButton" value="Update" onclick="updateEntry(this)">';
	row.insertCell(5).innerHTML = '<input type="button" name="delete" id="deleteButton" value="Delete" onclick="deleteRow(this)">';;
}

/**
* Functionality: to add a row to the table
* @params: Number index  the index of the entry to be updated
* @return: String
*/
function updateEntry(button)
{
	index = arguments[0].parentNode.parentNode.rowIndex;
	
	var table = document.getElementById("studentTable");
	
	//populating the form fields with the usersArray values
    document.form.fName.value = usersArray[index - 1].fName;
	document.form.mName.value = usersArray[index - 1].mName;
	document.form.lName.value = usersArray[index - 1].lName;
	document.form.fathersFirstName.value = usersArray[index - 1].fathersFirstName;
	document.form.fathersLastName.value = usersArray[index - 1].fathersLastName;	
	document.form.dob.value = usersArray[index - 1].dob;	
	document.form.gender.checked = ((usersArray[index - 1].gender) == "male") ? true : false;
	document.form.caste.value = usersArray[index - 1].caste;
	document.form.email.value = usersArray[index - 1].email;
	document.form.mobileNo.value = usersArray[index - 1].mobileNo;
	document.form.permAddress.value = usersArray[index - 1].permAddress;
	document.form.commAddress.value = usersArray[index - 1].commAddress;
	document.form.username.value = usersArray[index - 1].username;
	document.form.password1.value = usersArray[index - 1].password1;
	document.form.password2.value = usersArray[index - 1].password2;
	
	//setting global flag for update to true
	flag = 1;
	
	//checking if the username is changed or not	
	$('#submitButton').click(function(){
		if(usersArray[index - 1].username === document.getElementById("userName").value)
		{
			//storing the other form fields in usersArray
			usersArray[index - 1].fName = document.form.fName.value;
			usersArray[index - 1].mName = document.form.mName.value;
			usersArray[index - 1].lName = document.form.lName.value;
			usersArray[index - 1].fathersFirstName = document.form.fathersFirstName.value;
			usersArray[index - 1].fathersLastName = document.form.fathersLastName.value;
			usersArray[index - 1].dob = document.form.dob.value;
			usersArray[index - 1].caste = document.form.caste.value;
			usersArray[index - 1].email = document.form.email.value;
			usersArray[index - 1].mobileNo = document.form.mobileNo.value;
			usersArray[index - 1].permAddress = document.form.permAddress.value;
			usersArray[index - 1].commAddress = document.form.commAddress.value;
			usersArray[index - 1].password1 = document.form.password1.value;
			usersArray[index - 1].password2 = document.form.password2.value;
			
			//updating the row of the table
			table.rows[index].cells[0].innerHTML = usersArray[index - 1].username;
			table.rows[index].cells[1].innerHTML = usersArray[index - 1].fName;
			table.rows[index].cells[2].innerHTML = usersArray[index - 1].lName;
			table.rows[index].cells[3].innerHTML = usersArray[index - 1].dob;
		}	
	});
}

/**
* Functionality: to delete a row from the table
* @params: Number index  the index of the entry to be deleted 
* @return: String
*/
function deleteRow(button)
{
	//finding the row index of the button
	index = arguments[0].parentNode.parentNode.rowIndex;
		
	//deleting the object from usersArray
	usersArray.splice(index - 1, 1);
		
	//deleting the row entry from the table
	document.getElementById("studentTable").deleteRow(index);
}

/**
* Functionality: activate submit button on click of i agree
* @params: null
* @return: null
*/
function activateSubmit()
{
	document.form.submit.disabled = !document.getElementById("iAgree").checked;
}
/**
* Functionality: validate the entire form before submitting it
* @params: null
* @return: Boolean
*/
function validateForm()
{
	if(document.form.fName.value == "")
	{
		alert("Enter your First Name!");
		document.form.fName.focus();
		return false;
	}
	if(document.form.lName.value == "")
	{
		alert("Enter your Last Name!");
		document.form.lName.focus();
		return false;
	}
	if(document.form.fathersFirstName.value == "")
	{
		alert("Enter your Father's First Name!");
		document.form.fathersFirstName.focus();
		return false;
	}
	if(document.form.fathersLastName.value == "")
	{
		alert("Enter your Father's Last Name!");
		document.form.fathersLastName.focus();
		return false;
	}
	if(document.form.dob.value == "")
	{
		alert("Enter your Date of Birth!");
		document.form.dob.focus();
		return false;
	}
	if(document.form.email.value == "")
	{
		alert("Enter your Email ID!");
		document.form.email.focus();
		return false;
	}
	if(document.form.mobileNo.value == "")
	{
		alert("Enter your Mobile Number!");
		document.form.mobileNo.focus();
		return false;
	}
	var address = document.form.permAddress;
	if(trimfield(address.value) == "")
	{
		alert( "Enter your Permanent Address!");
		document.form.permAddress.focus();
		return false;
	}
	address = document.form.commAddress;
	if(trimfield(address.value) == "")
	{
		alert("Enter your Communication Address!");
		document.form.commAddress.focus();
		return false;
	}
	if(document.form.username.value == "")
	{
		alert("Enter your username in aplphanumerics{[a-z],[A-Z],[0-9]} only!");
		document.form.username.focus();
		return false;
	}
	if(document.form.password1.value == "")
	{
		alert("Enter a password for your account!");
		document.form.password1.focus();
		return false;
	}
	if(document.form.password2.value == "")
	{
		alert("Confirm your password here!");
		document.form.password2.focus();
		return false;
	}
	if(document.form.iAgree.checked == false)
	{
		alert("You need to agree with the terms and conditions!");
		document.form.iAgree.focus();
		return false;	
	}
	if(confirm('Are you sure you want to submit it?'))
		updateStudentTable();
}

/**
* Functionality: match entered password and retyped password
* @params: null
* @return: Boolean
*/
function matchPassword()
{  
	var pass1 = document.form.password1.value;
	var pass2 = document.form.password2.value;  
	if(pass1 == pass2)
		return true;    
	alert("Password must be same!");
	document.form.password1.value = null;
	document.form.password2.value = null;
	return false;  	  
}

/**
* Functionality: check for name fields if entered text is contains only alphabets
* @params: String text text field from HTML input
* @return: Boolean
*/
function isAlpha(text)  
{  
   var lettersPattern = /^[a-z]+$/i;
   if(text.value.match(lettersPattern))
      return true;
    alert("Alphabets only!");
	text.value = null;
	text.focus();
    return false;
}

/**
* Functionality: validate 10 digit mobile number
* @params: Number number	number from HTML input
* @return: Boolean
*/
function isMobileNumber(number)
{
	var numberPattern = /^\d{10}$/;
	if(number.value.match(numberPattern) && (number.value > 0))
		return true;
	alert("Please enter 10 digit mobile number!");
	number.value = null;
	number.focus();
	return false;
}

/**
* Functionality: validate a text field which should be alphanumeric only
* @params: String text	text entry from HTML text field
* @return: Boolean
*/
function isAlphaNumeric(text)
{
	var alphaNumericPattern = /^[a-z0-9]+$/i;
	if(text.value.match(alphaNumericPattern))
		return true;
	alert("Only alphabet characters (A-Z or a-z) and numbers (0-9) are allowed!");
	text.value = null;
	text.focus();
	return false;
}

/**
* Functionality: validate email id type entered by the user
* @params: String email		email entry from HTML text field
* @return: Boolean
*/
function isEmail(email)
{
	var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(email.value.match(emailPattern))
		return true;	
	alert("Enter valid email ID");
	email.value = null;
	email.focus();
	return false;
}

/**
* Functionality: to trim the textarea before checking for empty
* @params: String string
* @return: String
*/
function trimfield(string) 
{ 
    return string.replace(/^\s+|\s+$/g,''); 
}