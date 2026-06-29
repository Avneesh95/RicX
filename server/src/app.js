const express = require("express");
const app = express();
const authRoutes = require('./routes/authRoutes');

app.use(express.json());

app.get('/',(req,res)=>{

    res.send("API working");
}  
);


app.use('/api/auth',authRoutes);

module.exports = app;
