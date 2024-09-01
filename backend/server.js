
const express = require("express");
const app = express();
require("./models/dbconnect");

app.get('/', (req, res) => {
    res.send("Hello Server here!!");
})

// app.post('/signup', (req, res) => {
//     const { username, email, password } = req.body;

//     console.log('Received form data:', { username, email, password });

//     // Normally, you would insert the data into your database here.

//     // Sending a response back to the client
//     res.status(200).json({ message: "Signup successful!", data: { username, email } });
// })

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is listening at port number ${port}`)
})