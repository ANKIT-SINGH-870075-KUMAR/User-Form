const modal = document.querySelector(".modal");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

window.addEventListener("click", windowOnClick);

// add user and cancel user
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



//submit user
function submitUser() {
    cancelUser();
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
    var Country = document.getElementById('country').value;
    var State = document.getElementById('state').value;
    var City = document.getElementById('city').value;

    //Phone number and Gender
    var Male = document.getElementById('male');
    var female = document.getElementById('female');
    var Gender = [];
    if (Male.checked) {
        Gender = "Male";
    }
    else if (female.checked) {
        Gender = "female";
    }

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
        age: Age,
        dateOfBirth: BirthDate,
        hobbies: hobbies,
        address: {
            addressDetails: AddressDetails,
            country: Country,
            state: State,
            city: City,
        },
        gender: Gender,
    }

    //Validation
        if (!first || !middle || !last || !Email || !Password) {
            // Name
            if ((first.length == " ") || ((first.length == " ") && (middle.length != " ") && (last.length != " "))) {
                document.getElementById('first').style.borderColor = "red";
            }
            else {
                document.getElementById('first').style.borderColor = "green";
                if (first) {
                    if (first.length < 5) {
                        alert("Name is containing less than 5 alphabets")
                        document.getElementById('first').style.borderColor = "red";
                    }
                    else if (first.length > 10) {
                        alert("Name is containing more than 10 alphabets")
                        document.getElementById('first').style.borderColor = "red";
                    }
                }
                else {
                    document.getElementById('first').style.borderColor = "green";
                }
            }
            if ((middle.length == " ") || ((first.length != " ") && (middle.length == " ") && (last.length != " "))) {
                document.getElementById('middle').style.borderColor = "red";
            }
            else {
                document.getElementById('middle').style.borderColor = "green";
                if (middle) {
                    if (middle.length < 5) {
                        alert("Name is containing less than 5 alphabets")
                        document.getElementById('middle').style.borderColor = "red";
                    }
                    else if (middle.length > 10) {
                        alert("Name is containing more than 10 alphabets")
                        document.getElementById('middle').style.borderColor = "red";
                    }
                }
                else {
                    document.getElementById('middle').style.borderColor = "green";
                }
            }
            if ((last.length == " ") || ((first.length != " ") && (middle.length != " ") && (last.length == " "))) {
                document.getElementById('last').style.borderColor = "red";
            }
            else {
                document.getElementById('last').style.borderColor = "green";
                if (last) {
                    if (last.length < 5) {
                        alert("Name is containing less than 5 alphabets")
                        document.getElementById('last').style.borderColor = "red";
                    }
                    else if (last.length > 10) {
                        alert("Name is containing more than 10 alphabets")
                        document.getElementById('last').style.borderColor = "red";
                    }
                }
                else {
                    document.getElementById('middle').style.borderColor = "green";
                }
            }

            //Email and Password
            if ((Email.length == " ") || (Email.length == " " && Password.length != " ")) {
                document.getElementById('email').style.borderColor = "red";
            }
            else {
                document.getElementById('email').style.borderColor = "green";
            }
            if ((Password.length == " ") || (Email.length != " " && Password.length == " ")) {
                document.getElementById('password').style.borderColor = "red";
            }
            else {
                document.getElementById('password').style.borderColor = "green";
                if (Password) {
                    if (Password.length < 5) {
                        document.getElementById('password').style.borderColor = "red";
                        document.getElementById('password').style.boxShadow = "0 5px 15px rgb(204 126 126 / 74%)";
                    }
                    else if (Password.length < 10) {
                        document.getElementById('password').style.borderColor = "yellow";
                        document.getElementById('password').style.boxShadow = "0 5px 15px rgb(226 232 100 / 97%)";
                    }
                    else if (Password.length < 15) {
                        document.getElementById('password').style.borderColor = "green";
                        document.getElementById('password').style.boxShadow = "0 5px 15px rgb(15 76 1 / 82%)";
                    }
                }
                else {
                    document.getElementById('password').style.borderColor = "green";
                }
            }

            //Age, Date Of Birth
            if ((Age.length == " ") || (Age.length == " " && BirthDate.length != " ")) {
                document.getElementById('age').style.borderColor = "red";
            }
            else {
                document.getElementById('age').style.borderColor = "green";
                if (Age) {
                    if (Age <= 0 || Age.length == " ") {
                        alert("age does not exist")
                        document.getElementById('age').style.borderColor = "red";
                    }
                    else if ((Age.length > 2 && Age > 100) || (Age > 100)) {
                        alert("Invalid age")
                        document.getElementById('age').style.borderColor = "red";
                    }
                }
                else {
                    document.getElementById('age').style.borderColor = "green";
                }
            }
            if ((BirthDate.length == " ") || (Age.length != " " && BirthDate.length == " ")) {
                document.getElementById('birthdate').style.borderColor = "red";
            }
            else {
                document.getElementById('birthdate').style.borderColor = "green";
            }

            //Address Details , Country , State and City
            if ((AddressDetails.length == " ") || (AddressDetails.length == " " && Country.length != " " && State.length != " " && City.length != " ")) {
                document.getElementById('addressDetails').style.borderColor = "red";
            }
            else {
                document.getElementById('addressDetails').style.borderColor = "green";
            }
            if ((Country.length == " ") || (AddressDetails.length != " " && Country.length == " " && State.length != " " && City.length != " ")) {
                document.getElementById('country').style.borderColor = "red";
            }
            else {
                document.getElementById('country').style.borderColor = "green";
            }
            if ((State.length == " ") || (AddressDetails.length != " " && Country.length != " " && State.length == " " && City.length != " ")) {
                document.getElementById('state').style.borderColor = "red";
            }
            else {
                document.getElementById('state').style.borderColor = "green";
            }
            if ((City.length == " ") || (AddressDetails.length != " " && Country.length != " " && State.length != " " && City.length == " ")) {
                document.getElementById('city').style.borderColor = "red";
            }
            else {
                document.getElementById('city').style.borderColor = "green";
            }
            addUser()
        }
        else {
            UserData.push(obj)
            localStorage.setItem("UserData", JSON.stringify(UserData));
            addRowInTable(obj);
        }
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

