// Add and close User
function addUser() {
    document.getElementById("add-user").style.display = "flex";
    var options = `<option>Enter Your Country</option>`;
    for (var index = 0; index < countryStateCity.length; index++) {
        options += "<option>" + countryStateCity[index].country + "</option>";
    }
    document.getElementById("country").innerHTML = options;
}

function cancelUser() {
    document.getElementById("add-user").style.display = "none";
}

//Submit User Details
function SubmitUser() {
    //Name
    var first = document.getElementById('first').value;
    var middle = document.getElementById('middle').value;
    var last = document.getElementById('last').value;
    var Name = first + " " + middle + " " + last;

    //Email and Password
    var Email = document.getElementById('email').value;
    var Password = document.getElementById('password').value;

    //Age , Date of Birth and Hobbies
    var Age = document.getElementById('age').value;
    var BirthDate = document.getElementById('birthdate').value;
    var hobbies = [];
    if (document.getElementById('hob1').checked) {
        hobbies.push("Dancing");
    }
    if (document.getElementById('hob2').checked) {
        hobbies.push("Singing");
    }
    if (document.getElementById('hob3').checked) {
        hobbies.push("Reading Book");
    }
    if (document.getElementById('hob4').checked) {
        hobbies.push("Video Gaming");
    }
    if (document.getElementById('hob5').checked) {
        hobbies.push("Cricket");
    }

    //Address
    var AddressDetails = document.getElementById('addressDetails').value;
    var country = document.getElementById('country').value;
    var state = document.getElementById('state').value;
    var city = document.getElementById('city').value;
    console.log(country);
    console.log(state);
    console.log(city)

    //Phone number and Gender
    var PhoneNo = document.getElementById('phone').value;
    var Male = document.getElementById('male');
    var female = document.getElementById('female');
    var GENDER = [];
    if (Male.checked) {
        GENDER = "Male";
    }
    else if (female.checked) {
        GENDER = "female";
    }

    //Education Details
    var Class = document.getElementById('class').value;
    var Graduation = document.getElementById('Graduation').value;
    var PostGraduation = document.getElementById('PostGraduation').value;
    console.log(Class);
    console.log(Graduation);
    console.log(PostGraduation)

    var UserData = JSON.parse(localStorage.getItem("UserData"));
    let id = 1;
    if (!UserData) {
        UserData = [];
    } else {
        id = UserData.length + 1;
    }
    var obj = {
        id: id,
        name: Name,
        email: Email,
        password: Password,
        Age: Age,
        dateOfBirth: BirthDate,
        Hobbies: hobbies,
        Address: {
            addressDetails: AddressDetails,
            country: country,
            state: state,
            city: city,
        },
        phoneNo: PhoneNo,
        Gender: GENDER,
        education: {
            class: Class,
            graduation: Graduation,
            postgraduation: PostGraduation,
        },
    }

    // if (validation(obj)) {
    UserData.push(obj)
    localStorage.setItem("UserData", JSON.stringify(UserData));

    addRowInTable(obj);
}

// Password validation
function keyPress() {
    var Password = document.getElementById('password').value;
    var b = document.querySelector('p');
    var User2 = document.getElementById('User2');
    b.style.transform = "scale(1)";
    b.style.height = "10vh"
    User2.style.height = "38vh"
    if (Password.length < 4) {
        b.innerHTML = "Week Password";
        b.style.backgroundColor = "red";
        b.style.color = "white";
    }
    else if (Password.length < 8) {
        b.innerHTML = "Average Password";
        b.style.backgroundColor = "yellow";
        b.style.color = "black";
    }
    else {
        b.innerHTML = "Strong Password";
        b.style.backgroundColor = "green";
        b.style.color = "white";
    }
}

// identify Password quality
function displayalert() {
    var b = document.querySelector('p');
    var User2 = document.getElementById('User2');
    b.style.transform = "scale(0)";
    b.style.height = "0vh"
    User2.style.height = "30vh"
}

//Default function call
window.onload = function () {
    updateUserDataState(true);
};

