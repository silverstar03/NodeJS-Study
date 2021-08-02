const express = require('express');
const app = express();

app.get("/",(req,res)=>{
    res.send("Hi Express~!!")
})

app.listen(3300,()=>{
    console.log("Running express server at 127.0.0.1....")
})