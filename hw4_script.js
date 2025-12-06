/*Program Name: hw4_script.js (patient-form)
Author: Paola Ramirez
Date Created: 11/30/2025
Date Last edited: 12/6/2025
Version 4.0
Description: This script handles the dynamic functionality and persistence for the enrollment form. 
Key features include:
1. Form Validation: Displays real-time error messages and controls the submit button's active state.
2. Fetch API: Loads state options from an external 'states.html' file into the state dropdown.
3. Data Persistence: Implements Local Storage to save all form fields automatically.
4. User Cookies: Manages the "Remember Me" function by setting/deleting a cookie for the username.*/


//Fetch Api Code
function fetchStateOptions() {
    const stateSelect = document.getElementById('state');
    
    // Initiate the fetch request
    fetch('states.html')
        .then(response => {
            // Check for HTTP status 
            if (!response.ok) {
                // If not OK, throw an Error to trigger the catch block below
                throw new Error(`HTTP error! Status: ${response.status} - Could not find states.html`);
            }
            // Return the Promise from response.text() to extract the content
            return response.text();
        })
        // The second .then() receives the actual content (stateHtml)
        .then(stateHtml => {
            // 5. Inject the fetched HTML content into the select element
            stateSelect.innerHTML = stateHtml; 
            console.log("State options loaded successfully via Fetch API.");
        })
        // The catch() block handles any errors from the network or the processing steps
        .catch(error => {
            console.error('Fetch API error (States):', error);
            
            // Error message in the dropdown
            stateSelect.innerHTML = '<option value="" disabled selected>ERROR: States Failed to Load</option>';
        });
}
//Initialization and Integration FETCH API
window.onload = function() {

    fetchStateOptions(); 

}
    
    // Dynamic Year in Footer
    const dynamicYear = document.getElementById('dynamic-year');
    if (dynamicYear) {
        dynamicYear.textContent = new Date().getFullYear();
    }
    
    // Full date for "Accessed" and "Submitted"
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }

    // Disable submit button initially 
    const submitButton = document.getElementById("submit");
    if (submitButton) {
        submitButton.disabled = true; 
    }
    
    // Alert Box Close Listener 
    const closeAlertButton = document.getElementById('close-alert');
    if (closeAlertButton) {
        closeAlertButton.addEventListener('click', function() {
            // Hide the custom alert box when the ok button is clicked
            document.getElementById('alert-box').style.display = 'none';
        });
    }




