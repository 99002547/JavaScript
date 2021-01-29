const serverURL = 'http://127.0.0.1:3000/api'
var userName
var validUserFlag=0
var employees
var nameFlag=0
var emailFlag=0
var phoneFlag=0
var passwordFlag=0
var qualificationFlag=0
var specializationFlag=0
var locationFlag=0
var email
var name
var phone
var password
var selectedLocationValue=""
var qualification=""
var specialization=""
var locationChoices = ["Mumbai","Banglore","Mysore","Chennai"];
const minimumLengthRequiredForNameErrorMessage="The Name field must be atleast 3 characters"
const maximumLengthAcceptedForNameErrorMessage="The Name field can have atmost 255 characters"
const nameFieldRequiredErrorMessage="Name filed is required"
const invalidNameErrorMessage="The Name field should have only alphabets"
const invalidEmailErrorMessage="The Email field must be valid email"
const passwordErrorMessage="Weak password"
const emailInputRequiredErrorMessage="Email id field is required"
const invalidPhoneNumberErrorMessage="The Phone number field should have exactly 10 digits"
const phoneNumberInputRequiredErrorMessage="Phone number is required"

function registerEmployee(){
    window.location.href="employeeRegistrationForm.html"
}

function loginEmployeeForm(){
    var userName=document.getElementById("lname").value
    var password=document.getElementById("password").value
    async function getFile() {
        let myPromise = new Promise(function(myResolve, myReject) {
            employees=validateLoginCredentials()
            setTimeout(function() {
            for (let employee of employees){
                if(employee.email==userName && employee.password==password){ 
                    validUserFlag=1
                    window.location.href="employee.html"
                    localStorage.setItem("userName",userName);
                    break
                }
                else{
                    validUserFlag=0
                }
            }
            if(validUserFlag==0){
             alert("invalid UserName or Password")
            }
        }, 3000); 
        });
    }

    getFile();
     
}

function locationSelectOptions() {
    var selectHTML=document.getElementById("location")
    selectHTML.innerHTML = "<select><option value>--Select Location--</option>"
    for(i = 0; i < locationChoices.length; i = i + 1) {
        selectHTML.innerHTML += "<option value='" + locationChoices[i] + "'>" + locationChoices[i] + "</option>"
    }
    selectHTML.innerHTML += "</select>"
}
function validateName() {
  var regex = /^[a-zA-Z]+[\sa-zA-Z]+$/;
  name=document.getElementById("name").value;
  if (name.length == 0){
    document.getElementById("nameError").innerText=nameFieldRequiredErrorMessage
    nameFlag=0
  }
  else if(name.length<3){
    document.getElementById("nameError").innerText=minimumLengthRequiredForNameErrorMessage
    nameFlag=0
  } 
  else if( name.length>255) {
    document.getElementById("nameError").innerText=maximumLengthAcceptedForNameErrorMessage
    nameFlag=0
  } 
  else if( regex.test(name) == false) {
    document.getElementById("nameError").innerText=invalidNameErrorMessage
    nameFlag=0
  }
  else {
    document.getElementById("nameError").innerText=""
    nameFlag=1
  }
}

function validateEmail() {
  email=document.getElementById("email").value;
  atpos = email.indexOf("@");
  dotpos = email.lastIndexOf(".");
  if( email.length==0) {
    document.getElementById("emailError").innerText=emailInputRequiredErrorMessage
    emailFlag=0
  } 
  else if(email.length<8 || email.length>65 ||atpos< 3 || ( dotpos-atpos< 3 ) || (email.length-dotpos < 3) ){
    document.getElementById("emailError").innerText=invalidEmailErrorMessage
    emailFlag=0
  } 
  else {
    document.getElementById("emailError").innerText=""
    emailFlag=1
    }
}

