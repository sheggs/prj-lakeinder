const data = {
    images: require('../model/imageLocations.json'),
    setEmployees: function (data) { this.images = data }
}
const multer = require('multer');
const upload = multer({dest: './images/'});

const getImage = (req, res) => {
    console.log("trying to understand:", req.params.id, data.employees.find(emp => emp.id === parseInt(req.params.id)));
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(400).json({"message": `Employee ID ${req.body.id} not found`});
    }
    res.json(employee)
}

const uploadImage = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length -1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({'message': `First and last names are required. `});
    }

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

const uploadNewImage = (req, res) => {
    console.log("Reaching point 2");
    const newImage = {
        id: data.images[data.employees.length -1].id + 1 || 1,
        image_file_location: req.body.firstname
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({'message': `First and last names are required. `});
    }

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

module.exports = {getImage, uploadNewImage}