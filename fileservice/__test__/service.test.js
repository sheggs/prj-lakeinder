const request = require('supertest');
const {createServer} = require('../server');
const {getImage, _} = require('../controllers/imageController');
const path = require('path');

const app = createServer();

describe('get an Image', () => {
    test('Checks that specified image returned', async () => {
        // jest.mock('getImage');
        const res = await request(app).get("/1");
        //console.log("What is it giving me:", res);
        
        // expect(getImage).toHaveBeenCalled();
        expect(res.statusCode).toBe(200);
    });
    test("id doesn't exist", async() => {
        const res = await request(app).get("/DoesNotExist");

        expect(res.statusCode).toBe(400);
    });
});

describe('post image', () => {
    test('check new image posted to database', async () => {


        imagesBefore = require('../model/imageLocations.json')


        request(app)
        .post('/')
        .set('Content-Type', 'multipart/form-data')
        .attach('image', path.resolve('images\\Test_Image_4.jpg'))
        .then((response) => {
            const imagesAfter = require('../model/imageLocations.json');

            expect(response.statusCode).toBe(201);
            expect(imagesAfter.length).toEqual(imagesBefore.length+1);
        });
    });
    test('path not specified', async () => {
        const response = await request(app)
        .post('/');

        expect(response.statusCode).toBe(400);
    })
});