

const data = {
    images: require('../model/imageLocations.json'),
    setImages: function (data) { this.images = data }
}
const multer = require('multer');

const path = require('path');
const fs = require('fs')
const fsPromises = fs.promises;

const filePath = path.join(__dirname, '..', 'model', 'imageLocations.json')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/');
    },
    filename: function(req, file, cb) {
        let ts = Date.now();

        let date_time = new Date(ts);
        let date = date_time.getDate();
        let month = date_time.getMonth() + 1;
        let year = date_time.getFullYear();

        let hours = date_time.getHours();
        let minutes = date_time.getMinutes();
        let seconds = date_time.getSeconds();
        year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
        cb(null,  year + "-" + month + "-" + date + " " + hours + "hrs-" + minutes + "min-" + seconds + "secs_" + file.originalname);
    } 
})

const upload = multer({storage: storage});

const express = require('express');
const router = express.Router();

const {getImage, _} = require('../controllers/imageController');

router.route('/:id').get( (req, res, next) => {
    getImage(req, res);
});

router.route('/').post(upload.single('image'), async (req, res, next) => {
    let startingID = 1;
    if (data.images.length >= 1) {
        startingID = data.images[data.images.length -1].id + 1
    }

    if (!req.file) {
        return res.status(400).json({'message': `Image file required`});
    }
    const newImage = {
        id: startingID,
        image_file_location: req.file.path
    }

    data.setImages([...data.images, newImage]);
    const dataString = JSON.stringify(data.images, null, 5);
     try {
        await fsPromises.writeFile(filePath, dataString, 'utf8');
        console.log("File written successfully\n");
        console.log(data);
        res.status(201).json(newImage.id);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
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