//Fetch Data
function updateUserDataState(onload) {
    var UserData = JSON.parse(localStorage.getItem("UserData"));

    if (UserData) {
        if (!onload) {
            removeExistingRows();
        }
        UserData.forEach(user => {
            addRowInTable(user);
        });
    }
}

function addRowInTable(user) {
    // Get the table body element in which you want to add row
    let table = document.getElementById("table");

    // Create row element
    let row = document.createElement("tr")
    // Create cells
    let c1 = document.createElement("th")
    let c2 = document.createElement("th")
    let c3 = document.createElement("th")
    let c4 = document.createElement("th")
    let c5 = document.createElement("th")
    let c6 = document.createElement("th")
    c1.classList = "table-row"
    c2.classList = "table-row"
    c3.classList = "table-row"
    c4.classList = "table-row"
    c5.classList = "table-row"
    c6.classList = "table-row"
    // Insert data to cells
    c1.innerText = user.name
    c2.innerText = user.Age
    c3.innerText = user.Gender
    c4.innerText = user.phoneNo
    c5.innerText = user.email
    c6.innerHTML = `<button type='button' class='btn-Edit' onclick=editUser(${user.id})>Edit</button>&nbsp;&nbsp;&nbsp;<button type='button' class='btn-del' onclick=deleteUser(${user.id})>Delete</button>`
    // Append cells to row
    row.appendChild(c1);
    row.appendChild(c2);
    row.appendChild(c3);
    row.appendChild(c4);
    row.appendChild(c5);
    row.appendChild(c6);

    // Append row to table body
    table.appendChild(row);
}

function removeExistingRows() {
    let rows = document.getElementsByTagName("tr");
    for (var index = 1; index < rows.length;) {
        var row = rows.item(index);
        row.remove();
    }
}

function editUser(id) {
    cancelUser();
    document.getElementById('update-user').style.display = "flex";
    localStorage.setItem("editUserId", id);
    var UserData = JSON.parse(localStorage.getItem("UserData"));
    var user = UserData.find(u => u.id === id);

    var options = "";
    options += `<option>Enter Your Country</option>`;
    for (var index = 0; index < countryStateCity.length; index++) {
        options += "<option>" + countryStateCity[index].country + "</option>";
    }
    document.getElementById("country1").innerHTML = options;

    //Name
    var fullName = user.name.split(' ');
    document.getElementById('first1').value = fullName[0];
    document.getElementById('middle1').value = fullName[1];
    document.getElementById('last1').value = fullName[2];

    //Email and Password
    document.getElementById('email1').value = user.email;
    document.getElementById('password1').value = user.password;

    //Age , Date of Birth and Hobbies
    document.getElementById('age1').value = user.Age;
    document.getElementById('birthdate1').value = user.dateOfBirth;
    user.Hobbies.forEach(hobby => {
        if (hobby === "Dancing") {
            document.getElementById('hob11').checked = true;
        } else if (hobby === "Singing") {
            document.getElementById('hob22').checked = true;
        } else if (hobby === "Reading Book") {
            document.getElementById('hob33').checked = true;
        } else if (hobby === "Video Gaming") {
            document.getElementById('hob44').checked = true;
        } else if (hobby === "Cricket") {
            document.getElementById('hob55').checked = true;
        }
    })

    //Address
    document.getElementById('addressDetails1').value = user.Address.addressDetails;
    document.getElementById('country1').value = user.Address.country;
    countryChanged("edit");
    document.getElementById('state1').value = user.Address.state;
    stateChanged("edit");
    document.getElementById('city1').value = user.Address.city;

    //Phone number and Gender
    document.getElementById('phone1').value = user.phoneNo;
    if (user.Gender === "Male") {
        document.getElementById('male1').checked = true;
    } else {
        document.getElementById('female1').checked = true;
    }

    //Education Details
    document.getElementById('class1').value = user.education.class;
    document.getElementById('Graduation1').value = user.education.graduation;
    document.getElementById('PostGraduation1').value = user.education.postgraduation;
}

