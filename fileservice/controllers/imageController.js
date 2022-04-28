const data = {
    images: require('../model/imageLocations.json'),
    setImages: function (data) { this.images = data }
}
const path = require('path');
const sharp = require("sharp");

const getImage = async (req, res) => {
    console.log("Get /id Image:", req.params.id, req.query);
    const image = data.images.find(img => img.id === parseInt(req.params.id));
    if (!image) {
        return res.status(400).json({"message": `Image ID ${req.params.id} not found`});
    }
    console.log(image);
    console.log(typeof image.image_file_location)

    if (req.query.height || req.query.width) {
        console.log("Req queries:", req.query);


        const width = parseInt(req.query.width);
        let height;
        if (!req.query.height) {
            height = width;
        } else {
            height = parseInt(req.query.height);
        }

        console.log("height:", height, "width:", width)


        const originalImage = path.resolve(image.image_file_location);
        const extensionName = path.extname(image.image_file_location);

            try {
                await sharp(originalImage)
                .resize({
                width: width,
                height: height,
            })
            .toFile(path.resolve("resizedImage", "resizedImage"+extensionName));
      
          console.log("Successfully resized an image!");
        } catch (err) {
          console.log(err);
          return res.status(501).json("Can't resize image");
        }

    res.sendFile(path.resolve("resizedImage", "resizedImage"+extensionName));
    }
    else {
        res.sendFile(path.resolve(image.image_file_location));
    }
}

// const uploadImage = (req, res) => {
//     const newEmployee = {
//         id: data.employees[data.employees.length -1].id + 1 || 1,
//         firstname: req.body.firstname,
//         lastname: req.body.lastname
//     }

//     if (!newEmployee.firstname || !newEmployee.lastname) {
//         return res.status(400).json({'message': `First and last names are required. `});
//     }

//     data.setEmployees([...data.employees, newEmployee]);
//     res.status(201).json(data.employees);
// }

const uploadNewImage = (req, res) => {
    console.log("Reaching point 2");
    const newImage = {
        id: data.images[data.employees.length -1].id + 1 || 1,
        image_file_location: req.body.firstname
    }

    if (!newImage.firstname || !newEmployee.lastname) {
        return res.status(400).json({'message': `First and last names are required. `});
    }

    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

module.exports = {getImage, uploadNewImage}