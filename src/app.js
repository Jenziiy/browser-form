let password = document.getElementById("password");
let email = document.getElementById("email");
let confirmPassword = document.getElementById("confirm-password");

function confirmThePassword( password, confirmPassword ) {
  if ( password.value !== confirmPassword.value ) {
    confirmPassword.setCustomValidity("you should make em match");
    confirmPassword.reportValidity();
  } else {
    confirmPassword.setCustomValidity("");
  }
}
function checkPassword(password){
  if ( password.value.length < 8 ) {
    password.setCustomValidity("such short password, increase length to min of 8 chars thx");
    password.reportValidity();
  } else {
    password.setCustomValidity('');
  }
}

email.addEventListener("input", (event) => {
  if ( email.validity.typeMismatch){
    email.setCustomValidity("I am expecting an email address tx");
    email.reportValidity();
  } else {
    email.setCustomValidity("");
  }
})

password.addEventListener("blur", checkPassword.bind( this, password ) );
password.addEventListener("input", () => password.setCustomValidity('') );
confirmPassword.addEventListener("blur", confirmThePassword.bind( this, password,confirmPassword ) );
confirmPassword.addEventListener("input", () => confirmPassword.setCustomValidity('') );

