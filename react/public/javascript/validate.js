function validateLogin(form) {
	fail = validateCredential(form.credential.value)
	fail += validatePassword(form.password.value)

	if (fail === "") return true
		else { alert(fail); return false }
}

function validateSignup(form) {
	fail = validateUsername(form.username.value)
	fail += validateEmail(form.email.value)
	fail += validatePassword(form.password.value)

	if (fail === "") return true
		else { alert(fail); return false }
}

function validateCredential(field) {
	let minLength = 5
	let maxLength = 50
	if (field === "") {
		return "No Username/Email entered.\n"
	} else if (field.length < minLength) {
		return `Username/Email too short. Must be greater than ${minLength} characters. \n`
	} else if (field.length > maxLength) {
		return `Username/Email too long. Must be shorter than ${maxLength} characters. \n`
	} else if (/[^a-zA-Z0-9_-]/.test(field)){ 
		return "Only a-z, A-Z, 0-9, - and _ allowed in in Username/Email. \n" 
	} else {
		return ""
	}
}

function validateEmail(field) {
	let minLength = 5
	let maxLength = 50
	if (field === "") {
		return "No Email entered.\n"
	} else if (field.length < minLength) {
		return `Email too short. Must be greater than ${minLength} characters. \n`
	} else if (field.length > maxLength) {
		return `Email too long. Must be shorter than ${maxLength} characters. \n`
	} else if (!((field.indexOf(".") > 0) && (field.indexOf("@") > 0)) 
		|| /[^a-zA-Z0-9.@_-]/.test(field)) { 
		return "Email is invalid. \n" 
	} else {
		return ""
	}
}

function validateUsername(field) {
	let minLength = 5
	let maxLength = 50
	if (field === "") {
		return "No Username entered.\n"
	} else if (field.length < minLength) {
		return `Username too short. Must be greater than ${minLength} characters. \n`
	} else if (field.length > maxLength) {
		return `Username too long. Must be shorter than ${maxLength} characters. \n`
	} else if (/[^a-zA-Z0-9_-]/.test(field)){ 
		return "Only a-z, A-Z, 0-9, - and _ allowed in in Username. \n" 
	} else {
		return ""
	}
}

function validatePassword(field) {
	let minLength = 5
	let maxLength = 50
	
	if (field === "") {
		return "No Password entered.\n"
	} else if (field.length < minLength) {
		return `Password too short. Must be greater than ${minLength} characters. \n`
	} else if (field.length > maxLength) {
		return `Password too long. Must be shorter than ${maxLength} characters. \n`
	} else { return "" }
}