const router = require('express').Router()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const authware = require('../middleware/authware')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const { Pool, Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5433,
  })
client.connect() 
// ISO/IEC 5218 says: 0 = not known, 1 = male, 2 = female, 9 = not applicable/other

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser())


let locations = fs.readFileSync('./worldcities.json')
locations = JSON.parse(locations)
// @https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
// Converts numeric degrees to radians
function toRad(Value) 
{
    return Value * Math.PI / 180;
}

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
}


const calculateDistance = (profile, myprofile) => {
    // get new profile location
    let locPair1 = [0,0]
    let locPair2 = [0,0]
    for(let i in locations[profile["country"]]){
        if(locations[profile["country"]][i]["City"] == profile["city"]){
            locPair1[0] = locations[profile["country"]][i]["Latitude"]
            locPair1[1] = locations[profile["country"]][i]["Longitude"]
        }
    }
    for(let i in locations[myprofile["country"]]){
        console.log(locations[myprofile["country"]][i]["City"])
        console.log(locations[myprofile["city"]])
        if(locations[myprofile["country"]][i]["City"] == myprofile["city"]){
            console.log("Found")
            locPair2[0] = locations[myprofile["country"]][i]["Latitude"]
            locPair2[1] = locations[myprofile["country"]][i]["Longitude"]
        }
    }
    let dist = calcCrow(locPair1[0], locPair1[1], locPair2[0], locPair2[1]).toFixed(2)
    dist = dist + " km"

    return dist

}
// TODO ADD CONSTRAINT
router.get('/', authware, async(req,res,next) => {
    let id = req.user.id
    client.query('SELECT * FROM users_user WHERE id = ' + id, (err, sql_res) => {
        console.log("HYE")
        if(sql_res.rows.length > 0){
            console.log("???")
            // We are in ur user
            let sex = sql_res.rows[0].sex
            let myProfile = sql_res.rows[0]
            let lookfor = 2
            if(sex == 2){
                lookfor = 9
            }
            client.query('SELECT * FROM users_user WHERE sex = ' + lookfor).then( (sql_res) => {
   
                if(sql_res.rows.length < 1){
                    res.send({})
                }else{
                    let prof = sql_res.rows[Math.floor(Math.random()*sql_res.rows.length)]
                    prof["distance"] = calculateDistance(prof, myProfile)
                    res.send(prof)
                    
                }
            }).catch((e) => {
                console.log("errr")
                console.log(e)
            })
        }else{
            console.log("NO")
        }
        return
    })
})


module.exports = router