const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');
const email2 = document.getElementById('email2');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
    if(validateInputs()) {
         saveData();
         const inputs = document.querySelectorAll('#username, #password, #email, #email2');
          inputs.forEach(input => {
          input.value = '';
        });
        window.location.href='profile.html';
    }
});

const setError = (element, message) => {
    const formControl = element.parentElement;
    const errorDisplay = formControl.querySelector('small');

    errorDisplay.innerText = message;
    formControl.classList.add('error');
    formControl.classList.remove('success')
};

const setSuccess = element => {
    const formControl = element.parentElement;
    const errorDisplay = formControl.querySelector('small');

    errorDisplay.innerText = '';
    formControl.classList.add('success');
    formControl.classList.remove('error');
};

const isValidUsername = username => {
   const str = /^[A-Za-z0-9 ]*$/;
   return str.test(username);
}

const isValidEmail = email => {
    const regExEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExEmail.test(String(email).toLowerCase());
};

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    const emailValue = email.value.trim();
    const email2Value = email2.value.trim();

    if(usernameValue === '') {
        setError(username, 'Nazwa użytkownika jest wymagana');
    } else if (!isValidUsername(usernameValue)) {
        setError(username, 'Nazwa użytkownika może składać się z liter i/lub liczb');
    } else if (usernameValue.length < 6) {
        setError(username, 'Nazwa użytkownika musi mieć conajmniej 6 znaków' );
    } else if (usernameValue.length > 16 ) {
        setError(username, 'Nazwa użytkownika może mieć maksymalnie 16 znaków' );
    } else {
        setSuccess(username);
    }

    if(passwordValue === '') {
        setError(password, 'Hasło jest wymagane');
    } else if (passwordValue.length < 6 ) {
        setError(password, 'Hasło musi mieć conajmniej 6 znaków');
    } else {
        setSuccess(password);
    }

    if(emailValue === '') {
        setError(email, 'Adres email jest wymagany');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Podaj poprawny adres email');
    } else {
        setSuccess(email);
    }

    if(email2Value === '') {
        setError(email2, 'Potwierdź adres email');
    } else if (email2Value !== emailValue) {
        setError(email2, 'Adresy email różnią się');
    } else {
        setSuccess(email2);
    }
};

function saveData(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let email = document.getElementById('email').value;
    let email2 = document.getElementById('email2').value;

    let user_records = new Array();
    user_records = JSON.parse(localStorage.getItem('users'))?JSON.parse(localStorage.getItem('users')):[]

    if (user_records.some((v)=>{return v.email == email})){
        setError(email, 'Podany email już istnieje w bazie');
    } else {user_records.push({
      'username': username,
      'password': password,
      'email': email,
      'email2': email2
    })

    localStorage.setItem('users', JSON.stringify(user_records));
    let current_user = user_records.filter((v) => {return v.email == email && v.password == password})[0]
    localStorage.setItem('username', current_user.username);
    localStorage.setItem('email', current_user.email);

    }

};