function validatePassword(){
    password=document.getElementById("password").value;
    var uppercase=/[A-Z]/;
    var lowercase=/[a-z]/;
    var number=/[0-9]/;
    var specialcharcter=/[!@#$%^&*]/;
    if(password.length==0){
        document.getElementById("pwdError").innerText=passwordErrorMessage
        passwordFlag=0
    }
    if(((password.match(uppercase))&&(password.match(lowercase))&&(password.match(number))&&(password.match(specialcharcter))))
            {
                passwordFlag=1
                document.getElementById("pwdError").innerText=""
            }
    else{
        document.getElementById("pwdError").innerText=passwordErrorMessage
        passwordFlag=0
    }
}
function validatePhone() {
  phone=document.getElementById("phone").value;
  if(phone.length==0){
    document.getElementById("phoneError").innerText=phoneNumberInputRequiredErrorMessage
    phoneFlag=0
  }
  else if(phone.length<10 || phone.length>10) {
    document.getElementById("phoneError").innerText=invalidPhoneNumberErrorMessage
    phoneFlag=0
  }
  else {
    document.getElementById("phoneError").innerText=""
    phoneFlag=1
  }
}

function validateLocation() {
  selectedLocationValue=document.getElementById("location")
  if(selectedLocationValue.options[selectedLocationValue.selectedIndex].value=="")
  alert("Please select Location")
  else
  locationFlag=1
}

function showSpecialization() {
  document.getElementById("hid").style.display="block"
  qualificationFlag=1
  var qualificationChecked=document.getElementsByName("qualification")
  for(i=0;i<qualificationChecked.length;i++)
    if(qualificationChecked[i].checked)
      qualification=qualificationChecked[i].value
}

function validateSpecialization(){
  specializationFlag=1
  specialization=document.getElementById("specialization").value
}
function formValidate() { 
    async function getFile() {
       let myPromise = new Promise(function(myResolve, myReject) {
            validateLocation()
            validateLoginCredentials(checkUserName)
            setTimeout(function() {alert("registered")}, 3000);
    })
     }
    getFile();  
}

 function checkUserName(){
    // alert(employees.length)
    //             alert(employees[0].id)
                for (let employee of employees){
                    if(employee.email==email){ 
                        validNewUserFlag=1   
                        break
                    }
                    else{
                        validNewUserFlag=0
                    }
                }
                if(validNewUserFlag==0){
                    if(nameFlag!=0 && emailFlag!=0 && passwordFlag!=0 && phoneFlag!=0 && locationFlag!=0){
                        addEmployeeForm(name,email,password,phone,selectedLocationValue.options[selectedLocationValue.selectedIndex].value,
                            qualification,specialization)
                        //setTimeout(function() {alert("registered")}, 3000); 
                    } 
                    else{
                        alert("Invalid data")
                    }          
                }
                else{
                    alert("user email already exists ")
                }
 }

window.addEventListener('DOMContentLoaded', function(){
    getEmployeeDetails()
})

function getEmployeeDetails(){
    userName=localStorage.getItem("userName")
    let xhr=new XMLHttpRequest()
    let url=`${serverURL}/employees`
    xhr.open('GET',url,true)
    xhr.send()
    xhr.onload=()=>{
        if(xhr.status === 200){
            let data = xhr.responseText
            let employees = JSON.parse(data)
            console.log(data)
            let tablerows='';
            for(let employee of employees){
                if(userName==employee.email){
                tablerows+=`<tr>
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.password}</td>
                <td>${employee.phone}</td>
                <td>${employee.location}</td>
                <td>${employee.qualification}</td>
                <td>${employee.specialization}</td>
                <td>
                    <button class="btn btn-primary update mt-0 btn-sm" >Update</button>
                    <button class="btn btn-danger delete mt-0 btn-sm" >Delete</button>
                </td>
                </tr>`
            }
        }
            document.querySelector('#table-body').innerHTML=tablerows 
        }
    }    
}

function validateLoginCredentials(mycallback){
    let xhr=new XMLHttpRequest()
    let url=`${serverURL}/employees`
    xhr.open('GET',url,true)
    xhr.send() 
    xhr.onload=()=>{
        if(xhr.status === 200){
            let data = xhr.responseText
            employees = JSON.parse(data)
            console.log(employees)
            alert(employees.length)
            mycallback()
        }   
    } 
      
}

function fetchDetails(){
    let xhr=new XMLHttpRequest()
    let url=`${serverURL}/employees`
    xhr.open('GET',url,true)
    xhr.send()
    xhr.onload=()=>{
        if(xhr.status === 200){
            let data = xhr.responseText
            let employees = JSON.parse(data)
            return employees
        }
    }
}
function updateEmployeesDetails(employee){
    let xhr=new XMLHttpRequest()
    let url=`${serverURL}/employees/${employee.id}`
    xhr.open('PUT',url,true)
    xhr.setRequestHeader('Content-Type','application/json')
    xhr.send(JSON.stringify(employee))
    xhr.onload=()=>{
        if(xhr.status === 200){
            let data = xhr.responseText
            getEmployeeDetails()
        }
    }
}

function deleteEmployees(empId){
    let xhr=new XMLHttpRequest()
    let url=`${serverURL}/employees/${empId}`
    xhr.open('DELETE',url,true)
    xhr.setRequestHeader('Content-Type','application/json')
    xhr.send()
    xhr.onload=()=>{
        if(xhr.status === 200){
            let data = xhr.responseText
            getEmployeeDetails()
        }
    }   
}

function addEmployeeForm(uname,uemail,upassword,uphone,ulocation,uqualification,uspecialization){
    let employee={
        name:uname,
        email:uemail,
        password:upassword,
        phone:uphone,
        location:ulocation,
        qualification:uqualification,
        specialization:uspecialization  
    }
    let xhr=new XMLHttpRequest()
    let url=`${serverURL}/employees`
    xhr.open('POST',url,true)
    xhr.setRequestHeader('Content-Type','application/json')
    xhr.send(JSON.stringify(employee))
    window.location.href="page1.html" 
    setTimeout(function() {alert("login page")}, 3000);
}

let tableBodyTag=document.querySelector("#table-body")
tableBodyTag.addEventListener("click",function(event){ 
    var targetElement = event.target;
    if( targetElement.classList.contains('delete')){
        let selectedId=targetElement.parentElement.parentElement.firstElementChild.innerHTML
        console.log(selectedId);
        deleteEmployees(selectedId)
    }
    if( targetElement.classList.contains('update')){
        let selectedId=targetElement.parentElement.parentElement.firstElementChild.innerHTML
        let xhr=new XMLHttpRequest()
        let url=`${serverURL}/employees`
        xhr.open('GET',url,true)
        xhr.send()
        xhr.onload=()=>{
            if(xhr.status === 200){
                let data = xhr.responseText
                var employees = JSON.parse(data)
                var selectedEmployee=employees.find((employee)=>{
                    return employee.id===selectedId
                })
                console.log(selectedEmployee)
                populateUpdatedData(selectedEmployee)
            }
        }
        
    }
})

let populateUpdatedData=(selectedEmployee)=>{
    document.querySelector("#update-emp-Id").value=selectedEmployee.id;
    document.querySelector("#update-name").value=selectedEmployee.name;
    document.querySelector("#update-email").value=selectedEmployee.email;
    document.querySelector("#update-password").value=selectedEmployee.password;
    document.querySelector("#update-phone").value=selectedEmployee.phone;
    document.querySelector("#update-location").value=selectedEmployee.location;
    if(selectedEmployee.qualification=='Under-Graduate'){
    document.querySelector("#update-underGraduate").checked = true;}
    else{
    document.querySelector("#update-postGraduate").checked = true;  
    }
    document.querySelector("#update-specialization").value=selectedEmployee.specialization;
    $('#update-employee-modal').modal('show')
}

function updateEmployeeForm(){
    var qualification= document.getElementsByName("update-qualification")
        for (let i = 0; i <qualification.length; i++) {
        if (qualification[i].checked) {
            selectedQualification=qualification[i].value
            }
        }
    let updateEmployee={
        id:document.querySelector('#update-emp-Id').value,
        name:document.querySelector('#update-name').value,
        email:document.querySelector('#update-email').value,
        password:document.querySelector('#update-password').value,
        phone:document.querySelector('#update-phone').value,
        location:document.querySelector('#update-location').value,
        qualification:selectedQualification,
        specialization:document.querySelector('#update-specialization').value
    }
    $('#update-employee-modal').modal('hide')
    updateEmployeesDetails(updateEmployee)
}