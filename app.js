const express = require('express');
const app = express();
const User = require('./models/userSchema');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute')
const url = "mongodb://127.0.0.1:27017/User_App"
const PORT = 8001;

mongoose.connect(url,{
    useUnifiedTopology: true,
    useNewUrlParser: true
},() => {
    console.log('connected to database');
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoute);


app.listen(PORT,()=>{
    console.log(`app is connected at http://localhost:${PORT}`);
});