//add Data in Table
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
    c2.innerText = user.age
    c3.innerText = user.gender
    c4.innerText = user.hobbies
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

//Remove row in table
function removeExistingRows() {
    let rows = document.getElementsByTagName("tr");
    for (var index = 1; index < rows.length;) {
        var row = rows.item(index);
        row.remove();
    }
}

//edit user
function editUser(id) {
    toggleModal();
    document.getElementById('modal-display').style.display = "block";
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
    document.getElementById('age1').value = user.age;
    document.getElementById('birthdate1').value = user.dateOfBirth;
    user.hobbies.forEach(hobby => {
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
    document.getElementById('addressDetails1').value = user.address.addressDetails;
    document.getElementById('country1').value = user.address.country;
    countryChanged("edit");
    document.getElementById('state1').value = user.address.state;
    stateChanged("edit");
    document.getElementById('city1').value = user.address.city;

    //Phone number and Gender
    if (user.gender === "Male") {
        document.getElementById('male1').checked = true;
    } else {
        document.getElementById('female1').checked = true;
    }
}

//update user
function updateUser() {
    document.getElementById('modal-display').style.display = "none"
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

    //Phone number and Gender
    var Male = document.getElementById('male1');
    var female = document.getElementById('female1');
    var Gender = [];
    if (Male.checked) {
        Gender = "Male";
    }
    else if (female.checked) {
        Gender = "female";
    }

    var updatedUser = {
        id: userId,
        name: Name,
        email: Email,
        password: Password,
        age: Age,
        dateOfBirth: BirthDate,
        hobbies: hobbies,
        address: {
            addressDetails: AddressDetails,
            country: country,
            state: state,
            city: city,
        },
        gender:Gender,
    }

    var UserData = JSON.parse(localStorage.getItem("UserData"));

    UserData.forEach(user => {
        if (user.id === userId) {
            user.name = updatedUser.name;
            user.email = updatedUser.email;
            user.password = updatedUser.password;
            user.age = updatedUser.age;
            user.dateOfBirth = updatedUser.dateOfBirth;
            user.hobbies = updatedUser.hobbies;
            user.address = updatedUser.address;
            user.gender = updatedUser.gender;
        }
    });

    localStorage.setItem("UserData", JSON.stringify(UserData));
    updateUserDataState();
}

//delete user
function deleteUser(id) {
    var userData = JSON.parse(localStorage.getItem("UserData"));
    userData = userData.filter(user => user.id !== id);
    localStorage.setItem("UserData", JSON.stringify(userData));
    updateUserDataState();
}

// country change
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

// state change
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

//Country , state and city array
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