// First Name validation js code
function validateFirstName() {
    var fname = document.getElementById("firstName").value.trim();
    var namePattern = /^[a-zA-Z'\-]+$/;
    
    if (fname == "") {
        document.getElementById("firstName-error").innerHTML = "First name field cannot be empty.";
        return false;
    } else if (!fname.match(namePattern)) {
        document.getElementById("firstName-error").innerHTML = "Letters, apostrophes, and dashes only.";
        return false;
    } else if (fname.length < 2) {
        document.getElementById("firstName-error").innerHTML = "First name cannot be less than 2 characters.";
        return false;
    } else if (fname.length > 30) {
        document.getElementById("firstName-error").innerHTML = "First Name cannot be more than 30 characters.";
        return false;
    } else {
        document.getElementById("firstName-error").innerHTML = "";
        // saveToLocalStorage('firstName')
        return true;
    }
}

// Last name validation js code
function validateLastName() {
    var lname = document.getElementById("lastName").value.trim();
    var namePattern = /^[a-zA-Z'\-]+$/;

    if (lname == "") {
        document.getElementById("lastName-error").innerHTML = "Last name field cannot be empty.";
        return false;
    } else if (!lname.match(namePattern)) {
        document.getElementById("lastName-error").innerHTML = "Letters, apostrophes, and dashes only.";
        return false;
    } else if (lname.length < 2) {
        document.getElementById("lastName-error").innerHTML = "Last name cannot be less than 2 characters.";
        return false;
    } else if (lname.length > 30) {
        document.getElementById("lastName-error").innerHTML = "Last Name cannot be more than 30 characters.";
        return false;
    } else {
        document.getElementById("lastName-error").innerHTML = "";
        // saveToLocalStorage('lastName')
        return true;
    }
}

// Middle Initial validation js code
function validateMiddleInitial() {
    var m_initial = document.getElementById("middleInitial").value.trim();
    var upperCasePattern = /^[A-Z]?$/;
    var lowerCasePattern = /[a-z]/; 

    if (m_initial === "") {
        document.getElementById("middleInitial-error").innerHTML = "";
        return true;
    }
    
    if (lowerCasePattern.test(m_initial)) {
        document.getElementById("middleInitial-error").innerHTML = "Middle initial must be an uppercase letter.";
        return false;
    }
    
    if (m_initial.length > 1) {
        document.getElementById("middleInitial-error").innerHTML = "Middle initial can only be 1 character in uppercase.";
        return false;
    }
    
    if (!m_initial.match(upperCasePattern)) {
        document.getElementById("middleInitial-error").innerHTML = "Letters only.";
        return false;
    }
    
    document.getElementById("middleInitial-error").innerHTML = "";
    // saveToLocalStorage('middleInitial')
    return true;
}

//Validate dob from form
function validateDob() {
    dob = document.getElementById("dob");
    let date = new Date(dob.value);
    let maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 120);
    
    if (date > new Date()) {
        document.getElementById("dob-error").innerHTML = "Date cannot be in the future. Please enter a valid date.";
        dob.value = "";
        return false;
    }
    else if(date < new Date(maxDate)) {
        document.getElementById("dob-error").innerHTML = "Date cannot be more than 120 years ago.";
        dob.value = "";
        return false;
    }
    else {
        document.getElementById("dob-error").innerHTML = "";
        // saveToLocalStorage('dob')
        return true;
    }
}

//Validate Gender
function validateGender() {
    const male = document.getElementById("male").checked;
    const female = document.getElementById("female").checked;
    const other = document.getElementById("other").checked;
    const specify = document.getElementById("specify").value.trim();
    const error = document.getElementById("gender-error");

    if (!male && !female && !other) {
        error.innerHTML = "Please select a gender.";
        return false;
    }

    if (other && specify === "") {
        error.innerHTML = "Please specify your gender.";
        return false;
    }

    error.innerHTML = "";
    // saveToLocalStorage('gender')
    return true;
}

// SSN validation 
function validateSSN() {
    const ssnInput = document.getElementById("ssn");
    let ssnDigits = ssnInput.value.replace(/[^0-9]/g, "");
    const ssnError = document.getElementById("ssn-error");
    
    if (ssnDigits.length === 0) {
        ssnError.innerHTML = "Social Security Number is required.";
        ssnInput.value = "";
        return false;
    }

    let formattedSSN = ssnDigits;
    
    if (formattedSSN.length > 3) {
        formattedSSN = formattedSSN.slice(0, 3) + "-" + formattedSSN.slice(3);
    }
    if (formattedSSN.length > 6) {
        formattedSSN = formattedSSN.slice(0, 6) + "-" + formattedSSN.slice(6);
    }
    
    ssnInput.value = formattedSSN.slice(0, 11);

    const strictSSNPattern = /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/; 

    if (ssnDigits.length !== 9) {
        ssnError.innerHTML = "Invalid SSN format: Must contain exactly 9 digits.";
        return false;
    }
    
    if (!strictSSNPattern.test(ssnInput.value)) { 
        ssnError.innerHTML = "SSN must be in the format ###-##-#### (9 digits).";
        return false;
    } else {
        ssnError.innerHTML = "";
        // saveToLocalStorage('ssn')
        return true;
    }
}

//Address validation
function validateAddress1() {
    var ad1 = document.getElementById("addressLine1").value;
    const trimmedAd1 = ad1.trim();

    if (trimmedAd1.length === 0) {
        document.getElementById("address1-error").innerHTML = "Address field cannot be left blank.";
        return false;
    }

    if (trimmedAd1.length < 2 || trimmedAd1.length > 30) {
        document.getElementById("address1-error").innerHTML = "Please enter a valid address (2–30 characters).";
        return false;
    }

    document.getElementById("address1-error").innerHTML = "";
    // saveToLocalStorage('addressLine1')
    return true;
}

// Address Line 2 validation (optional)
function validateAddress2() {
    var ad2 = document.getElementById("addressLine2").value;
    const trimmedAd2 = ad2.trim();

    if (trimmedAd2.length === 0) {
        document.getElementById("address2-error").innerHTML = "";
        // saveToLocalStorage('addressLine2')
        return true;
    }

    if (trimmedAd2.length < 2 || trimmedAd2.length > 30) {
        document.getElementById("address2-error").innerHTML = "Please enter a valid address (2–30 characters).";
        return false;
    }

    document.getElementById("address2-error").innerHTML = "";
    // saveToLocalStorage('addressLine2')
    return true;
}

// City validation
function validateCity() {
    const cityInput = document.getElementById("city");
    const city = cityInput.value.trim();
    const cityError = document.getElementById("city-error");

    if (city.length === 0) {
        cityError.innerHTML = "City cannot be left blank.";
        return false;
    }

    if (city.length < 2 || city.length > 30) {
        cityError.innerHTML = "City must be between 2 and 30 characters.";
        return false;
    }
    
    const cityPattern = /^[a-zA-Z\s'-]+$/;
    
    if (!cityPattern.test(city)) {
        cityError.innerHTML = "City name can only contain letters, spaces, dashes, or apostrophes.";
        return false;
    }

    cityError.innerHTML = "";
    // saveToLocalStorage('city')
    return true;
}


//state validation
function validateState() {
    const state = document.getElementById("state").value;
    const error = document.getElementById("state-error");

    if (state === "0" || state === "") {
        error.innerHTML = "State is required.";
        return false;
    }
    error.innerHTML = "";
    // saveToLocalStorage('state')
    return true;
}

//Zipcode Validation
function validateZcode() {
    const zipInput = document.getElementById("zipcode");
    let zip = zipInput.value.replace(/[^\d-]/g, ""); 
    if (!zip) {
        document.getElementById("zipcode-error").innerHTML = "Zip code cannot be left blank";
        return false;
    }
    
    const zipPattern = /^\d{5}(-\d{4})?$/; 
    if (!zipPattern.test(zip)) {
        document.getElementById("zipcode-error").innerHTML = "Please enter a valid ZIP code (00000 or 00000-0000)";
        return false;
    }

    zipInput.value = zip;
    document.getElementById("zipcode-error").innerHTML = "";
    // saveToLocalStorage('zipcode')
    return true;
}

// email validation 
function validateEmail() {
    const emailInput = document.getElementById("emailAddress");
    let email = emailInput.value.trim().toLowerCase();
    
    emailInput.value = email;

    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 

    if (email === "") {
        document.getElementById("email-error").innerHTML = "Email field cannot be empty";
        return false;
    } else if (!email.match(emailReg)) {
        document.getElementById("email-error").innerHTML = "Must enter a valid email address (e.g., name@domain.tld)";
        return false;
    } else {
        document.getElementById("email-error").innerHTML = "";
        // saveToLocalStorage('emailAddress')
        return true;
    }
}

//Phone Number validation js code 
function validatePhone() {
    const phoneInput = document.getElementById("phone");
    const phoneError = document.getElementById("phone-error");
    const phone = phoneInput.value.replace(/\D/g, "");

    if (phone.length === 0) {
        phoneError.innerHTML = "Phone number field cannot be left blank.";
        return false;
    }

    if (phone.length !== 10) {
        phoneError.innerHTML = "Please enter a valid 10-digit phone number.";
        return false;
    }

    const formattedPhone = phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6);
    phoneInput.value = formattedPhone;
    phoneError.innerHTML = "";
    // saveToLocalStorage('phone')
    return true;
}

// Username validation
function validateUsername() {
    const usernameInput = document.getElementById("username");
    let username = usernameInput.value.trim(); 
    const usernameError = document.getElementById("username-error");

    if (username.length === 0) {
        usernameError.innerHTML = "Username field cannot be empty.";
        return false;
    }

    if (/^[0-9]/.test(username)) {
        usernameError.innerHTML = "Username cannot start with a number.";
        return false;
    }

    const regex = /^[a-zA-Z0-9_-]+$/; 
    if (!regex.test(username)) {
        usernameError.innerHTML = "Username can only contain letters, numbers, dashes, and underscores.";
        return false;
    }

    if (username.length < 5) {
        usernameError.innerHTML = "Username must be at least 5 characters.";
        return false;
    }
    if (username.length > 20) {
        usernameError.innerHTML = "Username cannot exceed 20 characters.";
        return false;
    }

    usernameError.innerHTML = "";
    // saveToLocalStorage('username')
    return true;
}

// Password Validation
function validatePassword() {
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value; 
    const passwordError = document.getElementById("password-error");
    const errorMessages = [];

    if (!/[a-z]/.test(password)) {
        errorMessages.push("Enter at least one lowercase letter.");
    }
    if (!/[A-Z]/.test(password)) {
        errorMessages.push("Enter at least one uppercase letter.");
    }
    if (!/[0-9]/.test(password)) {
        errorMessages.push("Enter at least one number.");
    }
    if (!/[!@#$%&*\-_.+()]/.test(password)) {
        errorMessages.push("Enter at least one special character (!@#$%&*-_.)");
    }
    
    if (password.toLowerCase().includes(username.toLowerCase()) && username !== "") {
        errorMessages.push("Password cannot contain username.");
    }

    if (password.length < 8) {
        errorMessages.push("Password must be at least 8 characters long.");
    }

    if (errorMessages.length > 0) {
        passwordError.innerHTML = errorMessages.join("<br>"); 
        return false;
    } else {
        passwordError.innerHTML = "";
        // saveToLocalStorage('password')
        return true;
    }
}

// Confirm password validation
function confirmPassword() {
    const password1 = document.getElementById("password").value;
    const password2 = document.getElementById("confirm-password").value;
    const confirmError = document.getElementById("password2-error");

    if (password1 !== password2) {
        confirmError.innerHTML = "Passwords do not match.";
        return false;
    } else {
        confirmError.innerHTML = "Passwords match.";
        // saveToLocalStorage('confirm-password')
        return true;
    }
}

// Show alert box when necessary
function showAlert() {
    var alertBox = document.getElementById("alert-box");
    // Show alert box only if it exists in the HTML
    if (alertBox) {
        alertBox.style.display = "flex";
    }
}

// Validate everything from the form
function validateAll() {
    let valid = true;

    // Ensure submit button is disabled before checking validity
    document.getElementById("submit").disabled = true;

    // Run all validations and update 'valid' status
    if (!validateFirstName()) { valid = false; }
    if (!validateMiddleInitial()) { valid = false; }
    if (!validateLastName()) { valid = false; }
    if (!validateDob()) { valid = false; }
    if (!validateGender()) { valid = false; }
    if (!validateSSN()) { valid = false; }
    if (!validateAddress1()) { valid = false; }
    if (!validateAddress2()) { valid = false; }
    if (!validateCity()) { valid = false; }
    if (!validateState()) { valid = false; }
    if (!validateZcode()) { valid = false; }
    if (!validateEmail()) { valid = false; }
    if (!validatePhone()) { valid = false; }
    if (!validateUsername()) { valid = false; }
    if (!validatePassword()) { valid = false; }
    if (!confirmPassword()) { valid = false; }
    
    // Final action based on validity
    if (valid) {
        document.getElementById("submit").disabled = false; //Enable if valid
        document.getElementById("alert-box").style.display = "none"; //Hide lingering alerts
    } else {
        //Show alert box only if validation fails
        showAlert();
    }
    
    return valid;
}

//Review input
function reviewInput() {
    const formContent = document.querySelector("form[name='signup']");
    let formOutput = "<table class='output'><th colspan='2'>Your Information:</th>";

    const inputs = formContent.querySelectorAll("input, textarea, select");
    const checkboxGroups = {};

    inputs.forEach((input) => {
        if (input.type === "button" || input.type === "submit" || input.type === "reset") return;

        let value = "";

        if (input.type === "checkbox") {
            if (!checkboxGroups[input.name]) checkboxGroups[input.name] = [];
            if (input.checked) checkboxGroups[input.name].push(input.value);
            return; 
        }

        if (input.type === "radio") {
            if (input.checked) value = input.value;
        } else if (input.type === "range") {
            value = input.value;
        } else {
            value = input.value;
        }

        if (value) {
            formOutput += `
              <tr>
                <td align="right">${input.name}</td>
                <td class="outputdata">${value}</td>
              </tr>`;
        }
    });

    for (let groupName in checkboxGroups) {
        if (checkboxGroups[groupName].length > 0) {
            formOutput += `
              <tr>
                <td align="right">${groupName}</td>
                <td class="outputdata">${checkboxGroups[groupName].join(", ")}</td>
              </tr>`;
        }
    }

    formOutput += "</table>";
    document.getElementById("showInput").innerHTML = formOutput;
}

// Cookies to remember user input
function setCookie(name, cvalue, expDays) {
    var day = new Date();
    day.setTime(day.getTime() + (expDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + day.toUTCString();
    document.cookie = name + "=" + cvalue + ";" + expires + ";path=/;";
}

function getCookie(name) {
    var cookieName = name + "=";
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();

        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

// Inputs to remember (cookies)
var inputs = [
    { id: "firstName", cookieName: "firstName" },
    { id: "lastName", cookieName: "lastName" },
    { id: "middleInitial", cookieName: "middleInitial" },
    { id: "dob", cookieName: "dob" },
    { id: "ssn", cookieName: "ssn" },
    { id: "addressLine1", cookieName: "address1" },
    { id: "city", cookieName: "city" },
    { id: "zipcode", cookieName: "zipcode" },
    { id: "emailAddress", cookieName: "emailAddress" },
    { id: "phone", cookieName: "phone" },
    { id: "username", cookieName: "username" }
];

inputs.forEach(function (input) {
    var inputElement = document.getElementById(input.id);

    if (!inputElement) return; // prevent errors if element doesn't exist

    // Prefill input fields with value from cookies
    var cookieValue = getCookie(input.cookieName);
    if (cookieValue !== "") {
        inputElement.value = cookieValue;
    }

    // Save cookie when user types
    inputElement.addEventListener("input", function () {
        setCookie(input.cookieName, inputElement.value, 30);
    });
});

// Greet user
var firstName = getCookie("firstName");
if (firstName !== "") {
    document.getElementById("welcome1").innerHTML = "Welcome back, " + firstName + "!";

    document.getElementById("welcome2").innerHTML =
        "<a href='#' id='new-user'>Not " + firstName + "? Click here to start a new form.</a>";

    document.getElementById("new-user").addEventListener("click", function () {
        inputs.forEach(function (input) {
            setCookie(input.cookieName, "", -1); // delete cookie
        });
        location.reload();
    });
}

