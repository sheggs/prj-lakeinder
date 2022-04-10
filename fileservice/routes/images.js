

const data = {
    images: require('../model/imageLocations.json'),
    setImages: function (data) { this.images = data }
}
const multer = require('multer');

const path = require('path');
const fs = require('fs')
const fsPromises = require('fs').promises;

const filePath = path.join(__dirname, '..', 'model', 'imageLocations.json')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    } 
})

const upload = multer({storage: storage});

const express = require('express');
const router = express.Router();

router.route('/:id').get( (req, res, next) => {
    console.log("Get /id Image:", req.params.id, data.images.find(emp => emp.id === parseInt(req.params.id)));
    const image = data.images.find(img => img.id === parseInt(req.params.id));
    if (!image) {
        return res.status(400).json({"message": `Image ID ${req.params.id} not found`});
    }
    console.log(image);
    console.log(typeof image.image_file_location)
    res.sendFile(path.resolve(image.image_file_location));
});

router.route('/').post(upload.single('productImage'), (req, res, next) => {
    console.log(req.file, "checking", req.file.path);
    let startingID = 1;
    if (data.images.length >= 1) {
        startingID = data.images[data.images.length -1].id + 1
    }
    const newImage = {
        id: startingID,
        image_file_location: req.file.path
    }

    console.log(newImage)

    if (!newImage.image_file_location) {
        return res.status(400).json({'message': `Image file required`});
    }
    const duplicate = data.images.find(img => img.image_file_location === newImage.image_file_location);
    if (duplicate) return res.sendStatus(409); // conflict

    data.setImages([...data.images, newImage]);
    const dataString = JSON.stringify(data.images, null, 5);
    fs.writeFile(filePath, dataString, 'utf8', (err) => {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        } else {
          console.log("File written successfully\n");
          console.log(data);
          res.status(201).json(newImage.id);
        }
      });
});




module.exports = router;

// const express = require('express');
// const router = express.Router();
// const employeesController = require("../../controllers/employeesController.js");
// const ROLES_LIST = require('../../config/roles_list');
// const verifyRoles = require('../../middleware/verifyRoles');

// router.route('/')
//     .get(employeesController.getAllEmployees)
//     .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController. createNewEmployee)
//     .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
//     .delete(verifyRoles(ROLES_LIST.Admin),employeesController.deleteEmployee);

// router.route('/:id')
//     .get(employeesController.getEmployee);



// module.exports = router;