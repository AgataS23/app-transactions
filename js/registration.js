export const setQuerySelector = (s) => document.querySelector(s);

export const form = setQuerySelector("#form");
export const username = setQuerySelector("#username");
export const password = setQuerySelector("#password");
export const email = setQuerySelector("#email");
export const email2 = setQuerySelector("#email2");

export const isValidate = form.addEventListener("submit", (e) => {
	e.preventDefault();
	let isUsernameValid = checkUsername();
	let isPasswordValid = checkPassword();
	let isEmailValid = checkEmail();
	let isEmail2Valid = checkEmail2();

	let formValid =
		isUsernameValid && isPasswordValid && isEmailValid && isEmail2Valid;

	if (formValid) {
		fnSavedData();
		const inputs = document.querySelectorAll("input");
		inputs.forEach((input) => {
			input.value = "";
			input.style.border = "2px solid var(--light2-color)";
		});

		// window.location.href = "profile.html";
	}
});

export const setError = (element, message) => {
	const formControl = element.parentElement;
	const errorDisplay = formControl.querySelector("small");
	errorDisplay.innerText = message;
	formControl.classList.add("error");
	formControl.classList.remove("success");
};

export const setSuccess = (element) => {
	const formControl = element.parentElement;
	const errorDisplay = formControl.querySelector("small");
	errorDisplay.innerText = "";
	formControl.classList.add("success");
	formControl.classList.remove("error");
};

export const isValidUsername = (username) => {
	return /^[A-Za-z0-9 ]*$/.test(username);
};

export const isValidEmail = (email) => {
	const regExEmail =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regExEmail.test(String(email).toLowerCase());
};

export const isValidPassword = (password) => {
	const re = new RegExp(
		"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&*])(?=.{8,})",
	);
	return re.test(password);
};

export const isRequired = (value) => (value === "" ? false : true);
export const isBetween = (length, min, max) =>
	length < min || length > max ? false : true;

export const checkUsername = () => {
	const usernameValue = username.value.trim();
	let valid = false;
	const min = 6;
	const max = 16;

	if (!isRequired(usernameValue)) {
		setError(username, "Nazwa użytkownika jest wymagana");
	} else if (!isBetween(usernameValue.length, min, max)) {
		setError(
			username,
			`Nazwa użytkownika musi zawierać od ${min} do ${max} znaków liter lub liczb`,
		);
	} else {
		setSuccess(username);
		valid = true;
	}
	return valid;
};

export const checkPassword = () => {
	const passwordValue = password.value.trim();
	let valid = false;
	if (!isRequired(passwordValue)) {
		setError(password, "Hasło jest wymagane");
	} else if (!isValidPassword(passwordValue)) {
		setError(
			password,
			"Hasło musi mieć co najmniej 8 znaków, (1 małą literę, 1 wielką literę, 1 cyfrę i 1 znak specjalny: !@#$%^&*)",
		);
	} else {
		setSuccess(password);
		valid = true;
	}
	return valid;
};

export const checkEmail = () => {
	const emailValue = email.value.trim();
	let valid = false;
	if (!isRequired(emailValue)) {
		setError(email, "Adres e-mail jest wymagany");
	} else if (!isValidEmail) {
		setError(email, "Podaj poprawny adres e-mail");
	} else {
		setSuccess(email);
		valid = true;
	}
	return valid;
};

export const checkEmail2 = () => {
	const email2Value = email2.value.trim();
	const emailValue = email.value.trim();
	let valid = false;
	if (!isRequired(email2Value)) {
		setError(email2, "Potwierdź adres e-mail");
	} else if (emailValue !== email2Value) {
		setError(email2, "Adresy e-mail różnią się");
	} else {
		setSuccess(email2);
		valid = true;
	}
	return valid;
};

export const fnSavedData = function saveData() {
	let usernameValue = username.value;
	let passwordValue = password.value;
	let emailValue = email.value;
	let email2Value = email2.value;

	let users = [];

	try {
		users = JSON.parse(localStorage.getItem("users"))
			? JSON.parse(localStorage.getItem("users"))
			: [];
	} catch (error) {
		alert("SyntaxError !!!");
	}

	let newUser = {
		username: usernameValue,
		password: passwordValue,
		email: emailValue,
		email2: email2Value,
	};

	for (let user of users) {
		console.log(user);
		if (user.email === emailValue) {
			setError(email, "Podany e-mail już istnieje w bazie");
			newUser.emailValue = "";
		}
	}

	if (newUser.emailValue !== "") {
		users = [...users, newUser];

		localStorage.setItem("users", JSON.stringify(users));
	}
};
