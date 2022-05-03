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
        if(locations[myprofile["country"]][i]["City"] == myprofile["city"]){
            locPair2[0] = locations[myprofile["country"]][i]["Latitude"]
            locPair2[1] = locations[myprofile["country"]][i]["Longitude"]
        }
    }
    let dist = calcCrow(locPair1[0], locPair1[1], locPair2[0], locPair2[1]).toFixed(2)
    dist = dist + " km"

    return dist

}

router.post('/match', authware, async(req,res,next) => {
    let target_id = (req.body.id)
    let match = req.body.match
    if(match != true && match != false){
        res.status(400).send({"message": "Missing match"})
        return
    }
    if(match){
        match = "TRUE"
    }else{
        match = "FALSE"
    }

    let initator_id = (req.user.id)
    if(target_id == initator_id){
        res.status(400).send({"message": "You can't match with yourself"})
        return
    }

    client.query('SELECT * FROM matches WHERE initiator = ' + initator_id + " AND target = " + target_id).then((sql_res) => {
        if(sql_res.rows.length == 0){
            // Set up maching
            client.query("SELECT * FROM matches WHERE initiator = " + target_id + " AND target = " + initator_id).then((r) => {
                if(r.rows.length > 0){
                    console.log("found something")
                    if(r.rows[0]["match"] == false){
                        client.query('INSERT INTO matches (initiator, target, match)  VALUES (' + initator_id + ", " + target_id + ", " + match + ")" ).then((r) => {
                            res.send()
                        }).catch((e) => {
                            console.log(e)
                            console.log(e)
                            res.status(400).send({"message": "Unknown error"})
                        })
                    }else{
                        // Allow match.
                        // TODO: NOTIFICATION
                        client.query('INSERT INTO matches (initiator, target, match)  VALUES (' + initator_id + ", " + target_id + ", " + match + ")" ).then(() => {
                            // Create chat_room
                            client.query('INSERT INTO chat_room (user1, user2)  VALUES (' + initator_id + ", " + target_id + ")" ).then((_r) => {
                                res.send()
                            }).catch((e) => {
                                // Should never go here. I will not handle this error. Not enough time
                                console.log("ERROR", e)
                                res.send()

                            })
                        }).catch((e) => {
                            res.status(400).send({"message": "Unknown error"})
                        })
                    }
                }
                // Not matched
                if(r.rows.length == 0){
                    client.query('INSERT INTO matches (initiator, target, match)  VALUES (' + initator_id + ", " + target_id + ", " + match + ")" ).then((r) => {
                        res.send()
                    }).catch((e) => {
                        console.log(e)
                        console.log(e)
                        res.status(400).send({"message": "Unknown error"})
                    })

                }
            })
            

            // client.query('INSERT INTO matches (initiator, target, match)  VALUES (' + initator_id + ", " + target_id + ", " + match + ")" ).then((r) => {
            //     res.send()
            // }).catch((e) => {
            //     console.log(e)
            //     console.log(e)
            //     res.status(400).send({"message": "Unknown error"})
            // })
        }else{
            res.send();
            return
        }
    })
})

// TODO ADD CONSTRAINT
router.get('/', authware, async(req,res,next) => {
    let id = req.user.id

    client.query("SELECT * FROM users_user WHERE id = " + id).then((sql_res) => {
        if(sql_res.rows.length > 0){
            // We are in ur user
            let sex = sql_res.rows[0].sex
            let myProfile = sql_res.rows[0]
            let lookfor = 2
            if(sex == 2){
                lookfor = 9
            }
            client.query("SELECT * FROM users_user WHERE id != " + id + " AND sex = " + lookfor + " AND id NOT IN (SELECT target FROM matches WHERE initiator = " + id + ")",).then( (sql_res) => {
                if(sql_res.rows.length < 1){
                    res.send({})
                }else{

                    let prof = sql_res.rows[Math.floor(Math.random()*sql_res.rows.length)]
                    prof["distance"] = calculateDistance(prof, myProfile)
                    res.send(prof)
                    
                }
            }).catch((e) => {
                res.status(400).send({"message": "Unknown error"})
            })
        }else{
            res.send({}) 
        }
        return
    }).catch((e) => {

    })
})

const getAllMatches = (id) => {
    matches = []
    return new Promise(async (resolve, reject) => {
        client.query("SELECT * FROM matches WHERE initiator = " + id).then(async (sql_res) => {
            if(sql_res.rows.length == 0){
                resolve([])
            }
            for(let i in sql_res.rows){

                console.log(sql_res.rows[i]["target"])
                if(sql_res.rows[i]["target"] != undefined){
                    await client.query("SELECT * FROM matches WHERE target = " + id + " AND initiator = " + sql_res.rows[i]["target"]).then(async (r) => {
                        try{
                            await client.query("SELECT * FROM users_user WHERE id = " + r.rows[0]["initiator"]).then(async (r_) => {
                                matches.push(r_.rows[0])   
                            }).catch((e) => {
                                reject(e)
                            })
                        }
                        catch(e){}
                        
                    }).catch((e) => {
                        reject(e)
                    })
                }
                if(i == (sql_res.rows.length - 1)){
                    resolve(matches)
                }
            }
        }).catch((e) => {
            reject(e)
        })
    })
}

const getProfile = (id) => {
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM users_user WHERE id = " + id).then((sql_res) => {
            resolve(sql_res.rows[0])
        }).catch((e) => {
            reject(e)
        })
    })
}
const getChatRoom = (id, myId) => {

    /**
     * 
     * messageHistory: [{
        type: 'text',
        author: "them",
        data: { text: "Lets go on a date to rwanda babes" }
      },
     */
    return new Promise((resolve, reject) => {
        client.query("SELECT * FROM chat_table WHERE chat_room_id = " + id).then((sql_res) => {
            chat = []
            let rows = sql_res.rows
            if(rows.length == 0){
                resolve([])
            }
            for(let i in rows){
                let them = "them"
                if(rows[i].sender == myId){
                    them = "me"
                }
                chat.push({
                    "type": "text",
                    "author": them,
                    "data": {"text": rows[i].message}
                })
                if(i == rows.length - 1){
                    resolve(chat)
                }
            }
            
        }).catch((e) => {
            reject(e)
        })
    }) 
}
router.get('/matches', authware, async(req,res,next) => {
    let id = req.user.id
    let matches = []
    client.query("SELECT * FROM chat_room WHERE user1 = " + id + " OR user2 = " + id ).then(async (r) => {
        if(r.rows.length == 0){
            res.send([])
            return
        }
        for(let i in r.rows){
            let d =r.rows[i]
            let target = 0
            let chat_room_id = d["chat_room_id"]

            if(d["user1"] != id){
                target = d["user1"]
            }else{
                target = d["user2"]
            }
            let prof = await getProfile(target)
            // Get Messages
            prof["chat_room_id"] = chat_room_id
            prof["messageHistory"] = await getChatRoom(chat_room_id, req.user.id)
            matches.push(prof)

        }
        res.send(matches)
        
    }).catch((e) => {
        console.log("error")
        console.log(e)
        res.status(400).send()
    })
})


module.exports = router