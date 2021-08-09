const express = require('express')
const fs = require("fs");

const app = express();
app.use(express.static(__dirname + "/public"))

app.set('views', './views')
app.set('view engine', 'pug')

app.locals.pretty = true;

app.use(express.urlencoded({extended: true}))
app.get('/', (req, res)=>{
    res.render('main')
})


app.listen(3000, ()=>{
    console.log('Express server running...')
})