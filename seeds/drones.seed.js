require('../db')
const mongoose = require("mongoose");
const Drone = require('../models/Drone.model');
const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
  ];

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

// async function seed (){
// await mongoose.connect(MONGO_URI)    
// await Drone.deleteMany()
// await Drone.create(drones)
// await((droneFromDB) => {
//     console.log(`Created ${droneFromDB.length} drone`)
//     console.log(droneFromDB)
//     mongoose.connection.close()
//   })
// }

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .then(()=>{
     return Drone.deleteMany()
  })
  .then(()=>{
    return Drone.create(drones)
 })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
})
  .then(()=>{
      mongoose.connection.close()
  });