function updateUser() {
    var userId = Number(localStorage.getItem('editUserId'));

    // Name
    var first = document.getElementById('first1').value;
    var middle = document.getElementById('middle1').value;
    var last = document.getElementById('last1').value;
    var Name = first + " " + middle + " " + last;

    //Email and Password
    var Email = document.getElementById('email1').value;
    var Password = document.getElementById('password1').value;

    //Age , Date of Birth and Hobbies
    var Age = document.getElementById('age1').value;
    var BirthDate = document.getElementById('birthdate1').value;
    var hobbies = [];
    if (document.getElementById('hob11').checked) {
        hobbies.push("Dancing");
    }
    if (document.getElementById('hob22').checked) {
        hobbies.push("Singing");
    }
    if (document.getElementById('hob33').checked) {
        hobbies.push("Reading Book");
    }
    if (document.getElementById('hob44').checked) {
        hobbies.push("Video Gaming");
    }
    if (document.getElementById('hob55').checked) {
        hobbies.push("Cricket");
    }

    //Address
    var AddressDetails = document.getElementById('addressDetails1').value;
    var country = document.getElementById('country1').value;
    var state = document.getElementById('state1').value;
    var city = document.getElementById('city1').value;
    console.log(country);
    console.log(state);
    console.log(city)

    //Phone number and Gender
    var PhoneNo = document.getElementById('phone1').value;
    var Male = document.getElementById('male1');
    var female = document.getElementById('female1');
    var GENDER = [];
    if (Male.checked) {
        GENDER = "Male";
    }
    else if (female.checked) {
        GENDER = "female";
    }

    //Education Details
    var Class = document.getElementById('class1').value;
    var Graduation = document.getElementById('Graduation1').value;
    var PostGraduation = document.getElementById('PostGraduation1').value;

    var updatedUser = {
        id: userId,
        name: Name,
        email: Email,
        password: Password,
        Age: Age,
        dateOfBirth: BirthDate,
        Hobbies: hobbies,
        Address: {
            addressDetails: AddressDetails,
            country: country,
            state: state,
            city: city,
        },
        phoneNo: PhoneNo,
        Gender: GENDER,
        education: {
            class: Class,
            graduation: Graduation,
            postgraduation: PostGraduation,
        },
    }

    var UserData = JSON.parse(localStorage.getItem("UserData"));

    UserData.forEach(user => {
        if (user.id === userId) {
            user.name = updatedUser.name;
            user.email = updatedUser.email;
            user.password = updatedUser.password;
            user.Age = updatedUser.Age;
            user.dateOfBirth = updatedUser.dateOfBirth;
            user.Hobbies = updatedUser.Hobbies;
            user.Address = updatedUser.Address;
            user.phoneNo = updatedUser.phoneNo;
            user.Gender = updatedUser.Gender;
            user.education = updatedUser.education;
        }
    });

    localStorage.setItem("UserData", JSON.stringify(UserData));
    updateUserDataState();
    document.getElementById("update-user").style.display = "none";
}

function deleteUser(id) {
    var userData = JSON.parse(localStorage.getItem("UserData"));
    userData = userData.filter(user => user.id !== id);
    localStorage.setItem("UserData", JSON.stringify(userData));
    updateUserDataState();
}

