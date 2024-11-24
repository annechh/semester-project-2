export function checkIfEmptyField(fieldValue, errorMessageElement) {
  if (!fieldValue) {
    errorMessageElement.textContent =
      'This field cannot be empty, please fill out.';
    errorMessageElement.classList.remove('hidden');
    return true;
  } else {
    errorMessageElement.textContent = '';
    errorMessageElement.classList.add('hidden');
    return false;
  }
}

export function nameValidation(name, nameError) {
  const namePrefix = /^[\w]{1,20}$/;
  if (!namePrefix.test(name)) {
    nameError.textContent =
      'Username can only contain letters, numbers, and underscores.';
    nameError.classList.remove('hidden');
    return false;
  } else {
    nameError.textContent = '';
    nameError.classList.add('hidden');
    return true;
  }
}

export function emailValidation(email, emailError) {
  const emailPrefix = /^[\w\-.]+@(stud\.)?noroff\.no$/;
  if (!emailPrefix.test(email)) {
    emailError.textContent =
      'Not a valid email address. Must contain @stud.noroff.no or @noroff.no.';
    emailError.classList.remove('hidden');
    return false;
  }
  emailError.textContent = '';
  emailError.classList.add('hidden');
  return true;
}

export function passwordValidation(password, passwordError) {
  if (password.length < 8) {
    passwordError.textContent = 'Password needs to be at least 8 characters.';
    passwordError.classList.remove('hidden');
    return false;
  }
  passwordError.textContent = '';
  passwordError.classList.add('hidden');
  return true;
}

export function validateName() {
  const nameInput = document.getElementById('name');
  const nameError = document.getElementById('nameError');
  const name = nameInput.value;

  if (checkIfEmptyField(name, nameError)) {
    return false;
  }

  return nameValidation(name, nameError);
}

export function validateEmail() {
  const emailInput = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const email = emailInput.value;

  if (checkIfEmptyField(email, emailError)) {
    return false;
  }

  return emailValidation(email, emailError);
}

export function validatePassword() {
  const passwordInput = document.getElementById('password');
  const passwordError = document.getElementById('passwordError');
  const password = passwordInput.value;

  if (checkIfEmptyField(password, passwordError)) {
    return false;
  }

  return passwordValidation(password, passwordError);
}

export function showSuccessMessage() {
  const loginForm = document.forms.login;
  const loginSuccess = document.getElementById('loginSuccess');

  const registerForm = document.forms.register;
  const registerSuccess = document.getElementById('registerSuccess');

  if (loginSuccess) {
    loginSuccess.style.display = 'block';
  }
  if (registerSuccess) {
    registerSuccess.style.display = 'block';
  }

  if (loginForm) {
    loginForm.style.display = 'none';
  }
  if (registerForm) {
    registerForm.style.display = 'none';
  }
}