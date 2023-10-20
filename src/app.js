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

function checkZIP(){
  // For each supported country, define the pattern the ZIP code has to match.

  const constraints = {
    nl: ["^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
        "Nederlandse postcodes bestaan uit 4 nummers, gevolgd door 2 letters. Geen SA, SD, SS",
      ],
  }


  // read country id value
  const country = document.getElementById('country').value;

  // get field
  const ZIPField = document.getElementById("zipcode");

  // constraint checker
  const constraint = new RegExp(constraints[country][0], "");
  console.log(constraint);

  //check

  if (constraint.test(ZIPField.value)) {
    //zip matches patterns
    ZIPField.setCustomValidity("");
    ZIPField.reportValidity();
  } else {
    // zip is incorrect
  ZIPField.setCustomValidity(constraints[country][1])
  ZIPField.reportValidity();
  }
}

window.onload = () => {
  document.getElementById("country").onchange = checkZIP;
  document.getElementById("zipcode").oninput = checkZIP;
}

// let p = new Promise(function(resolve, reject) {
//   //Do async task and then
//   if("good") {
//     resolve("Success!");
//   } else {
//     reject("failure!");
//   }
// });

// p.then(function(result){
//   //do smth with the result
// }).catch(function(){
//   //error
// }).finally(function(){
//   //executes regardless of success or failure.
// });


function get(url) {
  //return new promise.
  return new Promise((resolve, reject) => {
    //do the usual hr stuff
    const req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = () => {
      //called on all http statuses, so check status. 
      if (req.status == 200) {
        //resolve the promise with response text
        resolve(req.response);
      } else {
        //otherwise reject with status txt
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // handle network errors
    req.onerror = () => {
      reject(Error("Network Error"));
    };

    //Make the request
    req.send();
  });
}

//use it
get('story.json').then(response => {
  console.log("Success!", response);
}, error => {
  console.error("Failed!", error);
});