function validation(obj) {
    // Validation in the Application Form    

    //1. Name
    if ((obj.first.length == " ") || (obj.middle.length == ' ') || (obj.last.length == ' ') || (obj.first.length == ' ' && middle.length == ' ' && last.length == ' ')) {
        alert('Name must be filled out');
        return false;
    }

    else if ((obj.first.length <= 3) || (obj.middle.length <= 3) || (obj.last.length <= 3) || (obj.first.length <= 3 && obj.middle.length <= 3 && obj.last.length <= 3)) {
        alert('Name length is greater than 3');
        return false;
    }

    else if ((obj.first.length >= 8) || (obj.middle.length >= 8) || (obj.last.length >= 8) || (obj.first.length >= 8 && obj.middle.length >= 8 && obj.last.length >= 8)) {
        alert('Name length is less than 8');
        return false;
    }

    //2. Email and Password
    if ((obj.Email.length == " ") || (obj.Password.length == " ") || (obj.Email.length == " " && obj.Password.length == " ")) {
        alert("Email and Password must be filled out");
        return false;
    }

    //3. Age
    if (obj.Age < 0) {
        alert("The age must not be negative!");
        return false;
    }
    else if (obj.Age.length == " ") {
        alert('Age must be filled out');
        return false;
    }
    else if (obj.Age == 0) {
        alert('Please enter valid age!');
        return false;
    }
    else if (obj.Age > 70) {
        alert("The age is not be greater than 70");
        return false;
    }
    else if (obj.Age.length > 2) {
        alert("The Age length is not greater than Two digit");
        return false;
    }

    //4. Phone Number
    if (obj.PhoneNo.length == " ") {
        alert('Phone Number must be filled out');
        return false;
    }
    else if (obj.PhoneNo.length > 10) {
        alert('Phone Number is not be greater than 10');
        return false;
    }
    else if (obj.PhoneNo.length < 0 || obj.PhoneNo.length < 10) {
        alert('Phone Number is not be less than 10');
        return false;
    }
    return true;
}

function countryChanged(addOrEdit){
    var countryElementId = addOrEdit === "add" ? "country" : "country1";
    var stateElementId = addOrEdit === "add" ? "state" : "state1";

    var country = document.getElementById(countryElementId).value;
    var options = `<option>Enter Your State</option>`
    var countryIndex = 0;
    for (var index = 0; index < countryStateCity.length; index++) {
        if(country === countryStateCity[index].country) {
            countryIndex = index;
            break;
        }
    }

    var stateList = countryStateCity[countryIndex].state;
    for (var index = 0; index < stateList.length; index++) {
        options += "<option>" + stateList[index].stateName + "</option>";
    }

    document.getElementById(stateElementId).innerHTML = options;
    stateChanged(addOrEdit);
}

function stateChanged(addOrEdit) {
    var countryElementId = addOrEdit === "add" ? "country" : "country1";
    var stateElementId = addOrEdit === "add" ? "state" : "state1";
    var cityElementId = addOrEdit === "add" ? "city" : "city1";

    var country = document.getElementById(countryElementId).value;
    var state = document.getElementById(stateElementId).value;
    var countryIndex = 0;
    for (var index = 0; index < countryStateCity.length; index++) {
        if(country === countryStateCity[index].country) {
            countryIndex = index;
            break;
        }
    }

    var stateList = countryStateCity[countryIndex].state;
    var stateIndex = 0;
    for (var index = 0; index < stateList.length; index++) {
        if(state === stateList[index].stateName) {
            stateIndex = index;
            break;
        }
    }

    var options = `<option>Enter Your City</option>`;
    var cityList = stateList[stateIndex].cities;
    for (var index = 0; index < cityList.length; index++) {
        options += "<option>" + cityList[index] + "</option>";
    }

    document.getElementById(cityElementId).innerHTML = options;
}

var countryStateCity = [
    {
        country: "India",
        state: [
            {
                stateName: "Delhi",
                cities: ["Delhi", "Burari"]
            },
            {
                stateName: "Uttar Pradesh",
                cities: ["Agra", "Lucknow", "Meerut"]
            }
        ]
    },
    {
        country: "Australlia",
        state: [
            {
                stateName: "Australlia-Test1",
                cities: ["Australlia-Test-City1", "Australlia-Test-City11", "Australlia-Test-City111"]
            },
            {
                stateName: "Australlia-Test2",
                cities: ["Australlia-Test-City2", "Australlia-Test-City22", "Australlia-Test-City222"]
            }
        ]
    },
    {
        country: "Brazil",
        state: [
            {
                stateName: "Brazil-Test1",
                cities: ["Brazil-Test-City1", "Brazil-Test-City11", "Brazil-Test-City111"]
            },
            {
                stateName: "Brazil-Test2",
                cities: ["Brazil-Test-City2", "Brazil-Test-City22", "Brazil-Test-City222"]
            }
        ]
    }
]