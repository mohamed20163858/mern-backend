require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const app = express();
// middleware the next is essiential to pass the next middleware function 
// middleware is the function excuted between the process of sending request and recieving response
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.use(express.json());

// routes 


// old code
// app.get("/", (req, res) => {
//     res.json({message: "welcome to the app"})
// });

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
// connect to db

mongoose.connect(process.env.MONGO_URI).then(() => {
    // listen to requests

    app.listen(process.env.PORT, () => {
    console.log("connecting to db & listening on port", process.env.PORT);
    });
}).catch((error) => {
    console.log(error);
});
