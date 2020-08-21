//assign html tags to js variables
const form = document.querySelector("#form-driver");
//input
const firstnameinput = document.querySelector("#firstname");
const lastnameinput = document.querySelector("#lastname");
const ageinput = document.querySelector("#age");
const licenseinput = document.querySelector("#license");
//output
const fullnamedisplay = document.querySelector("#fullname-display");
const agedisplay = document.querySelector("#age-display");
const licensedisplay = document.querySelector("#license-display");
const infodisplay = document.querySelector("#info-display");
//controls
const submit = document.querySelector('button[type="submit"]');

/**
 *
 * @description
 * this function is meant to validate our form
 * @param {} e evant dispatched by form
 */
function validate(e) {
  //set an object person
  const person = {
    firstname: firstnameinput.value,
    lastname: lastnameinput.value,
    age: ageinput.value,
    license: licenseinput.value,
  };
  //destruct object's propreties to seperate values
  const { firstname, lastname, age, license } = person;
  if (e) e.preventDefault();
  fullnamedisplay.innerHTML = `${firstnameinput.value} ${lastnameinput.value}`;
  agedisplay.innerHTML = `${ageinput.value} year${
    parseInt(ageinput.value) > 1 ? "s" : ""
  }`;
  licensedisplay.innerHTML = `${licenseinput.value} year${
    parseInt(ageinput.value) > 1 ? "s" : ""
  }`;
  infodisplay.innerHTML =
    parseInt(ageinput.value) >= 18
      ? `permitted${parseInt(licenseinput.value) ? "exprienced" : ""}`
      : `forbidden`;

  parseInt(ageinput.value) > 18
    ? parseInt(licenseinput.value) > 2
      ? (infodisplay.style.color = "blue")
      : (infodisplay.style.color = "green")
    : (infodisplay.style.color = "red");
  if (!licenseinput.value) licensedisplay.style.display = "none";

  //save person object in localstorage
  localStorage.setItem("person", JSON.stringify(person));
}
/**
 * this function disable and enable
 */
function enabledisablesubmit() {
  if (firstnameinput.value && lastnameinput.value && ageinput.value) {
    if (parseInt(ageinput.value) >= 18 && licenseinput.value) {
      submit.disabled = false;
    } else if (parseInt(ageinput.value) < 18 && !licenseinput.value) {
      submit.disabled = false;
    } else {
      submit.disabled = true;
    }
  } else {
    submit.disabled = true;
  }
}

function enableinput() {
  if (firstnameinput.value && lastnameinput.value && ageinput.value) {
    if (parseInt(ageinput.value) >= 18) {
      licenseinput.disabled = false;
    } else {
      licenseinput.disabled = true;
    }
  }
}

form.addEventListener("submit", validate, true);
firstnameinput.addEventListener("change", enabledisablesubmit);
lastnameinput.addEventListener("change", enabledisablesubmit);
ageinput.addEventListener("change", enabledisablesubmit);
licenseinput.addEventListener("change", enabledisablesubmit);
ageinput.addEventListener("change", enableinput);

const localperson = JSON.parse(localStorage.getItem("person"));
const { firstname, lastname, age, license } = localperson;

firstnameinput.value = firstname;
lastnameinput.value = lastname;
ageinput.value = age;
licenseinput.value = license;
validate();
