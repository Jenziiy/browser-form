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

const userCache = {};

function getUserDetail(username){
  // a promise will be returned cached or not cached. 

  if (userCache[username]) {
    // return a promise without the 'new' keyword
    return Promise.resolve(userCache[username]);
  }
  // use Fetch API to get info -> fetch returns a promise.

    return fetch('users/' + username + '.json')
   .then((result) => { 
    if (!result.statusText) {
      userCache[username] = result
    return result; 
    } else {
      throw('Could not find user: ' + username);
    }
  })
  .catch((error) => {
  return new Error('catch me if you can', error);
  })
}

getUserDetail('jeanine')
.then((response) => console.error(response) );



new Promise((resolve, reject) => {
  // mock async action 
  setTimeout(() => { resolve(10); }, 3000);
})
.then((result) => {
  console.log(result);
});

new Promise((resolve, reject) => {
  setTimeout(() => { resolve(10);}, 3000);
})
.then((num) => { console.log('first then:', num); return num *2; } ) 
.then((num) => {console.log('second then:', num); return num *2; } )
.then((num) => {console.log('last then:', num)});

new Promise((resolve, reject) => {
  setTimeout( () => {reject(Error('Data could not be found')); }, 3000 );
})
.then((e) =>{console.log('done', e); })
.catch((e) => {console.error(e) });

(new Promise((resolve, reject) => reject('nope')))
.then(() => console.log('success'))
.catch(() => console.log('fail'))
.finally(res => console.log('finally'));

const request1 = fetch('dgsdh');
const request2 = fetch('/users/jeanin.json');

Promise.all([request1, request2]).then((results) => {
if (!results[0].ok){
  throw new Error('404 not ok');
}
 console.log('nuffin');
})
.catch(err => console.error(err));

Promise.resolve(navigator.getBattery())
.then((ok)=> console.log('hi', ok));


