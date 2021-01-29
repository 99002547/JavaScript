const express = require('express')
const router = express.Router()

//employees data
let employees = [
    {
        id : "40012767",
        name : 'Shilpa',
        email: 'shilpa@gmail.com',
        password: "shilpa@123",
        phone : "7412589632",
        location: 'Mumbai',
        qualification: 'Post-Graduate',
        specialization: 'M-Tech'
    },
    {
        id : "40012758",
        name : 'Sneha',
        email: 'sneha@gmail.com',
        password: "sneha@123",
        phone : "7412545232",
        location: 'Mysore',
        qualification: 'Under-Graduate',
        specialization: 'CSE'
    }
]

//GET employees
router.get('/employees',(request,response) => {
    console.log('GET Request Received at server')
    response.json(employees);

})

//Get ID
let getID = () => {
    var dt = new Date().getTime();
    var uuid = 'xxyxxyxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*8)%8 | 0;
        //dt = Math.floor(dt/8);
        return r;
    });
    return uuid;
}

//post request
router.post('/employees',(request,response) => {
    let employee = {
        id : getID(),
        name : request.body.name,
        email : request.body.email,
        password: request.body.password,
        phone : request.body.phone,
        location : request.body.location,
        qualification: request.body.qualification,
        specialization: request.body.specialization
    }
    employees.push(employee)
    console.log('POST Request Received at server')
    response.json({msg:'POST Requesst is success'})
})

//PUT request
router.put('/employees/:id',(request,response) => {
    let empId = request.params.id
    let updateEmployee = {
        id : empId,
        name : request.body.name,
        email : request.body.email,
        password: request.body.password,
        phone : request.body.phone,
        location : request.body.location,
        qualification: request.body.qualification,
        specialization: request.body.specialization
    }
    let existingEmployee = employees.find((employee) => {
        return employee.id===empId
    })
    employees.splice(employees.indexOf(existingEmployee),1,updateEmployee)
    console.log('PUT Request Received at server')
    response.json({msg:'PUT Requesst is success'})
})

//Delete request
router.delete('/employees/:id' ,(request,response) => {
    let empId = request.params.id
    employees = employees.filter((employee) =>{
        return employee.id !== empId
    })
    console.log('DELETE Request Received at server')
    response.json({msg:'DELETE Requesst is success'})
})
module.exports = router