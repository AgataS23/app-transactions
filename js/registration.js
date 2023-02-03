export const setQuerySelector = (s) => document.querySelector(s);

export const form = setQuerySelector("#form");
export const username = setQuerySelector("#username");
export const password = setQuerySelector("#password");
export const email = setQuerySelector("#email");
export const email2 = setQuerySelector("#email2");

export const isValidate = form.addEventListener("submit", (e) => {
	e.preventDefault();

	validateInputs();

	// if () {
	fnSavedData();
	const inputs = document.querySelectorAll("input");
	inputs.forEach((input) => {
		input.value = "";
	});
	// }
	// if (validateInputs) {
	// 	const inputs = document.querySelectorAll("input");
	// 	inputs.forEach((input) => {
	// 		input.value = "";
	// 	});
	// 	window.location.href = "profile.html";
	// }
});

export const setError = (element, message) => {
	// const formControl = document.querySelector('.form-control');

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
	const str = /^[A-Za-z0-9 ]*$/;
	return str.test(username);
};

export const isValidEmail = (email) => {
	const regExEmail =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regExEmail.test(String(email).toLowerCase());
};

export const validateInputs = () => {
	const usernameValue = username.value.trim();
	const passwordValue = password.value.trim();
	const emailValue = email.value.trim();
	const email2Value = email2.value.trim();

	if (!usernameValue) {
		setError(username, "Nazwa użytkownika jest wymagana");
	} else if (!isValidUsername(usernameValue)) {
		setError(
			username,
			"Nazwa użytkownika może składać się z liter i/lub liczb",
		);
	} else if (usernameValue.length < 6) {
		setError(username, "Nazwa użytkownika musi mieć conajmniej 6 znaków");
	} else if (usernameValue.length > 16) {
		setError(username, "Nazwa użytkownika może mieć maksymalnie 16 znaków");
	} else {
		setSuccess(username);
	}

	if (passwordValue === "") {
		setError(password, "Hasło jest wymagane");
	} else if (passwordValue.length < 6) {
		setError(password, "Hasło musi mieć conajmniej 6 znaków");
	} else {
		setSuccess(password);
	}

	if (emailValue === "") {
		setError(email, "Adres email jest wymagany");
	} else if (!isValidEmail(emailValue)) {
		setError(email, "Podaj poprawny adres email");
	} else {
		setSuccess(email);
	}

	if (email2Value === "") {
		setError(email2, "Potwierdź adres email");
	} else if (email2Value !== emailValue) {
		setError(email2, "Adresy email różnią się");
	} else {
		setSuccess(email2);
	}
};

export const fnSavedData = function saveData() {
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	let email = document.getElementById("email").value;
	let email2 = document.getElementById("email2").value;

	let users = [];
	localStorage.setItem("users", JSON.stringify(users));
	const parsedUsers = JSON.parse(localStorage.getItem("users"));
	parsedUsers ? parsedUsers : [];

	if (
		users.some((v) => {
			v.email === email;
		})
	) {
		setError(email, "Podany email już istnieje w bazie");
	} else {
		const newUser = {
			username: username,
			password: password,
			email: email,
			email2: email2,
		};
		users = [newUser, ...users];

		localStorage.setItem("users", JSON.stringify(users));
		const user = users.find((u) => {
			u.email === email && u.password === password;
		});
		localStorage.setItem("username", username);
		localStorage.setItem("email", email);
	}
};
